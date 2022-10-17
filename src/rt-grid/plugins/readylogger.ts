import { IPlugin } from "../interface"

export function readyLogger(): IPlugin {

    return {
        onGridReady: (e) => {
            console.log("ready")
            return e
        },
        onCellClicked: (e) => {
            console.log("e logger")
            return e
        }
    }
}