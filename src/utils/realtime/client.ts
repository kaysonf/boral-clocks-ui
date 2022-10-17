import { createStreamableServer, StremableServer } from "./server";
import { Events } from "./types";

export interface StreamableClient {
    on: (e: Events, cb: (...args: unknown[]) => void) => () => void;
    connect: (opts: Record<string, unknown>) => void;
    unsubscribe: () => void;
}


class FStreamable implements StreamableClient {

    constructor(private _server: StremableServer) { }

    on(e: Events, cb: (...args: unknown[]) => void) {
        return this._server.on(e, cb);
    }

    connect(opts: Record<string, unknown>) { }

    unsubscribe() {

    }
}


export function createStreamableClient(): StreamableClient {
    return new FStreamable(createStreamableServer());
}