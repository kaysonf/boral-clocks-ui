
import { GridReadyEvent } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import { StreamableClient } from "../utils/realtime/client";

export type Message<T> = { type: "oof" | "update" | "new"; data: T }


export type AgGridProps = React.ComponentProps<typeof AgGridReact>

type Composer<T> = (t: T) => T;

type OnData = { e: GridReadyEvent, client: StreamableClient }

export type PluginDefinition = {
    name: string,
    config?: Record<string, unknown>
}

export type IPlugin = { [k in keyof AgGridProps]: Composer<Parameters<NonNullable<AgGridProps[k]>>[0]> } & { onData?: Composer<OnData> }