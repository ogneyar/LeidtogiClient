
export default function leidtogiFirst(data) {

    let leidtogi
                    data = data.filter(i => {
                        if (i.name === "Leidtogi") {
                            leidtogi = i
                            return false
                        }else return true
                    })
                    if (leidtogi) data.unshift(leidtogi) // Leidtogi на первое место

                    return data

}