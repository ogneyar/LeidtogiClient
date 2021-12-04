import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import Loading from '../../components/Loading'
import InfoPage from '../info/InfoPage'
import LoginPage from '../login/LoginPage'
import Error from '../error/ErrorPage'
import { activate } from '../../http/userAPI'
import { Context } from '../..'

import './ConfirmPage.css'


const ConfirmPage = observer(() => { 

    const { user } = useContext(Context)
    const { url } = useParams()
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        async function activateUser(id, url) {
            await activate(id, url).then(data => {
                user.setUser({...user.user, isActivated:1})
            }).finally(() => setLoading(false))
        }
        if (user.user?.id) {
            if (!user.user?.isActivated) {
                activateUser(user.user.id, url)
            }
        }else if (user?.loading === false) {
            setLoading(false)
        }
    // eslint-disable-next-line
    },[user.user?.id])


    if (loading) return <Loading />

    if (url) {

        if (user.user?.id) { 

            if (user.user?.isActivated ) 
            return (
                <InfoPage>
                    <div className="ConfirmPage">
                        <label>{user.user?.name}</label>
                        <br />
                        <label>Ваш почтовый ящик подтверждён!</label>
                        <hr />
                    </div>
                </InfoPage>
            )
            return <Error />
            
        }else return <LoginPage confirm url={url} />

        
    }else return <Error />

})

export default ConfirmPage;
