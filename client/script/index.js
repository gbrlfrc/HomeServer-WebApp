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
    const mainContainer = document.getElementById('fileManager');
    if (data.isFile) {
        if (data.status === 404) console.log('error to retrive file content');
        else {
            const body = document.getElementById('body');
            console.log(data.fileCont)
            for (let line of data.fileCont){
                const pre = document.createElement('pre')
                pre.textContent = line;
                body.appendChild(pre);
            }
        }    
    }else{
        for (let dir of data.dirent){
            const label = document.createElement('div');
            label.setAttribute('class', 'fileManagerItem');
            dir.isFile
                ? label.classList.add('file')
                : label.classList.add('directory')
            label.setAttribute('value', dir.name);
            label.textContent=dir.name;
            label.onclick = () => { window.location = updateQuery(loc, dir);}
            mainContainer.appendChild(label);
        }
    }
}

const updateQuery = (url, dir) => {
    const query = url.searchParams;
    query.set('path', dir.isFile ? dir.path : dir.path+'/');
    url.search=query.toString();
    return url;
}