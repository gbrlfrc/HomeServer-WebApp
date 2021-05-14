import { Logger } from 'log-lv'
import Nedb from 'nedb';

export const PORT = process.env.PORT || 4000;
export const logger = new Logger('info', {
    prefix: () => new Date().toISOString(),
    leftSeparator: '>>>',
})
export const userDB = new Nedb('./OAuth/db/user');
export const tokenDB = new Nedb('./OAuth/db/token')