class Lesson{
    constructor(children,metadata){
        this.x = 0;
        this.y = 0;
        this.w = 200;
        this.h = 250;
        this.children = children;
        this.image=metadata.image;
    }
    update(){
        this.draw()
    }
    draw(){
        this.drawBody()
        this.drawLines()
    }
    drawBody(){
        noStroke();
        fill(255)
        stroke(127);
        strokeWeight(1.5)
        rect(this.x,this.y,this.w,this.h,10);
    }
    drawLines(){
        for(let childId of this.children){
            let child = lessonsIndex[childId]
            if(child===undefined){
                continue;
            }
            stroke(127);
            strokeWeight(1.5)
            line(this.x+this.w/2,this.y+this.h,child.x+child.w/2,child.y)
        }
    }
}

function loadLessons(next){
    let rootLesson;
    database.ref("lessonChart").once("value").then((snapshot) => {
        for(const [id, data] of Object.entries(snapshot.val())){
            database.ref("lessons/"+id).once("value").then((snapshot) => {
                lessonsIndex[id] = new Lesson(data.children,snapshot.val());
                if(data.root===true){
                    rootLesson = id;
                }
            })
        }
    }).then(()=>{
        next(rootLesson)
    })
}

function solvePosition(id){
    let current = lessonsIndex[id];
    let count = 0;
    for (let childId of current.children){
        let child = lessonsIndex[childId];
        if(child===undefined){
            continue;
        }
        if(count===0){
            child.x = current.x;
            child.y = current.y+400;
        }
        solvePosition(childId)
        count++;
    }
}