
import { RealTimeGrid } from "../../rt-grid";

export function StockMonitor(): JSX.Element {

    return (
        <RealTimeGrid
            plugins={[{ name: "real-time-data" }]}
            columnDefs={[{ field: 'make' }, { field: 'price' }]}
            rowId="make"
        />
    );
}