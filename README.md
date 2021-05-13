# WebApp.Server

Access to remote File System via Web-App.<br>
![](https://github.com/gbrlfrc/HomeServer-WebApp/blob/main/client/assets/preview.png)

# Installation & Usage

* Run `git clone https://github.com/gbrlfrc/HomeServer-WebApp.git` to clone repository.
* `cd HomeServer-WebApp && yarn install` to install dependecies.
<br>

* To start server `yarn dev /absoulute/path/to/dir` or `yarn start /absoulute/path/to/dir`.
<br>NOTE: alternatively you can use the bash script `start.sh` passing the directory as argument.

* To start client simply open `HomeServer-WebApp/client/index.html` on an HTTP server like [Apache](https://www.html.it/guide/guida-apache/) or [VS-Code LiveServer](https://github.com/ritwickdey/vscode-live-server) extension.

# ToDo

- [x] API: download file 
- [x] API: compress and download directory 
- [x] API: add and remove directory 
- [x] API: upload single file
- [ ] API: upload directory
- [ ] OAuth Server
  - [ ] Authentication
    - [ ] NeDB database credentials
    - [ ] Bcrypt credentials encrypting 
  - [ ] Authorization
    - [ ] Access and Refresh token workflow
- [x] CLIENT: FileManager workflow
- [ ] CLIENT: LogIn
- [ ] CLIENT: js, python, html, css Parser
- [ ] CLIENT: Live editor
