const newProjectButton = document.querySelector('.new-project-button');
newProjectButton.addEventListener('click', (e) => {
    createProject(prompt("name for new project"));
})

function createProject(projectName){
    let cleanProjectId = projectName.toLowerCase().replaceAll("[^a-z0-9]","-");
    let user = getStoredUser();
    database.ref("userdata/"+user.uid+"/projects").child(cleanProjectId).once("value", (snap) => {
        if(snap.exists()){
            alert("Project already exists with that name!");
            return;
        }
        database.ref("userdata/"+user.uid+"/projects").child(cleanProjectId).set({
            code:defaultCode,
            lessonId:"none",
            name:projectName,
            currentChapter:0,
            currentStep:0,
            timestamp:Date.now()/1000,
        })
    })

}
