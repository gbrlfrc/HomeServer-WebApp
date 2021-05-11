const loc = new window.URL(window.location.href);
const serverUrl = new window.URL(loc.protocol+'//'+loc.hostname+':3000/list'+loc.search);

const readDir = async() => {
    const response = await fetch(serverUrl, {
        method: 'GET',
    }); 
    return response.json();
}

const displayData = async () => {
    const data = await readDir();
    if (data.isFile) {
        if (data.status === 404) console.log('error to retrive file content');
        else {transposeFile(data)}    
    }else{
        buildCard(data)
    }
}

const updateQuery = (url, dir) => {
    console.log(dir);
    const query = url.searchParams;
    query.set('path', dir.isFile ? dir.path : dir.path+'/');
    url.search=query.toString();
    return url;
}

const buildCard = (data) =>{
    const mainContainer = document.getElementById('fileManager');
    for (let dir of data.dirent){
        const card = document.createElement('div');
        card.setAttribute('class', 'fileManagerItem');
        const img = document.createElement('img');
        img.setAttribute('style', 'width:100%')
        if (dir.isFile){
            img.setAttribute('src', './assets/file.png');
            img.setAttribute('alt', 'FILE')
        }else{
            img.setAttribute('src', './assets/dir.png');
            img.setAttribute('alt', 'DIR')
        }
        card.setAttribute('value', dir.name);
        card.appendChild(img);
        const textContent = document.createElement('div');
        textContent.classList.add('textContainer')
        const dirName = document.createElement('p');
        dirName.textContent=dir.name;
        card.appendChild(dirName)
        card.onclick = () => { window.location = updateQuery(loc, dir);}
        mainContainer.appendChild(card);
    }
}

const transposeFile = (data) => {
    const body = document.getElementById('body');
    for (let line in data.fileCont){
        const pre = document.createElement('pre')
        pre.textContent = line+'   '+data.fileCont[line];
        body.appendChild(pre);
    }
}