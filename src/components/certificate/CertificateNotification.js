
import React, { useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { read, utils, writeFile } from "xlsx"

import { createCertificate, creatingCertificatesFromAFile, deleteCertificate, getAllCertificates, updateCertificate } from '../../http/certificateAPI'
import { codeGenerator } from '../../service/certificate/helpers'
import Notification from '../myBootstrap/Notification'
import { Button, Input } from '../myBootstrap'
import Loading from '../Loading'

import './CertificateNotification.css'


const CertificateNotification = (props) => { 
    
    const [ notificationVisible, setNotificationVisible ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ certificates, setCertificates ] = useState([])
    const [ feed, setFeed ] = useState(null)
    const [ list, setList ] = useState(null)
    
    let className
    if (props?.className) className = props?.className

    const exportFile = useCallback(() => {
        setLoading(true)
        const ws = utils.json_to_sheet(list)
        const wb = utils.book_new()
        utils.book_append_sheet(wb, ws, "Лист1")
        writeFile(wb, "Сертификаты.xlsx")
        setLoading(false)
    }, [list])
                                
    useEffect(() => { 
        if (feed) {
            // alert("Есть feed!")
            setLoading(true)
            feed.arrayBuffer()
                .then(d => {
                    const wb = read(d)
                    const ws = wb.Sheets[wb.SheetNames[0]]
                    let body = utils.sheet_to_json(ws)
                    // setList(body) 
                    body = body.map(item => {            
                        return {
                            id: item["№"],
                            name: item["Фамилия Имя Отечество"],
                            url: item["Ссылка"]
                        }
                    })
                    creatingCertificatesFromAFile(body)
                        .then(data => {
                            data = data.map(item => {          
                                return {
                                    "№": item.id,
                                    "Фамилия Имя Отечество": item.name,
                                    "Ссылка": item.url,
                                    "Промокод": item.code
                                }
                            })
                            setList(data) 

                            setLoading(false)
                            onClickButtonCertificates()
                        })
                        .catch(error => {
                            alert(error)
                            setLoading(false)
                        })
                }) 
                .catch(error => {
                    alert(error)
                    setLoading(false)
                })
                // .finally(() => setLoading(false))
        }
    },[feed])

    const onClickButtonCertificates = () => {
        getAllCertificates().then(data => {
            setCertificates(data)
        }).catch(error => alert(error))
    }

    const onClickButtonCreateSertificate= () => {
        createCertificate(codeGenerator())
            .then(data => {
                if (data) {
                    onClickButtonCertificates()
                }
            })
            .catch(error => {
                alert(error)
            })
    }

    const onClickButtonAssigned = (id) => {   
        let yes = confirm("Вы уверены что хотите назначить сертификат?")    
        if (yes) {
            updateCertificate(id, { state: "assigned" })
                .then(data => {
                    if (data) {
                        onClickButtonCertificates()
                    }
                })
                .catch(error => {
                    alert(error)
                })
        }
    }

    const onClickButtonDelete = (id) => {
        let yes = confirm("Вы уверены что хотите УДАЛИТЬ сертификат?")
        if (yes) {
            // updateCertificate(id, { state: "applied" })
            deleteCertificate(id)
                .then(data => {
                    if (data) {
                        onClickButtonCertificates()
                    }
                })
                .catch(error => {
                    alert(error)
                })
        }
    }


    return (
        <>
        <Button
            className={"CertificateNotification "+className}
            variant="warning"
            onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                setNotificationVisible(true)
                onClickButtonCertificates()
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
                setCertificates([])
                setNotificationVisible(false)
            }}
            time="600000" // в милисекундах
            size="lg"
            title="Работа с сертификатами."
            titleMore={"Тестовая версия."}
        >
            {loading 
            ? 
                <Loading /> 
            :
            <div
                className="CertificateNotification_Body"
            >
                {certificates && Array.isArray(certificates) && certificates[0] !== undefined &&
                <>
                <div
                    className="CertificateNotification_DivButtons"
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

                {/* {list && list.map(row => (
                <tr>
                    <td>{row["№"]}</td>
                    <td>{row["Фамилия Имя Отечество"]}</td>
                    <td>{row["Ссылка"]}</td>
                    <td>{row["Промокод"]}</td>

                </tr>
                ))} */}

                {/* {list && list.map(row => (
                <tr>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.url}</td>
                    <td>{row.code}</td>

                </tr>
                ))} */}
                

                <div>
                    <Button
                        variant="outline-success"
                        onClick={onClickButtonCreateSertificate}
                    >
                        Создать один
                    </Button>
                    &nbsp;
                    <span>или загрузить файл</span>&nbsp;
                    <input 
                        type="file"
                        className="CertificateNotification_Input" 
                        onChange={(e) => setFeed(e.target.files[0])} 
                        placeholder="Выберите файл" 
                        // accept="application/vnd.ms-excel"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    />
                    &nbsp;
                    {feed && <Button
                        variant="outline-primary"
                        onClick={exportFile}
                    >
                        Export XLSX
                    </Button>}
                </div>

                <hr />
      
                {certificates && Array.isArray(certificates) && certificates[0] !== undefined 
                ? 
                <table
                    className="CertificateNotification_Body_certificates"
                >
                    <thead>
                        <tr>
                            <th>№:</th>
                            <th>Код:</th>
                            <th>Статус:</th>
                            <th>Назначить:</th>
                            <th>Удалить:</th>
                        </tr>
                    </thead>
                    <tbody>
                    {certificates.reverse().map(item => {
                        let order_id = "", state = ""
                        if (item.state === "issued") state = "выпущен"
                        if (item.state === "assigned") state = "назначен"
                        if (item.state === "applied") {
                            state = "применён"
                            order_id = " к заказу - " + item?.order_id
                        }
                        return (
                        <tr key={item.id + "certify"}>
                            <th>{item.id}</th>
                            <th className="CertificateNotification_span_code">{item.code}</th>
                            {/* &nbsp;-&nbsp; */}
                            <th>{state + order_id}</th>
                            <th>
                                <Button
                                    variant="outline-warning"
                                    onClick={() => onClickButtonAssigned(item.id)}
                                    disabled={item.state !== "issued" && true}
                                >
                                    Назначить
                                </Button>
                            </th>
                            <th>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => onClickButtonDelete(item.id)}
                                    disabled={item.state === "applied" && true}
                                >
                                    Удалить
                                </Button>
                            </th>
                            {/* <br /> */} 
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
                :
                <>
                    <span className="CertificateNotification_span_no_cert" >Ещё нет созданных сертификатов</span>
                    <br />
                    <hr />
                </>
                }

                <div
                    className="CertificateNotification_DivButtons"
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

export default observer(CertificateNotification)
