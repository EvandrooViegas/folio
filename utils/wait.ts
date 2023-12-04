export default function wait(time: number) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(time)
        }, time)
    })
}