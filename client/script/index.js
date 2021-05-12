const loc = new window.URL(window.location.href);
const serverUrl = new window.URL(loc.protocol+'//'+loc.hostname+':3000');

const readDir = async() => {
    const response = await fetch(serverUrl+'list'+loc.search, {
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
        dir.isFile
            ? (
                img.setAttribute('src', './assets/file.png'),
                img.setAttribute('alt', 'FILE')
            ) : (
                img.setAttribute('src', './assets/dir.png'),
                img.setAttribute('alt', 'DIR')
            )
        card.setAttribute('value', dir.name);
        card.appendChild(img);
        const textCont = document.createElement('div');
        textCont.classList.add('textContainer')
        const dirName = document.createElement('p');
        dirName.textContent=dir.name;
        card.onclick = () => {
            document.getElementById('lastFile').value = dir.path;
        }
        card.addEventListener('dblclick', () => {
            window.location = updateQuery(loc, dir);
        })
        card.appendChild(dirName);
        mainContainer.appendChild(card);
    }
}

const transposeFile = (data) => {
    const mainContainer = document.getElementById('fileManager')
    const p = document.createElement('p')
    p.textContent=data.path;
    p.classList.add('titleFile');
    mainContainer.appendChild(p)
    const body = document.getElementById('body');
    for (let line in data.fileCont){
        const pre = document.createElement('pre')
        pre.textContent = line+'   '+data.fileCont[line];
        body.appendChild(pre);
    }
}

const attachBlob = () => {
    const file = document.getElementById('lastFile').value;
    fetch(serverUrl+'download', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({path: file})
    })
        .then(res => res.blob())
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = file.split('/')[file.split('/').length-1];
            document.body.appendChild(a);
            a.click();    
            a.remove();
        })
}