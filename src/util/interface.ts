export interface response{
    status: number,
    dirent: [] | null,
    path: string,
    isFile: boolean,
    fileCont: [] | null
}

export interface log{
    status: number,
    action: string,
    msg: string
}