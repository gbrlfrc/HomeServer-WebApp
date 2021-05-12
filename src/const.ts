import {Logger} from 'log-lv';

export const HOME = process.argv[process.argv.length-1]+'/';
export const PORT = process.env.PORT || 3000;
export const logger = new Logger('info', {
    prefix: () => new Date().toISOString(),
    leftSeparator: '>>>'
});