// Seconds to hh:mm:ss format
export const timeFormat = (seconds: number) => {
    const toInt = (n: number) => n | 0
    let h = seconds / (60 * 60)
    let m: any = (h - toInt(h)) * 60
    let s = ((m - toInt(m)) * 60).toFixed(0)
    if (m <= 9) m = '0' + toInt(m)
    if (Number(s) <= 9) s = '0' + s
    if (toInt(h)) return (toInt(h) + ':' + m + ':' + s)
    return (toInt(m) + ':' + s)
}


// Resolve a promise after delay in milliseconds
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 
 * If necessary, add an extra delay to ensure completion of the animation.
 * The result will be returned async. You can use await or .then / .catch
 * 
 * @param task: Your async function. Ensure to return the result 
 * @param duration: Your animation duration in ms 
 * @returns The result of your task
 */
export const ensureAnimation = async (task: Function, duration: number): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        const animationTime = duration; //ms
        const startedTime = Date.now();
        try {
            const result = await task();
            const computedDelay = Date.now() - startedTime;
            if (computedDelay < animationTime) await sleep(animationTime - computedDelay);
            resolve(result);
        } catch (err) {
            reject(err);
        }

    })
}