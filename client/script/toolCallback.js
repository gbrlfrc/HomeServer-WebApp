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

const closeForm_newDir = () => {
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
    document.getElementById("myForm").style.display = "none";
}

const del = document.getElementById('deleteElement');
del.onclick = () => {
    const path = document.getElementById('lastFile').value;
    path!== undefined
        ? (
            document.getElementById('deleteFormTitle').innerHTML = 'Want to delete <b>'+path+'</b> permanently?',
            document.getElementById('myForm2').style.display = "block"
        ) : (
            alert('Select one Element first')
        )
}

const closeForm_delEl = () => {
    document.getElementById("myForm2").style.display = "none"
}

const deleteEl = () => {
    fetch(serverUrl+'deleteElement', {
        method: 'POST',
        headers: {
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify({path: document.getElementById('lastFile').value})
    })
    document.getElementById("myForm2").style.display = "none";
}