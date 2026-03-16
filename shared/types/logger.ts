export function createLogger(scope: string) {
    return {
        info: (msg: string, ...args: any[]) =>
            console.log(`[${scope}] ${msg}`, ...args),

        warn: (msg: string, ...args: any[]) =>
            console.warn(`[${scope}] ${msg}`, ...args),

        error: (msg: string, ...args: any[]) =>
            console.error(`[${scope}] ${msg}`, ...args),
    };
}
