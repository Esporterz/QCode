import {setupPanes} from "../panes";
import { projectId, projectType, scrollableSteps} from "../load";
import {getStoredUser} from "../../api/auth";
import {getLinkToProject} from "../../api/util/projects";

function populateSteps(data){
    createChapterStep(data);

    console.log(data,projectType.chapterNum)
    let steps = data.chapters[projectType.chapterNum].steps.values().toArray()

    let count = 1;
    for (let step of steps) {
        createStep(step.head,step.content,step.image,step.type,count);
        count++;
    }
    createNextChapterStep(data);
    createBufferSpace()
}

function createStep(head,content,image,type,count){
    let stepEl = document.createElement("editor-step");
    stepEl.setAttribute("head", head);
    stepEl.setAttribute("type", type);
    stepEl.setAttribute("count", count);
    stepEl.setAttribute("image", image);
    stepEl.innerHTML = content;
    scrollableSteps.appendChild(stepEl);
    return stepEl;
}

function createStepFromObj(step){
    return createStep(step.head,step.content,step.image,step.type,step.count);
}

function createBufferSpace(){
    let buffer = document.createElement("div");
    buffer.classList.add("buffer");
    scrollableSteps.appendChild(buffer);
}

function writeToEditor(data){
    const transaction = editor.state.update({changes: {from: 0, to: editor.state.doc.length, insert: data}})
    const update = editor.state.update(transaction);
    editor.update([update]);
}

function createChapterStep(data){
    createStep(data.name,getChapterStepContent(data.chapters),"none","chapters","-1");
}

function createNextChapterStep(data){
    if(data.chapters[projectType.chapterNum+1]===undefined){
        createStep("You're done!","You finished the lesson!\nGo back <a class='chapter-end-home-link' onclick='projectType.saveCode();' href='./index.html'>home</a>","none","next","-1");
        return;
    }
    createStep("Move on to the next chapter","<span class='next-chapter-text'>Chapter "+(projectType.chapterNum+2)+" - "+data.chapters[projectType.chapterNum+1].name+"</span>","none","next","-1");
    document.querySelector(".next-chapter-text").addEventListener('click',nextChapterClick)
}

function nextChapterClick(){
    projectType.saveCode();
    window.location.href = window.location.href.replace("cNum="+projectType.chapterNum,"cNum="+(projectType.chapterNum+1))
}

function getChapterStepContent(chapters){
    let content="";
    let count=1;
    for(let chapter of chapters){
        content+=createChapterLink(count,chapter)+"<br>";
        count++;
    }
    return content;
}
function getChapterStepContentNoLink(chapters){
    let content="";
    let count=1;
    for(let chapter of chapters){
        content+="Chapter "+count+" - "+chapter.name+"<br>";
        count++;
    }
    return content;
}

function createChapterLink(chapterNumber,chapterData){
    let name = "Chapter "+chapterNumber+" - "+chapterData.name;
    let linkEl = document.createElement("a");
    linkEl.innerHTML = name;
    linkEl.setAttribute("href",getLinkToProject(projectId,getStoredUser().uid,chapterNumber-1));
    linkEl.classList.add("chapter-link")
    if(chapterNumber-1 === projectType.chapterNum) {
        linkEl.classList.add("current-chapter")
    }
    return linkEl.outerHTML;
}

export {populateSteps,createChapterLink,createStepFromObj,createNextChapterStep,createBufferSpace,createChapterStep,createStep,writeToEditor,getChapterStepContentNoLink}