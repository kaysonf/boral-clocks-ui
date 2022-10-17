import * as React from "react";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { AgGridReact } from "@ag-grid-community/react";

import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';

import { createStreamableClient } from "../utils/realtime/client";
import { composePlugins } from "./compose-plugins";
import { PluginDefinition } from "./interface";


type GridEventReadyProp = NonNullable<React.ComponentProps<typeof AgGridReact>["onGridReady"]>
type GridEventReady = Parameters<GridEventReadyProp>["0"]

type Props = {
    plugins: PluginDefinition[];
    columnDefs: { field: string }[];
    rowId: string;
}

export function RealTimeGrid(props: Props): JSX.Element {

    const [gridEvent, setGridEvent] = React.useState<GridEventReady>()

    const [columnDefs] = React.useState(props.columnDefs)

    const plugins = React.useMemo(() => composePlugins(props.plugins), [props.plugins]);

    React.useEffect(() => {

        if (gridEvent === undefined) return;

        if (plugins.onData === undefined) return;

        const client = createStreamableClient();

        plugins.onData({ e: gridEvent, client });

        return () => {
            client.unsubscribe();
        }
    }, [gridEvent, plugins])

    return (
        <div data-testid={gridEvent ? 'ag-grid' : ''} className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
            <AgGridReact
                {...plugins}
                columnDefs={columnDefs}
                getRowId={(r: any) => r.data[props.rowId]}
                onGridReady={(e) => {
                    setGridEvent(e);
                    plugins.onGridReady && plugins.onGridReady!(e)
                }}
                modules={[ClientSideRowModelModule]}
            />
        </div>
    );
}