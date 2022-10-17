type SubFn = (...args: unknown[]) => void;

export function createSubscribable() {
    let cbId = 0;

    const subscribers = new Map<string, Map<typeof cbId, SubFn>>();

    return {
        on(topic: string, cb: SubFn): () => void {
            if (!subscribers.has(topic)) {
                subscribers.set(topic, new Map());
            }
            const id = ++cbId;

            subscribers.get(topic)?.set(id, cb);

            return () => {
                subscribers.get(topic)?.delete(id);
            };
        },

        clearAll() {
            const topics = subscribers.keys();
            for (const topic of topics) {
                subscribers.delete(topic);
            }
        },

        emitt(topic: string, msg?: unknown): void {
            subscribers.get(topic)?.forEach((cb) => cb(msg));
        },
    };
}
