import {app} from './app'
import {logger, PORT, HOME, zipDir} from './const';
import * as fs from 'fs';
import { response } from './util/interface';
import readline from 'readline';
import archiver from 'archiver'

app.listen(PORT, () => {logger.info(`app listening on port ${PORT}`)});

app.get('/list', async (request, response) =>{   
    logger.info('request: GET | route: list');

    const relPath = request.query.path;
    const PATH = relPath===undefined ? HOME as any + '' : HOME as any + relPath;
    const stat = fs.statSync(PATH);    

    if (stat.isDirectory()){
        fs.readdir(PATH, (err, dirent) => {                
            if (err) return response.json({status: 404, dirent: null, path: relPath, isFile: false, fileCont: null})
            const filtDirent = dirent.filter(dir => !dir.startsWith('.'))
            let obj=[] as any
            for (let dir of filtDirent){
                fs.statSync(PATH+'/'+dir).isDirectory()
                    ? obj.push({name: dir, isFile: false, path: relPath+dir})
                    : obj.push({name: dir, isFile: true, path: relPath+dir})
            }
            return response.json(<response>{status: 200, dirent: obj, path: relPath, isFile: false, fileCont: null})
        })
    }else{
        let text = [] as any;
        const readInterface = readline.createInterface({
            input: fs.createReadStream(PATH),
        })
        readInterface.on('line', (chunk) => {text.push(chunk)})
        readInterface.on('close', ()=> {
            return response.json(<response>{status:200, dirent: null, path: relPath, isFile: true, fileCont: text})
        })
    }
});

app.post('/download', async(request, response) => {
    logger.info('request: POST | route: download')
    const archive = archiver('zip')
    const filePath = HOME+request.body.path;
    const fileName = filePath.split('/')
    if (fs.statSync(filePath).isFile()){
        response.download(filePath, fileName[fileName.length-1], (err) => {
            if (err) console.error(err);
        })
    }else{
        const outZip = fs.createWriteStream(zipDir+'target.zip');

        outZip.on('close', function () {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
            response.download(zipDir+'target.zip', fileName[fileName.length-1], (err) => {
                if (err) console.error(err);
            })
        });
        archive.on('error', (err) => { console.error(err); });
        archive.pipe( outZip );
        archive.directory(filePath, false);
        archive.directory('subdir/', 'new-subdir');

        archive.finalize();
    }
})

app.post('/newDir', async (request, response) => {
    logger.info('request: POST | route: newDir');
    const path = HOME+request.body.path;
    if (fs.existsSync(path)) return response.json({status: 400, msg: 'Directory already exists!'});
    fs.mkdir(path, (err) => {
        if (err) {
            console.error(err);
            return response.json({status: 400, msg: 'Failed to create directory'})
        }
        return response.json({status: 200, msg:""})
    })
})