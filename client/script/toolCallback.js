const download = document.getElementById('toolDownload');
download.onclick = () => {
    document.getElementById('lastFile').value
        ? downloadFile()
        : alert('Select one FILE to download first!')
}

const refresh = document.getElementById('toolRefresh');
refresh.onclick = () =>{
    window.location = window.location.href
}