
import { useState, useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { registration } from '../../../http/userAPI'
import { Input, Button, Form } from '../../../components/myBootstrap'
// import { Context } from '../../../index'

import './UserAddService.css'


const UserAddService = observer((props) => {
    
    // const { userStore } = useContext(Context)

    const [ surname, setSurname ] = useState('')
    const [ name, setName ] = useState('')
    const [ patronymic, setPatronymic ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ address, setAddress ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ role, setRole ] = useState("MANAGER")
    const [ isActivated ] = useState(true)

    useEffect(() => {
    },[])

    const addUser = () => {
        let addr = address
        if ( ! addr ) addr = "не задан адрес"
        let body = {
            surname, name, patronymic, phone, email, address: addr, password, role, isActivated
        }
        registration(body).then(data => { 
            if (data.email) alert(`Пользователь с именем ${name} создан`)
            else if (data.token) alert(`Пользователь с именем ${name} создан`)
            else alert(JSON.stringify(data))
        })
    }
       
    return (
        <Form
            style={{width:"100%"}}
            className={"UserAddService ml-4"}
        >
            <table>
                <th>
                    <td></td>
                    <td></td>
                </th>
                <tr>
                    <td>
                        <label>Фамилия</label>&nbsp;&nbsp;
                    </td>
                    <td>
                        <Input 
                            className='mt-4 ml-2 mr-2'
                            value={surname}
                            onChange={e => setSurname(e.target.value)}
                            placeholder={'Введите фамилию'}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Имя</label>&nbsp;&nbsp;
                    </td>
                    <td>
                        <Input 
                            className='mt-4 ml-2 mr-2'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder={'Введите имя'}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Отчество</label>&nbsp;&nbsp;
                    </td>
                    <td>
                        <Input 
                            className='mt-4 ml-2 mr-2'
                            value={patronymic}
                            onChange={e => setPatronymic(e.target.value)}
                            placeholder={'Введите отчество'}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Телефон</label>&nbsp;&nbsp;
                    </td>
                    <td>
                        <Input 
                            className='mt-4 ml-2 mr-2'
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            placeholder={'Введите телефон'}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Э.Почта</label>&nbsp;&nbsp;
                    </td>
                    <td>
                        <Input 
                            className='mt-4 ml-2 mr-2'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder={'Введите email'}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Адрес</label>&nbsp;&nbsp;
                    </td>
                    <td>
                        <Input 
                            className='mt-4 ml-2 mr-2'
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            placeholder={'Введите адрес'}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Пароль</label>&nbsp;&nbsp;
                    </td>
                    <td>
                        <Input 
                            className='mt-4 ml-2 mr-2'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder={'Введите пароль'}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Роль</label>&nbsp;&nbsp;
                    </td>
                    <td>
                        <select 
                            className='Input mt-4 ml-2 mr-2'
                            value={role}
                            onChange={e => setRole(e.target.value)}
                        >
                            <option value="MANAGER">Менеджер</option>
                            <option value="ADMIN">Администратор</option>
                            <option value="USER">Пользователь</option>
                            <option value="CORP">Юр.лицо</option>
                        </select>
                    </td>
                </tr>
            </table>
            
            <Button 
                variant="outline-success" 
                onClick={addUser}
                className='mt-4 ml-2 mr-2'
                text="Добавить пользователя"
            >
                Добавить пользователя
            </Button>

            <div className='DivButtonBack'>
                <Button variant="outline-warning" onClick={props?.back}>Отменить добавление</Button>
            </div>

            <hr />

        </Form>
    )
})

export default UserAddService
