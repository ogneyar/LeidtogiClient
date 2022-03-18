
export default function deleteAbbreviation(string){

    return string
        .replace("-","")
        .replace("mlk","")
        .replace("rgk","")
        .replace("hqv","")
        .replace("kvt","")
        .replace("ged","")
        .replace("erb","")
        .replace("esa","")
        .trim()
}