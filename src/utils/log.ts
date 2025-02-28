enum LogLevels {
    TRACE,
    DEBUG,
    LOG,
    INFO,
    WARNING,
    ERROR,
    FATAL
}

const logLevelColors = {
    [LogLevels.TRACE]: '\x1b[34m', // Blue
    [LogLevels.DEBUG]: '\x1b[36m', // Cyan
    [LogLevels.LOG]: '\x1b[32m',   // Green
    [LogLevels.INFO]: '\x1b[37m',  // White
    [LogLevels.WARNING]: '\x1b[33m', // Yellow
    [LogLevels.ERROR]: '\x1b[31m', // Red
    [LogLevels.FATAL]: '\x1b[35m'  // Magenta
}

const resetColor = '\x1b[0m';


// slog -> it means structured loggin, based in go slog
function slog(level: LogLevels, message: string) {
    const color = logLevelColors[level]
    const levelName = LogLevels[level].toUpperCase()

    switch (level) {
        // USE IT WHEN TRACING THINGS -> mem consump and things like that
        case LogLevels.TRACE:
            console.log(`${color}[${levelName}] - ${message}${resetColor}`)
            break
        // USE IT WHEN DEBUGGING THINGS -> fct outputs and things like that
        case LogLevels.DEBUG:
            console.log(`${color}[${levelName}] - ${message}${resetColor}`)
            break
        // NORMAL LOGIN, PRINTLIKE
        case LogLevels.LOG:
            console.log(`${color}[${levelName}] - ${message}${resetColor}`)
            break
        // INFORMATION 
        case LogLevels.INFO:
            console.log(`${color}[${levelName}] - ${message}${resetColor}`)
            break
        // WARNING 
        case LogLevels.WARNING:
            console.log(`${color}[${levelName}] - ${message}${resetColor}`)
            break
        // ERRORING
        case LogLevels.ERROR:
            console.log(`${color}[${levelName}] - ${message}${resetColor}`)
            break
        // SUPER ERRORING
        case LogLevels.FATAL:
            console.log(`${color}[${levelName}] - ${message}${resetColor}`)
            process.exit(1)
        default:
            console.log(`[DEFAULT] - ${message}`)
            break
    }
}


