import { createSubscribable } from "../pubsub";
import { Events } from "./types";


export interface StremableServer {
    on: (e: Events, cb: (...args: unknown[]) => void) => () => void;
    emitt: (e: Events, ...data: unknown[]) => void;
    disconnect: () => void;
}

export function createStreamableServer(): StremableServer {
    const server = createSubscribable();
    const data = () => ({ make: "Toyota", price: Math.floor(Math.random() * (3500 - 3000 + 1) + 3000) });
    setTimeout(() => server.emitt('new', data()), 800)
    let i = setInterval(() => server.emitt('update', data()), 1600)
    return { ...server, disconnect: () => clearInterval(i) };
}
