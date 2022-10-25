//
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { Context } from '../..'
// import { SCROLL_TOP, SCROLL_TOP_MOBILE } from '../../utils/consts'
// import scrollUp from '../../utils/scrollUp'
import './DealerPage.css'


const DealerPage = () => {

    const { user } = useContext(Context)

    const history = useHistory()

    if (!user.isAuth) {
        // window.open("/login?returnUrl=/dealers", "_self", false) // redirect
        // window.location.href = "/login?returnUrl=/dealers" 
        history.push("/login?returnUrl=/dealers")
        // scrollUp(window.innerWidth > 700 ? SCROLL_TOP : SCROLL_TOP_MOBILE)
        return null
    }

    return (
        <div>DealerPage</div>
    )
}

export default DealerPage