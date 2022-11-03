import React, { useState } from 'react'
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';

import InfoPage from '../info/InfoPage';
import LeidTogiParserPage from './leidtogi/LeidTogiParserPage';
import MilwaukeeParserPage from './milwaukee/MilwaukeeParserPage';
import RgkParserPage from './rgk/RgkParserPage';
import HusqvarnaParserPage from './husqvarna/HusqvarnaParserPage';
import KvtParserPage from './kvt/KvtParserPage';
import GedoreParserPage from './gedore/GedoreParserPage';
import TmkParserPage from './tmk/TmkParserPage';
import BrandParserPage from './brand/BrandParserPage';
import { ADMIN_ROUTE, SCROLL_TOP, SCROLL_TOP_MOBILE } from '../../utils/consts';
import scrollUp from '../../utils/scrollUp';

import './ParserPage.css'


const ParserPage = observer(() => {

    const [ brand, setBrand ] = useState("")

    const history = useHistory()

    const setBrandAndScroll = (name) => {
        setBrand(name)
        scrollUp(window.innerWidth < 700 ? SCROLL_TOP_MOBILE : SCROLL_TOP)
    }

    
    if (brand === "") 
    return (
        <InfoPage>
            <div className="ParserPage_Header">
                <label>Заведение товаров на сайт!</label>
                <button onClick={() => setBrandAndScroll("leidtogi")} >LeidTogi</button>
                <button onClick={() => setBrandAndScroll("milwaukee")} >Milwaukee</button>
                <button onClick={() => setBrandAndScroll("rgk")} >RGK</button>
                <button onClick={() => setBrandAndScroll("husqvarna")} >Husqvarna</button>
                <button onClick={() => setBrandAndScroll("kvt")} >КВТ</button>
                <button onClick={() => setBrandAndScroll("gedore")} >Gedore</button>
                <button onClick={() => setBrandAndScroll("tmk")} >TMK</button>
                <button onClick={() => setBrandAndScroll("advanta")} >Advanta-M</button>
                <button onClick={() => setBrandAndScroll("euroboor")} >Euroboor</button>
                <button onClick={() => setBrandAndScroll("tor")} >Tor</button>
                <button onClick={() => setBrandAndScroll("krause")} >Krause</button>
                <br />
                <button onClick={() => history.push(ADMIN_ROUTE)} >Назад</button>
            </div>
        </InfoPage>
    )
        
    if (brand === "leidtogi") return <LeidTogiParserPage setBrand={setBrandAndScroll} />

    else if (brand === "milwaukee") return <MilwaukeeParserPage setBrand={setBrandAndScroll} />

    else if (brand === "rgk") return <RgkParserPage setBrand={setBrandAndScroll} />
    
    else if (brand === "husqvarna") return <HusqvarnaParserPage setBrand={setBrandAndScroll} />

    else if (brand === "kvt") return <KvtParserPage setBrand={setBrandAndScroll} />
    
    else if (brand === "gedore") return <GedoreParserPage setBrand={setBrandAndScroll} />

    else if (brand === "tmk") return <TmkParserPage setBrand={setBrandAndScroll} brand={brand} />

    else return <BrandParserPage setBrand={setBrandAndScroll} brand={brand} />

    // if (brand === "euroboor") return <BrandParserPage setBrand={setBrandAndScroll} brand={brand} />

    // if (brand === "tor") return <BrandParserPage setBrand={setBrandAndScroll} brand={brand} />

    // if (brand === "krause") return <BrandParserPage setBrand={setBrandAndScroll} brand={brand} />

})

export default ParserPage;
