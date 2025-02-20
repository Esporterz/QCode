import {ProjectType,RunErrCallback} from "./projectType";
import {getCode,setupEvents as setupExecEvents,logNames,runCode,frameContent,frame,stopFrame} from "../executionHelper"
import {Language} from "../codeEditor";
import {getStoredUser} from "../../api/auth";
import {ref, set} from "firebase/database";
import {db} from "../../api/firebase";
import {writeToEditor} from "../utils/loadUtils";
import {clearConsole} from "../codeExecution";

class ScratchType extends ProjectType {
    constructor() {
        super(true);
    }

    setupEditor(): void {

    }

    onLoad(){
        document.querySelector(".output-pane")!.remove();
    }

    saveCode(){
    }

    run(errorCallback:RunErrCallback) {
    }

    stop(){
    }

    runErrorCallback(content: string, type: string): void {
        super.appendLog(content,type);
    }

    getLanguage():Language {
        return "javascript";
    }

    static getProjectDBData(projectName: string, lessonId: string):Object {
        return {
            language:"scratch",
            name: projectName,
            lessonId:lessonId??"none",
            currentChapter:0,
            currentStep:0,
            timestamp:Date.now()/1000,
        }
    }
}

export {ScratchType};