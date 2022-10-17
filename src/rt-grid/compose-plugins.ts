import { AgGridProps, PluginDefinition } from "./interface";
import { readyLogger } from "./plugins/readylogger";
import { realTimeData } from "./plugins/realTimeData";



const compose = <T>(...fns: ((t: T) => T)[]) => (x: T) => fns.reduceRight((acc, cur) => cur(acc), x)

export function composePlugins(plugins: PluginDefinition[]): AgGridProps & { onData?: any } {

    const props = getPlugins();

    return Object.entries(props).reduce((prev, [k, fns]) => {
        const key = k as keyof AgGridProps;
        prev[key] = (e: any) => compose(...fns as any)(e)

        return prev;
    }, {} as AgGridProps)


    function getPlugins() {
        const props = {} as Record<string, unknown[]>;


        for (const plugin of plugins) {
            let d;

            if (plugin.name === "real-time-data") {
                d = realTimeData();
            }

            if (plugin.name === "ready-logger") {
                d = readyLogger();
            }

            if (d !== undefined) {
                Object.entries(d).forEach(([k, v]) => {
                    if (props[k] === undefined) {
                        props[k] = [];
                    }

                    props[k].push(v);
                });

            }
        }
        return props;
    }
}