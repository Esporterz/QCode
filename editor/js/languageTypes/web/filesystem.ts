
interface System{
    [location:string]:Folder
}
interface Folder{
    [name:string]:File|Folder
}


class Filesystem{
    private folders:System;
    onFileSystemUpdate:Function;

    constructor() {
        this.folders = {
            "/": {
                "index.html": new File("index", "html"),
                "js": {
                    "index.js": new File("index", "js"),
                }
            }
        }
        this.onFileSystemUpdate = ()=>{};
    }

    getFile(path:string):File{
        let sections = path.split("/");
        let name = sections.pop()
        let parentFolder = this.folders["/"];
        for(let folder in sections){
            let next = parentFolder[folder]
            if(isFolder(next)){
                parentFolder = <Folder>next;
            }
        }
        return <File>parentFolder[name!.split(".")[0]]
    }

    getFolder(path:string):Folder{
        let sections = path.split("/");
        sections.pop();
        let parentFolder = this.folders["/"];
        for(let folder in sections){
            let next = parentFolder[folder]
            if(isFolder(next)){
                parentFolder = <Folder>next;
            }
        }
        return parentFolder;
    }

    addFile(file:File,location:string){
        this.getFolder(location)[file.name] = file;
        this.onFileSystemUpdate();
    }

    getAll(){
        return this.folders
    }
}

const isFolder = (value: Folder|File)=> {
    if (value.extension)
        return false
    else
        return true;
}


class File{
    name: string;
    extension: string;
    content:string;
    constructor(name:string, extension: string) {
        this.name = name;
        this.extension = extension;
        this.content = "";
    }

    appendToHtml(upperHtml:any){
        let el = document.createElement("div");
        el.innerHTML = `
            <span class="icon">`+this.extension+`</span>
            <span class="filename">`+this.name+`</span>
        `
        upperHtml.appendChild(el);
    }

    getIcon(){

    }
}

export {Filesystem,isFolder,File,Folder,System}