# WebApp.Server

Access to remote File System via Web-App.<br>
![](https://github.com/gbrlfrc/HomeServer-WebApp/blob/main/client/assets/preview.png)

# Installation & Usage

* Run `git clone https://github.com/gbrlfrc/HomeServer-WebApp.git` to clone repository.
* `cd HomeServer-WebApp && yarn install` to install dependecies.
<br>

* To start file-manager server `yarn dev /absoulute/path/to/dir` or `yarn start /absoulute/path/to/dir`.
<br>NOTE: alternatively you can use the bash script `start.sh` passing the directory as argument. <br>

| API | METHOD | DESCRIPTION | REQUESTED BODY | RETURNED TYPE |
| --- | --- | --- | --- | --- | 
| `/list` | GET | parse directory provided by user as absolute path | null | JSON |
| `/download` | POST | retrive file or directory as attachment | relative path as string | ATTACHMENT |
| `/newDir` | POST | create new directory | relative path as string | JSON |
| `/deleteElement` | POST | delete an element | relative path as string | JSON | 
| `/upload` | POST | upload file | Form-Data | JSON |

```javascript
  OBJ{
    status : 200 || 400,
    dirent : Array<JSON> || null,
    path : string,
    isFile : boolean,
    fileCont : Array<string>
  }
``` 
|


* To start client simply open `HomeServer-WebApp/client/index.html` on an HTTP server like [Apache](https://www.html.it/guide/guida-apache/) or [VS-Code LiveServer](https://github.com/ritwickdey/vscode-live-server) extension.

# ToDo

- [x] API: download file 
- [x] API: compress and download directory 
- [x] API: add and remove directory 
- [x] API: upload single file
- [ ] API: upload directory
- [ ] OAuth Server
  - [x] Authentication
    - [x] NeDB database credentials
    - [x] Bcrypt credentials encrypting 
  - [ ] Authorization
    - [ ] Access and Refresh token workflow
- [x] CLIENT: FileManager workflow
- [x] CLIENT: LogIn
- [ ] CLIENT: js, python, html, css Parser
- [ ] CLIENT: Live editor
