
export default function addedTmkBrands(data) {
    let array = []
    if (data && Array.isArray(data)) {
        data.forEach(i => {
            array.push(i)
            if (i.name === "TMK") {
                array.push({id: 3050, name: "Redverg"})
                array.push({id: 3051, name: "Concorde"})
                array.push({id: 3052, name: "Kvalitet"})            
            }
        })
    }
    
    return array

}