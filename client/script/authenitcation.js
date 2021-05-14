const url = new window.URL(window.location);
const serverUrl = url.protocol+'//'+url.hostname+':4000';

const signRedirect = (form) => {
    window.location.href = url.origin+'/client/'+form;
}

const signUp = () => {

    const user = {
        userName : document.getElementById('username').value,
        mail : document.getElementById('mail').value,
        password : document.getElementById('password').value,
    }
    const confPass = document.getElementById('confPassword').value;

    if (user.name === "" ||
        user.mail === "" ||
        user.pass === "" ||
        confPass === ""){alert('All fileds are required!');}
    else{
        if (user.password !== confPass) {alert('password does not correspond!')}
        else {
            fetch(serverUrl+'/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 400) {
                        alert(data.msg)
                    }
                    else (
                        signRedirect('logIn.html')
                    )
                })
        }
    }
}

const logIn = () => {
    const user = {
        userName: document.getElementById('user').value,
        password: document.getElementById('password').value
    }
    if(user.userName === "" || user.password === "" ){
        alert('All fileds are required!')
    }else {
        fetch(serverUrl+'/logIn', {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status === 400){alert(data.msg)}
                else{
                    localStorage.setItem('accessToken', data.access_token)
                    localStorage.setItem('refreshToken', data.refresh_token)
                    signRedirect('fileManager.html?path=');
                }
            })
    }
}