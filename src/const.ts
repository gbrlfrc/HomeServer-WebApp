import {Logger} from 'log-lv';

export const HOME = process.env.HOME+'/CodeProjects/';
export const PORT = process.env.PORT || 3000;
export const logger = new Logger('info', {
    prefix: () => new Date().toISOString(),
    leftSeparator: '>>>'
});