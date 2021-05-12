const download = document.getElementById('toolDownload');
download.onclick = () => {
    document.getElementById('lastFile').value
        ? attachBlob()
        : alert('Select one FILE to download first!')
}

const refresh = document.getElementById('toolRefresh');
refresh.onclick = () =>{
    window.location = window.location.href
}

const newDir = document.getElementById('newDir');
newDir.onclick = () => {
    document.getElementById("myForm").style.display = "block";
}

const closeForm = () => {
  document.getElementById("myForm").style.display = "none";
}

const createDir = () => {
    fetch(serverUrl+'newDir', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({path: getCurrentPath()+document.getElementById('newDirName').value})
    })
}