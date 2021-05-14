import {app} from './app';
import { PORT, logger, userDB, tokenDB} from './const';
import {addUserRecord, findUser} from './util/dbAction';
import {log, user} from './interface'; 
import bcrypt from 'bcrypt';
import {AuthenticateUser, generateAccessToken, generateRefreshToken, authenticateToken} from './util/oauthUtil';
import {access_secret, refresh_secret} from './util/.env';
import jwt from 'jsonwebtoken';


app.listen(PORT, () => {
    logger.info(`app listening on port ${PORT}`)
})

userDB.loadDatabase();
tokenDB.loadDatabase();

app.post('/signUp', (request, response) => {

    logger.info('request: POSR | route: signUp');
    findUser(request.body.userName)
        .then((doc: any) => {
            if (doc.length !==0){ return response.json(
                    <log>{
                        status: 400,
                        action: 'SIGNUP',
                        msg: 'this user name already exists'
                    })
            }else {
                bcrypt.hash(request.body.password, 10, (err, hash) => {
                    if (err) {return response.json(
                        <log>{
                            status: 400, 
                            action: 'HASHING',
                            msg: err.message
                        }
                    )}
                    const newUser = <user>{
                        name: request.body.userName,
                        mail: request.body.mail,
                        password: hash
                    }
                    addUserRecord(newUser)
                        .then((res: any) => {return response.json(res)})
                        .catch((err: any) => {return response.json(err)})
                })
            }
        })
})

app.post('/logIn', (request, response) => {

    logger.info('request: POST | route: logIn')
        const user = <user>{
            name: request.body.userName,
            password: request.body.password
    } 
    AuthenticateUser(user)
        .then((res: any) => {
            if (res.status === 200){
                const aToken=generateAccessToken(user);
                const rToken = generateRefreshToken(user);
                tokenDB.insert({token: rToken});
                if (!aToken) {return response.json(
                    <log>{
                        status: 400,
                        action: 'TOKEN',
                        msg: 'error while validation token'
                    })}
                return response.json(
                    {
                        status: 200, 
                        user: user,
                        access_token: aToken,
                        refresh_token: rToken
                    }) 
            }})
        .catch((err) => {return response.json(
            <log>{
                status: 400,
                action: 'USER AUTH',
                msg: 'wrong user name or password'
            }
        )})
})

app.post('/refreshToken', (request: any, response: any) => {
    logger.info(`recived POST | route: refreshToken`)
    const refresh_token = request.body.token;
    tokenDB.find({token: refresh_token}, (miss:any, find: any) => {
        if( find.length === 0  || refresh_token === null) return response.json(
            <log>{
                status: 400, 
                action: 'TOKEN',
                msg: 'error token expired'
            }
        );
        jwt.verify(refresh_token, refresh_secret, (err: any, user: any) => {           
            if (err) {return response.json(
                <log>{
                    status: 400,
                    action: 'TOKEN',
                    msg: err.message,
                })}
            const accessToken = generateAccessToken({name: user.name, password:user.password});
            response.json(
                {
                    status: 200,
                    action: 'GENERATE TOKEN',
                    msg: 'SUCCESS',
                    access_token: accessToken
                })
        })
    });
})

app.get('/verify', authenticateToken, (request, response) => {
    logger.info(`recived GET | route: verify`)
    response.json(
        <user>{
            name: request.body.name,
            password: request.body.password,
        });
});

app.delete('/logOut', (request, response) => {

    logger.info(`recived DELETE | route: logOut`)
    const refresh_token = request.body.token;
    tokenDB.remove({token: refresh_token}, {multi: false})
    response.json(
        <log>{
            status: 200,
            action: 'LOGOUT',
            msg: 'SUCCESS'
        }
    );
});