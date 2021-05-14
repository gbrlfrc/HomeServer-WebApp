import {userDB} from './../const';
import {user, log} from  './../interface';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import {access_secret, refresh_secret} from './.env';

export const AuthenticateUser = async(user: user) => {
    return new Promise((resolve, reject) => {
        userDB.find({name: user.name}, (err:any, foundUser: any)=> {
            if (err) return reject(
                <log>{
                    status: 400, 
                    action: 'FIND',
                    msg: 'wrong user or password',
                }
            );
            if (foundUser.length===0) {
                return reject(
                    <log>{
                        status: 400,
                        action: 'FIND',
                        msg: 'wrong user or password'
                    })
            }
            bcrypt.compare(user.password, foundUser[0].password, (err, res) => {
                if (err || !res) { return reject(
                    <log>{
                        status: 400,
                        action: 'COMPARING',
                        msg: 'wrong user or password'
                    }
                );}
                return resolve(
                    <log>{
                        status: 200,
                        action: 'COMPARING',
                        msg: 'SUCCESS'
                    }
                );
            });
        })
    })
};

export const authenticateToken = async(reuqest:any, response:any, next:any) => {
    const token = reuqest.headers['authorization'].split(' ')[1];
    if (token == null) {return response.json(
        <log>{
            status: 400,
            action: 'GET TOKEN',
            msg: 'error while retrtiving token'
        });}

    jwt.verify(token, access_secret, (err:any, user:any) => {
        if (err) return response.json(
            <log>{
                status: 400,
                action: 'CREATE TOKEN',
                msg: err.message
            }
        );
        reuqest.body = user;
        next();
    });
};

export const generateAccessToken = (user: user) => { return jwt.sign(user, access_secret, {expiresIn: '1m'});}
export const generateRefreshToken = (user:user) => { return jwt.sign(user, refresh_secret)}