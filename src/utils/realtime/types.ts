const DATA_EVENTS = ["oof", "update", "new"] as const;
type DataEvents = typeof DATA_EVENTS[number];

const CONNECTION_EVENTS = ["connected", "connecting", "disconnected"] as const;
type ConnectionEvents = typeof CONNECTION_EVENTS[number];

export type Events = DataEvents | ConnectionEvents