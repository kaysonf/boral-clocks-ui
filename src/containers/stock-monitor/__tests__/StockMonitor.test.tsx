
import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';

import * as realtime from "../../../utils/realtime/server";

import { StockMonitor } from '../';
import { createSubscribable } from '../../../utils/pubsub';

let mockServer = createSubscribable();

beforeEach(() => {
    mockServer = createSubscribable()

    jest.spyOn(realtime, "createStreamableServer").mockReturnValue({ ...mockServer, disconnect: () => null });
})

afterEach(() => {
    mockServer.clearAll()
})


const getRow = container => rowId => container.querySelector(`.ag-center-cols-container .ag-row[row-id="${rowId}"]`);
const visibleData = row => {
    let result = {}
    row.querySelectorAll('.ag-cell').forEach((curr: HTMLDivElement) => {
        const col = curr.getAttribute('col-id');
        result[col] = curr.innerHTML
    })
    return result
}


test('loads and displays greeting', async () => {

    const { container } = render(<StockMonitor />)

    await waitFor(() => {
        expect(screen.getByTestId('ag-grid')).toBeInTheDocument()
    });



    act(() => {
        const data = { "make": "Toyota", "price": "3281" };
        mockServer.emitt("new", data)
    })


    await waitFor(() => {
        const row = getRow(container)('Toyota') as HTMLDivElement;
        const vd = visibleData(row)
        expect(vd).toEqual({ "make": "Toyota", "price": "3281" })
    })


    act(() => {
        const data = { "make": "Toyota", "price": "3289" };
        mockServer.emitt("update", data)
    })


    await waitFor(() => {
        const row = getRow(container)('Toyota') as HTMLDivElement;
        const vd = visibleData(row)
        expect(vd).toEqual({ "make": "Toyota", "price": "3289" })
    })

    act(() => {
        const data = { "make": "Toyota", "price": "3289" };
        mockServer.emitt("oof", data)
    })


    await waitFor(() => {
        const row = getRow(container)('Toyota') as HTMLDivElement;
        expect(row).toBeNull()
    })
})