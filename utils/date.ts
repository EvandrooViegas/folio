import moment from "moment"
export type D = Date | string | null | undefined
export const date = {
    fromNow: (d: D) => {
        if(!d) return
        return moment(d).fromNow()
    },
    format: (d: D) =>
    {
    if(!d) return 
    return moment(d).format('MMMM Do YYYY')    
    }
    
}