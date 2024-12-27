import {ProjectType,RunErrCallback} from "./projectType.js";

class WebType extends ProjectType {
    constructor() {
        super(false);
    }

    setupEditor(): void {
        document.querySelector(".code-pane")!.innerHTML = `
        <div class="code-editor-wrapper">
            <div class="filesystem-side-bar">
                <div class="header">Head</div>
                <div class="file-list">
                </div>
            </div>
            <div class="code-editor"></div>
        </div> 
        `
    }

    onLoad(){
    }

    saveCode(){
    }

    run(errorCallback:RunErrCallback) {
    }

    stop(){
    }

    runErrorCallback(content: string, type: string): void {
    }

    getLanguage():string {
        return "javascript";
    }
}

function clearConsole(){
    let consoleOut = document.querySelector(".console-output-pane")
    consoleOut!.innerHTML = "";
}

export {WebType};
