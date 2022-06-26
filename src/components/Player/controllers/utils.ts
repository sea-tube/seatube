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