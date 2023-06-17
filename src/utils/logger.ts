enum LogLevel {
    Info = 'info',
    Warn = 'warn',
    Error = 'error',
  }

const isDevelopmentMode = process.env.NODE_ENV === 'development';

const log = (type:LogLevel, ...arg:string[])=>{
    if(isDevelopmentMode&&type === 'warn'){
        return;
    }
    if(arg.length){
        const moduleInfo = arg.shift();
        const message = arg.join('、')
        console[type](`${moduleInfo}: ${message}`)
    }
}

export const info =  (...arg:string[])=>{
    return log(LogLevel.Info,...arg)
}

export const warn =  (...arg:string[])=>{
    return log(LogLevel.Warn,...arg)
}

export const error =  (...arg:string[])=>{
    return log(LogLevel.Error,...arg)
}

