import { 
    DELIVERY_DL_DERIVAL_CITY_MILWAUKEE,
    DELIVERY_DL_DERIVAL_CITY_RGK,
    DELIVERY_DL_DERIVAL_CITY_HUSQVARNA,
    DELIVERY_DL_DERIVAL_CITY_GEDORE
} from "../../../utils/consts"


export default function getDerivalCity(brand) {
    let derival_city
    if (brand === "milwaukee") derival_city = DELIVERY_DL_DERIVAL_CITY_MILWAUKEE
    else if (brand === "rgk") derival_city = DELIVERY_DL_DERIVAL_CITY_RGK
    else if (brand === "husqvarna") derival_city = DELIVERY_DL_DERIVAL_CITY_HUSQVARNA
    else if (brand === "gedore") derival_city = DELIVERY_DL_DERIVAL_CITY_GEDORE
    else return { error: "Не найден derival_city" }

    return derival_city
}