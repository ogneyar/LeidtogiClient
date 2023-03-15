import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import uuid from 'react-uuid'
import { FormattedMessage, useIntl } from 'react-intl'

import { getUserInfo, registration } from '../../http/userAPI'
import { LOGIN_ROUTE, LK_ROUTE, SCROLL_TOP, SCROLL_TOP_MOBILE } from '../../utils/consts'
import { Input, Alert } from '../../components/myBootstrap'
import Loading from '../../components/Loading'
import scrollUp from '../../utils/scrollUp'
import { Context } from '../..'

import './RegistrationPage.css'


const RegistrationPage = observer(() => {

    const intl = useIntl()
    // console.log(intl)

    const { userStore } = useContext(Context)

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
                userStore.setIsAuth(true)
                getUserInfo().then(dat => userStore.setUser(dat))
            }
            setLoading(false)
            // history.push(LOGIN_ROUTE)
            history.push(LK_ROUTE)
            scrollUp(window.innerWidth > 700 ? SCROLL_TOP : SCROLL_TOP_MOBILE)

        }catch(e) {
            setLoading(false)
            setAlertVisible(true)
            setAlertMessage(e.response?.data?.message)
        }
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
            className="RegistrPage d-flex justify-content-center align-items-center"
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">
                    {/* Регистрация */}
                    <FormattedMessage id='registr_title' />
                </h2>
                <Form className="d-flex flex-column">
                    
                        <label>
                            {/* Фамилия: */}
                            <FormattedMessage id='registr_surname' />
                            &nbsp;
                            <span style={{color:"#f00"}}>*</span>
                        </label>
                        <Form.Control 
                            className="mb-2"
                            maxLength="256"
                            // placeholder="Введите фамилию"
                            placeholder={intl.messages.registr_surname_placeholder}
                            value={info?.surname}
                            onChange={e => setInfo({...info,surname:e.target.value})}
                        />
                        <label>
                            {/* Имя: */}
                            <FormattedMessage id='registr_name' />
                            &nbsp;
                            <span style={{color:"#f00"}}>*</span>
                        </label>
                        <Form.Control 
                            className="mb-2"
                            maxLength="256"
                            // placeholder="Введите имя"
                            placeholder={intl.messages.registr_name_placeholder}
                            value={info?.name}
                            onChange={e => setInfo({...info,name:e.target.value})}
                        />
                        <label>
                            {/* Отчество: (при наличии) */}
                            <FormattedMessage id='registr_patronymic' />
                        </label>
                        <Form.Control 
                            className="mb-2"
                            maxLength="256"
                            // placeholder="Введите отчество"
                            placeholder={intl.messages.registr_patronymic_placeholder}
                            value={info?.patronymic}
                            onChange={e => setInfo({...info,patronymic:e.target.value})}
                        />
                        <label>
                            {/* Телефон: */}
                            <FormattedMessage id='registr_telephone' />
                            &nbsp;
                            <span style={{color:"#f00"}}>*</span>
                        </label>
                        <div className="d-flex justify-content-center align-items-center">
                        <label>+7&nbsp;</label>
                        <Form.Control 
                            ref={refPhone}
                            className="mb-2"
                            maxLength="15"
                            // placeholder="Введите номер телефона"
                            placeholder={intl.messages.registr_telephone_placeholder}
                            value={info?.phone}
                            onChange={e => phone(e)}
                        />
                        </div>
                        <label>
                            {checked 
                            ? 
                                // "Почтовый адрес:" 
                                <FormattedMessage id='registr_postal_address' />
                            : 
                                // "Адрес:"
                                <FormattedMessage id='registr_address' />
                            }
                            &nbsp;
                            <span style={{color:"#f00"}}>*</span>
                        </label>
                        <Form.Control 
                            className="mb-2"
                            maxLength="1024"
                            // placeholder="Введите адрес"
                            placeholder={intl.messages.registr_address_placeholder}
                            value={info?.address}
                            onChange={e => setInfo({...info,address:e.target.value})}
                        />
                        <label>
                            {/* Email: */}
                            <FormattedMessage id='registr_email' />
                            &nbsp;
                            <span style={{color:"#f00"}}>*</span></label>
                        <Form.Control 
                            className="mb-2"
                            maxLength="256"
                            // placeholder="Введите email"
                            placeholder={intl.messages.registr_email_placeholder}
                            value={info?.email}
                            onChange={e => setInfo({...info,email:e.target.value})}
                        />
                        <label>
                            {/* Пароль: */}
                            <FormattedMessage id='registr_password' />
                            &nbsp;
                            <span style={{color:"#f00"}}>*</span></label>
                        <Form.Control 
                            className="mb-2"
                            maxLength="256"
                            // placeholder="Введите пароль"
                            placeholder={intl.messages.registr_password_placeholder}
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
                                // title="Регистрация юр.лица"
                                placeholder={intl.messages.registr_legal_entity_title}
                                style={{cursor:"pointer"}}
                                onChange={() => {}}
                            />
                            <label
                                className='pl-2'
                                style={{cursor:"pointer"}}
                            >
                                {/* Юр.лицо */}
                                <FormattedMessage id='registr_legal_entity' />
                            </label>
                        </div>
                        {checked 
                        ? 
                        <>
                            <label>
                                {/* Название компании: */}
                                <FormattedMessage id='registr_company_name' />
                                &nbsp;
                                <span style={{color:"#f00"}}>*</span>
                            </label>
                            <Form.Control 
                                className="mb-2"
                                maxLength="256"
                                // placeholder="Введите название компании"
                                placeholder={intl.messages.registr_company_name_placeholder}
                                value={info?.companyName}
                                onChange={e => setInfo({...info,companyName:e.target.value})}
                            />
                            <label>
                                {/* ИНН: */}
                                <FormattedMessage id='registr_itn' />
                                &nbsp;
                                <span style={{color:"#f00"}}>*</span>
                            </label>
                            <Form.Control 
                                // type="number"
                                className="mb-2"
                                maxLength="10"
                                // placeholder="Введите ИНН"
                                placeholder={intl.messages.registr_itn_placeholder}
                                value={info?.INN}
                                onChange={e => {
                                    if (Number(e.target.value)) setInfo({...info,INN:e.target.value})
                                }}
                            />
                            <label>
                                {/* КПП: */}
                                <FormattedMessage id='registr_kpp' />
                                &nbsp;
                                <span style={{color:"#f00"}}>*</span></label>
                            <Form.Control 
                                // type="number"
                                className="mb-2"
                                maxLength="9"
                                // placeholder="Введите КПП"
                                placeholder={intl.messages.registr_kpp_placeholder}
                                value={info?.KPP}
                                onChange={e => {
                                    if (Number(e.target.value)) setInfo({...info,KPP:e.target.value})
                                }}
                            />
                            <label>
                                {/* ОГРН: */}
                                <FormattedMessage id='registr_ogrn' />
                            </label>
                            <Form.Control 
                                // type="number"
                                className="mb-2"
                                maxLength="15"
                                // placeholder="Введите ОГРН"
                                placeholder={intl.messages.registr_ogrn_placeholder}
                                value={info?.OGRN}
                                onChange={e => {
                                    if (Number(e.target.value)) setInfo({...info,OGRN:e.target.value})
                                }}
                            />
                            <label>
                                {/* ОКВЭД: */}
                                <FormattedMessage id='registr_okved' />
                            </label>
                            <Form.Control 
                                // type="number"
                                className="mb-2"
                                maxLength="6"
                                // placeholder="Введите ОКВЭД"
                                placeholder={intl.messages.registr_okved_placeholder}
                                value={info?.OKVED}
                                onChange={e => {
                                    if (Number(e.target.value)) setInfo({...info,OKVED:e.target.value})
                                }}
                            />
                            <label>
                                {/* Юр.адрес: */}
                                <FormattedMessage id='registr_legal_address' />
                                &nbsp;
                                <span style={{color:"#f00"}}>*</span></label>
                            <Form.Control 
                                className="mb-2"
                                maxLength="1024"
                                // placeholder="Введите юр.адрес"
                                placeholder={intl.messages.registr_legal_address_placeholder}
                                value={info?.juridicalAddress}
                                onChange={e => setInfo({...info,juridicalAddress:e.target.value})}
                            />
                            <label>
                                {/* Название банка: */}
                                <FormattedMessage id='registr_bank_name' />
                                &nbsp;
                                <span style={{color:"#f00"}}>*</span>
                            </label>
                            <Form.Control 
                                className="mb-2"
                                maxLength="256"
                                // placeholder="Введите название банка"
                                placeholder={intl.messages.registr_bank_name_placeholder}
                                value={info?.bank}
                                onChange={e => setInfo({...info,bank:e.target.value})}
                            />
                            <label>
                                {/* БИК: */}
                                <FormattedMessage id='registr_bik' />
                                &nbsp;
                                <span style={{color:"#f00"}}>*</span>
                            </label>
                            <Form.Control 
                                // type="number"
                                className="mb-2"
                                maxLength="9"
                                // placeholder="Введите БИК"
                                placeholder={intl.messages.registr_bik_placeholder}
                                value={info?.BIK}
                                onChange={e => {
                                    if (Number(e.target.value)) setInfo({...info,BIK:e.target.value})
                                }}
                            />
                            <label>
                                {/* Кор.счёт: */}
                                <FormattedMessage id='registr_cor_accaunt' />
                                &nbsp;
                                <span style={{color:"#f00"}}>*</span>
                            </label>
                            <Form.Control 
                                // type="number"
                                className="mb-2"
                                maxLength="20"
                                // placeholder="Введите кор.счёт"
                                placeholder={intl.messages.registr_cor_accaunt_placeholder}
                                value={info?.corAccount}
                                onChange={e => {
                                    if (Number(e.target.value)) setInfo({...info,corAccount:e.target.value})
                                }}
                            />
                            <label>
                                {/* Расчетный счет: */}
                                <FormattedMessage id='registr_payment_accaunt' />
                                &nbsp;
                                <span style={{color:"#f00"}}>*</span>
                            </label>
                            <Form.Control 
                                // type="number"
                                className="mb-2"
                                maxLength="20"
                                // placeholder="Введите расчетный счет"
                                placeholder={intl.messages.registr_payment_accaunt_placeholder}
                                value={info?.payAccount}
                                onChange={e => {
                                    if (Number(e.target.value)) setInfo({...info,payAccount:e.target.value})
                                }}
                            />
                            <label>
                                {/* Должность: */}
                                <FormattedMessage id='registr_post' />
                                &nbsp;
                                <span style={{color:"#f00"}}>*</span>
                            </label>
                            <Form.Control 
                                className="mb-2"
                                maxLength="256"
                                // placeholder="Введите должность"
                                placeholder={intl.messages.registr_post_placeholder}
                                value={info?.post}
                                onChange={e => setInfo({...info,post:e.target.value})}
                            />
                        </>
                        : null}

                    {/* <Row className="d-flex justify-content-between mt-3 pl-3 pr-3"> */}
                    <Row className="RegistrPage_Row_Bottom">
                        <div>
                            {/* Есть аккаунт? */}
                            <FormattedMessage id='registr_have_account' />
                            &nbsp;
                            <NavLink 
                                onClick={() => scrollUp(window.innerWidth > 700 ? SCROLL_TOP : SCROLL_TOP_MOBILE)} 
                                to={LOGIN_ROUTE}
                            >
                                {/* Войдите! */}
                                <FormattedMessage id='registr_enter' />
                            </NavLink>
                        </div>
                        <Button 
                            variant={"outline-success"} 
                            onClick={click}
                        >
                            {/* Регистрация */}
                            <FormattedMessage id='registr_title' />
                        </Button>
                    </Row>
                    
                </Form>
            </Card>

            <Alert show={alertVisible} onHide={() => setAlertVisible(false)} message={alertMessage} />

        </Container>
    )
})

export default RegistrationPage;
