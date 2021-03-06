import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import uuid from 'react-uuid'
import $ from 'jquery'

import { getUserInfo, registration } from '../../http/userAPI'
import { LOGIN_ROUTE, LK_ROUTE } from '../../utils/consts'
import { Input, Alert } from '../../components/myBootstrap'
import Loading from '../../components/Loading'
import { Context } from '../..'


const RegistrationPage = observer(() => {

    const { user } = useContext(Context)

    const refPhone = useRef()

    const history = useHistory()

    const [ alertVisible, setAlertVisible ] = useState(false)
    const [ alertMessage, setAlertMessage ] = useState('')
    
    const [ info, setInfo ] = useState({
        role:"USER",isActivated:0,activationLink:uuid(),
        surname: '', name: '', patronymic: '', 
        // phone: '(   )    -  -  ', 
        phone: '', 
        phoneSelection: 0,
        email: '', address: '', password: '',  
        companyName: '', INN: '', KPP: '', OGRN: '',
        OKVED: '', juridicalAddress: '', bank: '', 
        BIK: '', corAccount: '', payAccount: '', post: ''
    })

    const [ checked, setChecked ] = useState(false)

    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        if (checked) {
            setInfo({...info,role:"CORP"})
        }else {
            setInfo({...info,role:"USER"})
        }
    // eslint-disable-next-line
    },[checked])

    const click = async () => {
        try {
            setLoading(true)
            let data = await registration(
                {...info,
                    phone:"7" + info.phone.replace(/\D/g, "")
                }
            )
            if (data?.id) {
                user.setIsAuth(true)
                getUserInfo().then(dat => user.setUser(dat))
            }
            setLoading(false)
            // history.push(LOGIN_ROUTE)
            history.push(LK_ROUTE)
            scrollUp()

        }catch(e) {
            setLoading(false)
            setAlertVisible(true)
            setAlertMessage(e.response?.data?.message)
        }
    }

    const scrollUp = () => {
        $('html, body').animate(
            {scrollTop: 0}, 
            700, 
            function(){}
        )
    }

    const phone = (e) => {
        let val = e.target.value
        let offset = 0
        let start = e.target.selectionStart
        // let end = e.target.selectionEnd
        let length = val.length
        let lastLength = info.phone.length

        if (val) val = val.match(/\d/g)

        if (val) val = val.join('')

        let numberLength

        if (val) numberLength = val.length
        else numberLength = 0

        if (Number(val) || val === "") {

            switch(numberLength) {
              
                case 4:
                    val = "(" + val[0] + val[1] + val[2] + ") " + val[3]
                    if (start === length) offset = 3
                break

                case 5:
                    val = "(" + val[0] + val[1] + val[2] + ") " + val[3] + val[4]
                break

                case 6:
                    val = "(" + val[0] + val[1] + val[2] + ") " + val[3] + val[4] + val[5]
                break

                case 7:
                    val = "(" + val[0] + val[1] + val[2] + ") " + val[3] + val[4] + val[5] + "-" + val[6]
                    if (start === length) offset = 1
                break

                case 8:
                    val = "(" + val[0] + val[1] + val[2] + ") " + val[3] + val[4] + val[5] + "-" + val[6] + val[7]
                break

                case 9:
                    val = "(" + val[0] + val[1] + val[2] + ") " + val[3] + val[4] + val[5] + "-" + val[6] + val[7] + "-" + val[8]
                    if (start === length) offset = 1
                break

                case 10:
                    val = "(" + val[0] + val[1] + val[2] + ") " + val[3] + val[4] + val[5] + "-" + val[6] + val[7] + "-" + val[8] + val[9]
                break
              
                default:
                break
            }

            if (start !== length) {
                switch(start) {
              
                    case 1:
                        if (lastLength < length) offset = 1
                    // eslint-disable-next-line
                    case 2:
                    case 3:
                        if (lastLength > length && numberLength === 3) offset = -1
                    break

                    case 5:
                        offset = 2
                    break

                    case 10:
                    case 13:
                        if (lastLength < length) offset = 1
                    break
                    default:
                    break
                }
            }

            setInfo({...info,phone:val.toString(),phoneSelection:start + offset})
        }else setInfo({...info,phoneSelection:start})
    }

    useEffect(() => {
        refPhone.current.selectionStart = info.phoneSelection
        refPhone.current.selectionEnd = info.phoneSelection
    },[info.phone, info.phoneSelection])


    if (loading) return <Loading />

    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">
                    ??????????????????????
                </h2>
                <Form className="d-flex flex-column">
                    
                        <label>??????????????: <span style={{color:"#f00"}}>*</span></label>
                        <Form.Control 
                            className="mb-2"
                            maxLength="256"
                            placeholder="?????????????? ??????????????"
                            value={info?.surname}
                            onChange={e => setInfo({...info,surname:e.target.value})}
                        />
                        <label>??????: <span style={{color:"#f00"}}>*</span></label>
                        <Form.Control 
                            className="mb-2"
                            maxLength="256"
                            placeholder="?????????????? ??????"
                            value={info?.name}
                            onChange={e => setInfo({...info,name:e.target.value})}
                        />
                        <label>????????????????: (?????? ??????????????)</label>
                        <Form.Control 
                            className="mb-2"
                            maxLength="256"
                            placeholder="?????????????? ????????????????"
                            value={info?.patronymic}
                            onChange={e => setInfo({...info,patronymic:e.target.value})}
                        />
                        <label>??????????????: <span style={{color:"#f00"}}>*</span></label>
                        <div className="d-flex justify-content-center align-items-center">
                        <label>+7&nbsp;</label>
                        <Form.Control 
                            ref={refPhone}
                            className="mb-2"
                            maxLength="15"
                            placeholder="?????????????? ?????????? ????????????????"
                            value={info?.phone}
                            onChange={e => phone(e)}
                        />
                        </div>
                        <label>{checked ? "???????????????? ??????????: " : "??????????: "}<span style={{color:"#f00"}}>*</span></label>
                        <Form.Control 
                            className="mb-2"
                            maxLength="1024"
                            placeholder="?????????????? ??????????"
                            value={info?.address}
                            onChange={e => setInfo({...info,address:e.target.value})}
                        />
                        <label>Email: <span style={{color:"#f00"}}>*</span></label>
                        <Form.Control 
                            className="mb-2"
                            maxLength="256"
                            placeholder="?????????????? email"
                            value={info?.email}
                            onChange={e => setInfo({...info,email:e.target.value})}
                        />
                        <label>????????????: <span style={{color:"#f00"}}>*</span></label>
                        <Form.Control 
                            className="mb-2"
                            maxLength="256"
                            placeholder="?????????????? ????????????"
                            value={info?.password}
                            onChange={e => setInfo({...info,password:e.target.value})}
                            type="password"
                        />

                        <div
                            className='pt-3 pb-3'
                            onClick={() => setChecked(!checked)}
                        >
                            <Input 
                                type="checkbox" 
                                className=''
                                checked={checked}
                                title="?????????????????????? ????.????????"
                                style={{cursor:"pointer"}}
                                onChange={() => {}}
                            />
                            <label
                                className='pl-2'
                                style={{cursor:"pointer"}}
                            >????.????????</label>
                        </div>
                        {checked 
                        ? 
                        <>
                            <label>???????????????? ????????????????: <span style={{color:"#f00"}}>*</span></label>
                            <Form.Control 
                                className="mb-2"
                                maxLength="256"
                                placeholder="?????????????? ???????????????? ????????????????"
                                value={info?.companyName}
                                onChange={e => setInfo({...info,companyName:e.target.value})}
                            />
                            <label>??????: <span style={{color:"#f00"}}>*</span></label>
                            <Form.Control 
                                // type="number"
                                className="mb-2"
                                maxLength="10"
                                placeholder="?????????????? ??????"
                                value={info?.INN}
                                onChange={e => {
                                    if (Number(e.target.value)) setInfo({...info,INN:e.target.value})
                                }}
                            />
                            <label>??????: <span style={{color:"#f00"}}>*</span></label>
                            <Form.Control 
                                // type="number"
                                className="mb-2"
                                maxLength="9"
                                placeholder="?????????????? ??????"
                                value={info?.KPP}
                                onChange={e => {
                                    if (Number(e.target.value)) setInfo({...info,KPP:e.target.value})
                                }}
                            />
                            <label>????????:</label>
                            <Form.Control 
                                // type="number"
                                className="mb-2"
                                maxLength="15"
                                placeholder="?????????????? ????????"
                                value={info?.OGRN}
                                onChange={e => {
                                    if (Number(e.target.value)) setInfo({...info,OGRN:e.target.value})
                                }}
                            />
                            <label>??????????:</label>
                            <Form.Control 
                                // type="number"
                                className="mb-2"
                                maxLength="6"
                                placeholder="?????????????? ??????????"
                                value={info?.OKVED}
                                onChange={e => {
                                    if (Number(e.target.value)) setInfo({...info,OKVED:e.target.value})
                                }}
                            />
                            <label>????.??????????: <span style={{color:"#f00"}}>*</span></label>
                            <Form.Control 
                                className="mb-2"
                                maxLength="1024"
                                placeholder="?????????????? ????.??????????"
                                value={info?.juridicalAddress}
                                onChange={e => setInfo({...info,juridicalAddress:e.target.value})}
                            />
                            <label>???????????????? ??????????: <span style={{color:"#f00"}}>*</span></label>
                            <Form.Control 
                                className="mb-2"
                                maxLength="256"
                                placeholder="?????????????? ???????????????? ??????????"
                                value={info?.bank}
                                onChange={e => setInfo({...info,bank:e.target.value})}
                            />
                            <label>??????: <span style={{color:"#f00"}}>*</span></label>
                            <Form.Control 
                                // type="number"
                                className="mb-2"
                                maxLength="9"
                                placeholder="?????????????? ??????"
                                value={info?.BIK}
                                onChange={e => {
                                    if (Number(e.target.value)) setInfo({...info,BIK:e.target.value})
                                }}
                            />
                            <label>??????.????????: <span style={{color:"#f00"}}>*</span></label>
                            <Form.Control 
                                // type="number"
                                className="mb-2"
                                maxLength="20"
                                placeholder="?????????????? ??????.????????"
                                value={info?.corAccount}
                                onChange={e => {
                                    if (Number(e.target.value)) setInfo({...info,corAccount:e.target.value})
                                }}
                            />
                            <label>?????????????????? ????????: <span style={{color:"#f00"}}>*</span></label>
                            <Form.Control 
                                // type="number"
                                className="mb-2"
                                maxLength="20"
                                placeholder="?????????????? ?????????????????? ????????"
                                value={info?.payAccount}
                                onChange={e => {
                                    if (Number(e.target.value)) setInfo({...info,payAccount:e.target.value})
                                }}
                            />
                            <label>??????????????????: <span style={{color:"#f00"}}>*</span></label>
                            <Form.Control 
                                className="mb-2"
                                maxLength="256"
                                placeholder="?????????????? ??????????????????"
                                value={info?.post}
                                onChange={e => setInfo({...info,post:e.target.value})}
                            />
                        </>
                        : null}

                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <div>
                            ???????? ??????????????? <NavLink onClick={scrollUp} to={LOGIN_ROUTE}>??????????????!</NavLink>
                        </div>
                        <Button 
                            variant={"outline-success"} 
                            onClick={click}
                        >
                            ??????????????????????
                        </Button>
                    </Row>
                    
                </Form>
            </Card>

            <Alert show={alertVisible} onHide={() => setAlertVisible(false)} message={alertMessage} />

        </Container>
    )
})

export default RegistrationPage;
