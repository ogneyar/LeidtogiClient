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
import { ADMIN_ROUTE } from '../../utils/consts';

import './ParserPage.css'


const ParserPage = observer(() => {

    const [ brand, setBrand ] = useState("")

    const history = useHistory()

    
    if (brand === "") 
    return (
        <InfoPage>
            <div className="ParserPage_Header">
                <label>Заведение товаров на сайт!</label>
                <button onClick={() => setBrand("leidtogi")} >LeidTogi</button>
                <button onClick={() => setBrand("milwaukee")} >Milwaukee</button>
                <button onClick={() => setBrand("rgk")} >RGK</button>
                <button onClick={() => setBrand("husqvarna")} >Husqvarna</button>
                <button onClick={() => setBrand("kvt")} >КВТ</button>
                <button onClick={() => setBrand("gedore")} >Gedore</button>
                <br />
                <button onClick={() => history.push(ADMIN_ROUTE)} >Назад</button>
            </div>
        </InfoPage>
    )
        
    if (brand === "leidtogi") return <LeidTogiParserPage setBrand={setBrand} />

    if (brand === "milwaukee") return <MilwaukeeParserPage setBrand={setBrand} />

    if (brand === "rgk") return <RgkParserPage setBrand={setBrand} />
    
    if (brand === "husqvarna") return <HusqvarnaParserPage setBrand={setBrand} />

    if (brand === "kvt") return <KvtParserPage setBrand={setBrand} />
    
    if (brand === "gedore") return <GedoreParserPage setBrand={setBrand} />

})

export default ParserPage;
