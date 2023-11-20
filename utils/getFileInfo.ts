export default function getFileInfo(file: File | undefined) {
    if(!file) return 
    const fileNameSplit = file.name.split(".")
    const extension = fileNameSplit.at(-1)
    const name = fileNameSplit.at(0)
    const type = file.type
    return {  name, extension, type }
}