
class BulkProject extends ProjectDisplay{
    constructor(projectData,index) {
        super(projectData,index);
        this.domClass = "bulk";
        this.parent = ".bulk-projects-bar";
        this.loadCode();
        this.updateClass();
        this.addPlayOverlay()
        this.appendToDom();
    }

    addPlayOverlay(){
        this.playIconWrapper = document.createElement("div");
        this.playIcon = document.createElement("span");

        this.playIcon.innerHTML = "<i class='fas fa-play'></i>";

        this.overlayWrapper.insertBefore(this.playIconWrapper, this.overlayWrapper.lastElementChild);
    }
}

function initBulk() {
    getShareBoardProjects(function (projects) {
        for(let proj of projects) {
            projectDataHeap.push(new BulkProject(proj,projectDataHeap.length));
        }
    })
}