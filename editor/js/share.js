const shareButton = document.querySelector('.share-button');
const popupContainer = document.querySelector('.share-popup-container');
const sharePopupButton = document.querySelector('.share-popup-button');
const closePopupButton = document.querySelector('.close-button');
const shareNameInput = document.querySelector('.share-popup-content .name-input');
const shareDescInput = document.querySelector('.share-popup-content .desc-input');
const previewIframe = document.getElementById('share-preview-frame');

shareButton.addEventListener('click', (e) => {
    rawSave();
    showPopup();
    runPopupPreviewCode();
});

closePopupButton.addEventListener("click", (e) => {
    hidePopup();
})

sharePopupButton.addEventListener('click', (e) => {
    if(shareNameInput.value === ''){
        shareNameInput.style.border = "5px solid red";
        return;
    }
    let desc = shareDescInput.value
    if(desc === ''){
        desc = undefined;
    }
    let sharedProjectId = getSharedProjectId(projectId,getStoredUser().uid);

    database.ref("userdata/"+getStoredUser().uid+"/projects/"+projectId).once("value").then(function (snap) {
        let data = snap.val();
        //set metadata
        database.ref("sharedProjects/metadata/"+sharedProjectId).set({
            author:getStoredUser().uid,
            name:shareNameInput.value,
            shareDate:Date.now()/1000,
            createdDate:data.timestamp,
            desc:desc,
            original:data.original,
        }).then(()=> {
            //set projectData
            database.ref("sharedProjects/projectData/" + sharedProjectId).set(getCodeFromEditor());
        })
    })
    hidePopup();
})

function showPopup(){
    popupContainer.style.opacity = "1";
    popupContainer.style.pointerEvents = "auto";
}

function hidePopup() {
    popupContainer.style.opacity = "0";
    popupContainer.style.pointerEvents = "none";
}

function runPopupPreviewCode(){
    previewIframe.contentWindow.location.reload();

    previewIframe.addEventListener("load", () => {
        previewIframe.contentWindow.postMessage(getCodeFromEditor())
    })
}
function checkSharedStatus(){
    database.ref("sharedProjects/metadata/"+getSharedProjectId(projectId,getStoredUser().uid)).once("value", (snap) => {
        if(snap.exists()){
            console.log("project is shared!");
            shareButton.innerText = "Update";
        }
    })
}

checkSharedStatus();