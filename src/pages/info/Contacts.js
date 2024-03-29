import React from 'react'
import HtmlReactParser from 'html-react-parser'

import { MAIL, ADDRESS_FULL, ADDRESS_FULL_MOSCOW, PHONE_ONE, PHONE_TWO, TIME_TO_WORK } from '../../utils/consts'
import InfoPage from './InfoPage'
import './Contacts.css'


const Contacts = () => {
    return (
        <InfoPage>
            <div className="Contacts">
                <header>Контактная информация!</header>
                {/* <label className="ContactsTitle">Контактная информация!</label> */}
                <div
                    className="ContactsBody"
                >
                    <div className="ContactsBodyDiv">
                        <span>Название компании:</span>
                        <label>ООО "ЛЕИДТОГИ"</label>
                    </div>
                    {/* <div className="ContactsBodyDiv">
                        <span>Генеральный директор:</span>
                        <label>Пухкало Александр Андреевич</label>
                    </div> */}
                    <div className="ContactsBodyDiv">
                        <span>ИНН / КПП:</span>
                        <label>4632267704 / 463201001</label>
                    </div>
                    <div className="ContactsBodyDiv">
                        <span>ОГРН:</span>
                        <label>1204600005830</label>
                    </div>
                    <div className="ContactsBodyDiv">
                        <span>Адреса:</span>
                        <label>{ADDRESS_FULL}</label>
                        <label>{ADDRESS_FULL_MOSCOW}</label>
                    </div>
                    <div className="ContactsBodyDiv">
                        <span>Телефоны:</span>
                        <label>{HtmlReactParser(PHONE_ONE)}</label>
                        <label>{HtmlReactParser(PHONE_TWO)}</label>
                    </div>
                    <div className="ContactsBodyDiv">
                        <span>Эл.Почта:</span>
                        <label>{HtmlReactParser(MAIL)}</label>
                    </div>
                    <div className="ContactsBodyDiv">
                        <span>Время работы:</span>
                        <label>{TIME_TO_WORK}</label>
                        {/* {HtmlReactParser(TIME_TO_WORK)} */}
                    </div>
                </div>
            </div>
        </InfoPage>
    )
}

export default Contacts
