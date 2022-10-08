// PaymentOrderPage
import React from 'react'
// eslint-disable-next-line
import { useQueryParam, NumberParam, StringParam } from 'use-query-params'

import Payment from '../../components/payment/Payment'

import './PaymentOrderPage.css'


const PaymentOrderPage = () => {
    
    const [ uuid ] = useQueryParam('uuid', StringParam) // 59c86681-7cc2-4010-93fd-2a452f04a7f9

    return (
        <div>
            Готовьте мани

            <Payment uuid={uuid} />
        </div>
    )
}

export default PaymentOrderPage
