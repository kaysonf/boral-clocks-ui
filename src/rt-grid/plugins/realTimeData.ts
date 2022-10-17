import { IPlugin } from "../interface";

export function realTimeData(): IPlugin {

    return {

        onCellClicked: (e) => {
            console.log(e.data)
            return e;
        },

        onData: (params) => {
            const { e, client } = params;


            client.on('new', (data) => {
                e.api.applyTransaction({ add: [data] });
            })

            client.on('oof', (data) => {
                e.api.applyTransaction({ remove: [data] });
            })

            client.on('update', (data) => {
                e.api.applyTransaction({ update: [data] });
            })

            return params

        }

    }
}