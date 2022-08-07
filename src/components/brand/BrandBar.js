import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react-lite'
import { Card } from 'react-bootstrap'

import { Context } from '../..'
import './BrandBar.css'
import scrollUp from '../../utils/scrollUp'
import { SCROLL_TOP, SCROLL_TOP_MOBILE } from '../../utils/consts'


const BrandBar =  observer((props) => {

    const { product, brand } = useContext(Context)

    const [info, setInfo] = useState([])

    const history = useHistory()

    useEffect(() => {
        setInfo(brand.brands)
    },[brand.brands])

    const onClickCard = (br) => { 
        if (br) {
            history.push("/"+br?.name.toLowerCase())
        }else {
            history.push("/shop")
        }
        if (window.innerWidth > 991) {
            scrollUp(SCROLL_TOP)
        }else {
            scrollUp(SCROLL_TOP_MOBILE)
        }
        product.setPage(1)
    }


    return (
        <div className='BrandBar'>
            <Card
                style={{cursor: "pointer"}}
                border={undefined === brand.selectedBrand.id ? 'warning' : 'light'}
                bg={undefined === brand.selectedBrand.id ? 'warning' : ''}
                onClick={() => onClickCard(null)}
                key={0}
                className="p-3"
            >
                {window.innerWidth < 992 ? "В С Е" : "Все бренды"}
            </Card>
            {info.map(br => {
				
                if (br.name === "Leidtogi") {

                    let prod = false
                    if (process.env.REACT_APP_ENV === 'production' && (window.location.hostname === "leidtogi.ru" || window.location.hostname === "www.leidtogi.ru") ) prod = true
                    if ( ! prod ) {} // отключил, теперь бренд LeidTogi показывается всегда
                        return <Card
                            style={{cursor: "pointer", color: br.id === brand.selectedBrand.id ? "#000" : "#ff9900"}}
                            border={br.id === brand.selectedBrand.id ? 'warning' : 'light'}
                            bg={br.id === brand.selectedBrand.id ? 'warning' : ''}
                            onClick={() => onClickCard(br)}
                            key={br.id}
                            className="p-3"
                        >
                            {"LeidTogi"}
                        </Card>
                    // }else return null

                }else if (
                    br.name === "Milwaukee" 
                    || 
                    br.name === "Husqvarna" 
                    || 
                    br.name === "RGK" 
                    || 
                    br.name === "KVT" 
                    || 
                    br.name === "Gedore"
                    || 
                    br.name === "TMK"
                    || 
                    br.name === "Advanta"
                    || 
                    br.name === "Euroboor"
                ) {

                    return <Card
                        style={{cursor: "pointer"}}
                        border={br.id === brand.selectedBrand.id ? 'warning' : 'light'}
                        bg={br.id === brand.selectedBrand.id ? 'warning' : ''}
                        onClick={() => onClickCard(br)}
                        key={br.id}
                        className="p-3"
                    >
                        {br.name === "RGK" 
                        ? "R G K" 
                        : br.name === "KVT" 
                        ? "К В Т" 
                        : br.name === "Milwaukee" && window.innerWidth < 992
                        ? "M L K" 
                        : br.name === "Husqvarna" && window.innerWidth < 992
                        ? "H Q V" 
                        : br.name === "Gedore" && window.innerWidth < 992
                        ? "G E D" 
                        : br.name === "TMK"
                        ? "T M K" 
                        : br.name === "Advanta" && window.innerWidth < 992
                        ? "A D V" 
                        : br.name === "Euroboor" && window.innerWidth < 992
                        ? "E R B"
                        : br.name}
                    </Card>

                }else return null
                
            })}
        </div>
    )
})

export default BrandBar
