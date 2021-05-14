import {app} from './app'
import {logger, PORT, HOME, zipDir} from './const';
import * as fs from 'fs';
import { response, log } from './util/interface';
import readline from 'readline';
import archiver from 'archiver'
import path from 'path';

app.listen(PORT, () => {logger.info(`app listening on port ${PORT}`)});

app.get('/list', async (request, response) =>{

    logger.info('request: GET | route: list');
    const relPath = request.query.path;
    const PATH = relPath===undefined ? HOME as any + '' : HOME as any + relPath;
    const stat = fs.statSync(PATH);    

    if (stat.isDirectory()){
        fs.readdir(PATH, (err, dirent) => {   
            if (err) return response.json(
                <response>{
                    status: 400, 
                    dirent: null, 
                    path: relPath, 
                    isFile: false, 
                    fileCont: null
                })

            const filtDirent = dirent.filter(dir => !dir.startsWith('.'))
            let obj=[] as any
            for (let dir of filtDirent){
                fs.statSync(path.join(PATH,dir)).isDirectory()
                    ? obj.push({name: dir, isFile: false, path: relPath+dir})
                    : obj.push({name: dir, isFile: true, path: relPath+dir})
            }
            return response.json(
                <response>{
                    status: 200, 
                    dirent: obj, 
                    path: relPath, 
                    isFile: false, 
                    fileCont: null
                })
        })

    }else{

        let text = [] as any;
        const readInterface = readline.createInterface({
            input: fs.createReadStream(PATH),
        })

        readInterface.on('line', (chunk) => {text.push(chunk)})
        readInterface.on('close', ()=> {
            return response.json(
                <response>{
                    status:200, 
                    dirent: null, 
                    path: relPath, 
                    isFile: true, 
                    fileCont: text
                })

        })
    }
});

app.post('/download', async(request, response) => {

    logger.info('request: POST | route: download')
    const archive = archiver('zip')
    const filePath = HOME+request.body.path;
    const fileName = path.basename(filePath)

    if (fs.statSync(filePath).isFile()){
        response.download(filePath, fileName, (err) => {
            if (err) {return response.json(
                <log>{
                    status: 400, 
                    action: 'DOWNLOAD: error retriving downloaded file', 
                    msg: err.message
                })}
        })

    }else{

        const outZip = fs.createWriteStream(zipDir+'target.zip');
        outZip.on('close', () => {
            response.download(zipDir+'target.zip', fileName, (err) => {
                if (err) {return response.json(
                    <log>{
                        status: 400, 
                        action: 'DOWNLAOD: error retriving compressed directory', 
                        msg: err.message
                    })};
            })
        });
        archive.on('error', (err) => {
            return response.json(
                <log>{
                    status: 400,
                    action: 'ARCHIVE: error compressing directory | '+ archive.pointer()+' bytes',
                    msg: err.message
                }
        ) });
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
            return response.json(
                <log>{
                    status: 400, 
                    action: 'MKDIR: failed to create directory',
                    msg: err.message
                })
        }
        return response.json(
            <log>{
                status: 200, 
                action: 'MKDIR',
                msg: 'SUCCESS'
            })
    })
})

app.post('/deleteElement', async (request, response) => {
    
    logger.info('request: POST | route: deleteElement')
    const path = HOME+request.body.path;
    
    fs.rm(path, {recursive: true}, (err)=> {
        if(err) {
            return response.json(
                <log>{
                    status: 400, 
                    action: 'DELETE: failed to remove element',
                    msg: err.message
                })
        }
        return response.json(
            <log>{
                status: 200,
                action: 'DELETE',
                msg:'SUCCESS'})
    })
})

app.post('/upload', async(request, response) => {

    logger.info('request: POST | route: upload')
    const form = JSON.parse(request.body.data);
    fs.readdir('src/util/multer/', (err, dirent)=> {
        if (err) {
            return response.json(
                <log>{
                    status: 400,
                    action: 'MULTER: filed to read file',
                    msg: err.message
                }
            )
        }

        fs.rename('src/util/multer/'+dirent[0], HOME+form.path+form.name, (err)=>{
            if (err) {
                return response.json(
                    <log>{
                        status: 400,
                        action: 'MULTER: failed to retrive document',
                        msg: err.message
                    })
            }
        })
    })
})