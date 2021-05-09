const loc = new window.URL(window.location.href);
const serverUrl = new window.URL(loc.protocol+'//'+loc.hostname+':3000/list'+loc.search);

const setUp = async() => {
    updateQuery(loc, '/CodeProjects/')
    const data = await readDir();
    displayData(data);
}

const readDir = async() => {
    const response = await fetch(serverUrl, {
        method: 'GET',
    }); 
    return response.json();
}

const displayData = async (data) => {
    const mainContainer = document.getElementById('fileManager');
    for (let dir of data.dirent){
        const label = document.createElement('div');
        label.setAttribute('class', 'fileManagerItem');
        label.setAttribute('value', dir.name);
        label.textContent=dir.name;
        mainContainer.appendChild(label);
    }
}

const updateQuery = (url, queryValue) => {
    const query = new URLSearchParams(url);
    query.set('path', queryValue);
    history.replaceState(null, null, '?'+query.toString());
}