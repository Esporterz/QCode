//yes im using p5 while teaching it at the same time
//no i dont want to know how this can be done better

import {Camera} from "./camera.js"
import {currentColors, loadColors} from "./colors";
import {loadLessons, loadLessonsMetadata, propagateLocked, solvePosition} from "./lesson";
import {beginCheckingStatuses} from "./dbUpdate";
import {toDataURL} from "./index";
import {checkLocks} from "./locking";

let darkMode = false;
let camera = new Camera(0,-500);
let lessonsIndex = [];
let rootLesson;
let font;

let lockImage;

window.setup = function (){
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    const navHeight = styles.getPropertyValue("--navbar-height").replace("px","");
    let height = window.innerHeight - navHeight;
    textFont("JetBrains Mono")
    createCanvas(window.innerWidth,height).parent("#canvas-parent");
    loadColors();

    toDataURL("https://raw.githubusercontent.com/GreasyRooster1/QCodeStatic/refs/heads/main/Global/lock.png",(data)=>{
        lockImage = loadImage(data)
        console.log(lockImage)
    })


    loadLessons((r)=>{
        rootLesson = r;
        console.log(lessonsIndex[rootLesson]);
        solvePosition(rootLesson);
        checkLocks()
        loadLessonsMetadata()
        beginCheckingStatuses();
    });

}

window.draw = function draw(){
    camera.move();
    camera.apply();
    drawBackground();
    drawLessons();
}

function drawLessons(){
    for(let [id,lesson] of Object.entries(lessonsIndex)){
        if(id===rootLesson){
            continue
        }
        lesson.update();
    }
}

function drawBackground(){
    let spacing = 30;
    background(currentColors.background)
    if(camera.zoom<0.5){
        return;
    }
    let w= width/camera.zoom;
    let h= height/camera.zoom;
    let alpha = map(camera.zoom,0.5,0.75,0,255)
    for(let i=0;i<w;i+=spacing){
        for(let j=0;j<h;j+=spacing){
            noStroke();
            fill(currentColors.grid,alpha);
            let x = i-floor(camera.x/camera.zoom/spacing)*spacing;
            let y = j-floor(camera.y/camera.zoom/spacing)*spacing;
            ellipse(x,y,3,3);
        }
    }
}

window.mouseWheel = function mouseWheel(event) {
    const s = 1 - (event.delta / 1000);
    camera.zoom *= s;
    const mouse = createVector(mouseX, mouseY);
    let offset = createVector(camera.x,camera.y);
    offset.sub(mouse).mult(s).add(mouse);
    camera.x = offset.x;
    camera.y = offset.y;
}

window.windowResized = function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

export {drawLessons,drawBackground,darkMode,lessonsIndex,camera,rootLesson,lockImage};