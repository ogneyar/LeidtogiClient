
import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { read, utils } from "xlsx"

import Notification from '../myBootstrap/Notification'
import { Button } from '../myBootstrap'
import Loading from '../Loading'

import './Testing.css'


const Testing = (props) => { 
    
    const [ notificationVisible, setNotificationVisible ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ price, setPrice ] = useState([])
    const [ feed, setFeed ] = useState(null)
    
    let className
    if (props?.className) className = props?.className

                                
    useEffect(() => { 
        if (feed) {
            // alert("Есть feed!")
            setLoading(true)
            
            const reader = new FileReader()
            reader.readAsBinaryString(feed)
            reader.onload = (e) => {
                const data = e.target.result
                const workbook = read(data, { type: 'binary', codepage: "utf-8" })
                let sheetData = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])

                sheetData = sheetData.map((item, idx) => {
                    return {
                        // name: item["Íàçâàíèå"],
                        article: item["Àðòèêóë"],
                        quantity: item["Îñòàòîê Êàëóãà"] + item["Îñòàòîê ÑÏÁ"],
                        price: item["Öåíà"]
                    }
                })
                console.log({sheetData})
                setPrice(sheetData)
            }
            setLoading(false)
        }
    },[feed])



    return (
        <>
        <Button
            className={"CertificateNotification "+className}
            variant="warning"
            onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                setNotificationVisible(true)
            }}
        >
            {props.children || props.text}
        </Button>

        <Notification 
            close={false}
            show={notificationVisible} 
            onHide={() => {
                setSuccess(false)
                setLoading(false)
                setPrice([])
                setNotificationVisible(false)
            }}
            time="600000" // в милисекундах
            size="lg"
            title="Тесты EXCEL."
            titleMore={"..."}
        >
            {loading 
            ? 
                <Loading /> 
            :
            <div
                className="Testing_Body"
            >
                {price && Array.isArray(price) && price[0] !== undefined &&
                <>
                <div
                    className="Testing_DivButtons"
                >          
                    <Button
                        variant="outline-primary"
                        onClick={() => setNotificationVisible(false)}
                    >
                        Назад
                    </Button>
                </div>
                <br />
                </>}

                <div>
                    <span>Загрузить файл</span>&nbsp;
                    <input 
                        type="file"
                        className="Testing_Input" 
                        onChange={(e) => setFeed(e.target.files[0])} 
                        placeholder="Выберите файл" 
                        // accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    />
                </div>

                <hr />
      
                {price && Array.isArray(price) && price[0] !== undefined 
                ? 
                <table
                    className="Testing_Body_certificates"
                >
                    <thead>
                        <tr>
                            <th>Артикул:</th>
                            <th>Цена:</th>
                            <th>Остаток:</th>
                        </tr>
                    </thead>
                    <tbody>
                    {price.map(item => {
                        return (
                        <tr key={item.id + "certify"}>
                            <th>{item.article}</th>
                            <th className="Testing_span_code">{item.price}</th>
                            <th>{item.quantity}</th>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
                :
                <>
                    <span className="Testing_span_no_cert" >Ещё нет загруженного прайса</span>
                    <br />
                    <hr />
                </>
                }

                <div
                    className="Testing_DivButtons"
                >          
                    <Button
                        variant="outline-primary"
                        onClick={() => setNotificationVisible(false)}
                    >
                        Назад
                    </Button>
                </div>
            </div>
            }
        </Notification>
        </>
    )
}

export default observer(Testing)
