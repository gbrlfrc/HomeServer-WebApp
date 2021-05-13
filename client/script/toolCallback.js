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

const toolUpload = document.getElementById('toolUpload');
toolUpload.onclick = () => { document.getElementById('inputFile').click();}

const uploadFile = async (file) => {

    let dataForm = new FormData();
    const data = {
        name : file.files[0].name,
        type : file.files[0].name.split('.')[file.files[0].name.split('.').length-1],
        path : getCurrentPath()
    }
    
    dataForm.append('file', file.files[0]);
    dataForm.append('data', JSON.stringify(data));
    
    const ctrl = new AbortController();
    setTimeout(() => ctrl.abort(), 10000);
    
    console.log(file.files)

    try{
        fetch(serverUrl+'upload', {
            method: 'POST',
            body: dataForm,
        })
            .then(res => res.json())
            .then(data => {console.log(data)})
            .catch(err => {console.log(err)})
    }catch(err){
        console.log(err)
    }
}