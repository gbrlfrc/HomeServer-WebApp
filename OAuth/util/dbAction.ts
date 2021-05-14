import {userDB} from '../const';
import {user, log} from '../interface';

export const addUserRecord = async (record: user) => {
    
    return new Promise((resolve, reject) => {
        userDB.insert(record, (err, res) => {
            if (err) {return reject(
                <log>{
                    status: 400,
                    action: 'INSERT',
                    msg: err.message
                })
            }
            return resolve(
                <log>{
                    status: 200,
                    action: 'INSERT',
                    msg: 'SUCCESS'
                }
            )
        })
    })
}

export const findUser = async  (name: string) => {

    return new Promise ((resolve, reject) => {
        userDB.find ({name: name}, (err: any, doc: any) => {
            if (err) {return reject(
                <log>{
                    status: 400,
                    action: 'FIND: failed to find user',
                    msg: err.message
                })
            }
            return resolve(doc)
        })
    })
}