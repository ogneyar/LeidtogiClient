// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';

import InfoPage from '../info/InfoPage';
import MilwaukeeParserPage from './milwaukee/MilwaukeeParserPage';
import RgkParserPage from './rgk/RgkParserPage';
import HusqvarnaParserPage from './husqvarna/HusqvarnaParserPage';
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
                    <button onClick={() => setBrand("milwaukee")} >Milwaukee</button>
                    <button onClick={() => setBrand("rgk")} >RGK</button>
                    <button onClick={() => setBrand("husqvarna")} >Husqvarna</button>
                    <br />
                    <button onClick={() => history.push(ADMIN_ROUTE)} >Назад</button>
                </div>
            </InfoPage>
        )
        
    if (brand === "milwaukee") return <MilwaukeeParserPage setBrand={setBrand} />

    if (brand === "rgk") return <RgkParserPage setBrand={setBrand} />
    
    if (brand === "husqvarna") return <HusqvarnaParserPage setBrand={setBrand} />

})

export default ParserPage;
