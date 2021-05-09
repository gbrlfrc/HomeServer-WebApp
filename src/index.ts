import {app} from './app'
import {logger, PORT, HOME} from './const';
import * as fs from 'fs';

app.listen(PORT, () => {logger.info(`app listening on port ${PORT}`)});

app.get('/list', (request, response) =>{
    logger.info('request: POST | route: list');
   
    const PATH = HOME as any+request.query.path;
    const stat = fs.statSync(PATH);
    
    stat.isDirectory()
        ? (
            fs.readdir(PATH, (err, dirent) => {
                if (err) return response.json({status: 404, dirent: null, path: PATH, isFile: false});
                else {
                    let obj=[];
                    for (let dir of dirent){
                        fs.statSync(PATH+dir).isDirectory()
                            ? obj.push({name: dir, isFile: false, path: dir})
                            : obj.push({name: dir, isFile: true, path: dir})
                    }
                    return response.json({status: 200, dirent: obj, path: PATH, isFile: false})
                }
            })
        ) : response.json({status: 200, dirent: null, path: PATH, isFile: true})
});