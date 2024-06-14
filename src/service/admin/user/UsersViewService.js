
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { Button } from '../../../components/myBootstrap'
import { getAll } from '../../../http/userAPI'


const UsersViewService = observer((props) => {
    
    const [ users, setUsers ] = useState([])

    useEffect(() => {
        getAll().then(data => setUsers(data))
    },[])

    return (
        <div>
            <div>
                {users && users[0] &&
                users.map(user => <>

                    {user.id}&nbsp;{user.surname}&nbsp;{user.name}&nbsp;{user.role}
                    <br />

                </>)
                }
            </div>

            <div className='DivButtonBack'>
                <Button variant="outline-warning" onClick={props?.back}>Отменить добавление</Button>
            </div>

            <hr />
        </div>
    )
})

export default UsersViewService
