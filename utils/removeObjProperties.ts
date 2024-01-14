export default function removeObjProperties<T extends object>(properties: (keyof T)[], ...objs: T[]): T[] {
    return objs.map(obj => {
        const nObj: Partial<T> = {};
        const keys = Object.keys(obj) as (keyof T)[];
        keys.forEach(k => {
            if (properties.includes(k)) return;
            nObj[k] = obj[k];
        });
        return nObj as T;
    });
}