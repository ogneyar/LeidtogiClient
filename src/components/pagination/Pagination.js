import React, { useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Pagination } from 'react-bootstrap'
import uuid from 'react-uuid'
import $ from 'jquery'

import { Context } from '../..'
import './Pagination.css'
import { SCROLL_TOP, SCROLL_TOP_MOBILE } from '../../utils/consts'

const MINIMAL_WIDTH_SCREEN_FOR_QUANTITY = 480
const MIDDLE_WIDTH_SCREEN_FOR_QUANTITY = 768

const MINIMAL_WIDTH_SCREEN_FOR_SIZE = 450

const Pages = observer(() => {

    const { product } = useContext(Context)

    // const [ doted, setDoted ] = useState(false)
    
    const [ twoOrthreeOrFour, setTwoOrthreeOrFour ] = useState(
        window.innerWidth < MINIMAL_WIDTH_SCREEN_FOR_QUANTITY
        ? 2
        : 
            window.innerWidth < MIDDLE_WIDTH_SCREEN_FOR_QUANTITY 
            ? 3 
            : 4
    )
    const [ threOrfiveOrSeven, setThreOrfiveOrSeven ] = useState(
        window.innerWidth < MINIMAL_WIDTH_SCREEN_FOR_QUANTITY 
        ? 3
        : 
            window.innerWidth < MIDDLE_WIDTH_SCREEN_FOR_QUANTITY 
            ? 5 
            : 7
    )
    
    const [ sizePagination, setSizePagination ] = useState(window.innerWidth < MINIMAL_WIDTH_SCREEN_FOR_SIZE ? "sm" : null)
    
    let doted = false
    
    const pageCount = Math.ceil(product.totalCount / product.limit)
    const pages = []
    
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }
    
    // const [ mobile, setMobile ] = useState(false)

    // useEffect(() => {
    //     if (window.innerWidth < MINIMAL_WIDTH_SCREEN_FOR_SIZE) setMobile(true)
    //     else setMobile(false)
    // }, [window.innerWidth])
    
    const onClick = (page) => {
        if (window.innerWidth > 991) {
            $('html, body').animate(
                {scrollTop: SCROLL_TOP}, 
                700, 
                function(){}
            )
        }else {
            $('html, body').animate(
                {scrollTop: SCROLL_TOP_MOBILE}, 
                700, 
                function(){}
            )
        }
        product.setPage(page)
    }

    
    const resize = () => {        
        setTwoOrthreeOrFour(
            window.innerWidth < MINIMAL_WIDTH_SCREEN_FOR_QUANTITY
            ? 2
            : 
                window.innerWidth < MIDDLE_WIDTH_SCREEN_FOR_QUANTITY 
                ? 3 
                : 4
        )
        setThreOrfiveOrSeven(
            window.innerWidth < MINIMAL_WIDTH_SCREEN_FOR_QUANTITY 
            ? 3
            : 
                window.innerWidth < MIDDLE_WIDTH_SCREEN_FOR_QUANTITY 
                ? 5 
                : 7
        )
        setSizePagination(window.innerWidth < MINIMAL_WIDTH_SCREEN_FOR_SIZE ? "sm" : null)
    }
    
    window.addEventListener("resize", resize)


    return (
        <Pagination 
            size={sizePagination} 
            className="Pagination mt-2"
        >
            {pages.length > 10 
            ? 
                <Pagination.First
                    onClick={() =>{product.page !== 1 && onClick(1)}}
                    disabled={product.page === 1 && true}
                /> 
            : null}
            {pages.length > 10 
            // && sizePagination !== "sm"
            ? 
                <Pagination.Prev
                    onClick={() =>{product.page !== 1 && onClick(product.page - 1)}}
                    disabled={product.page === 1 && true}
                /> 
            : null}
            {pages.map(page => 
                (
                pages.length > 10 
                ? 
                    // 2 - если выбраная страница от 1 до 2
                    // 3 - если выбраная страница от 1 до 3
                    // 4 - если выбраная страница от 1 до 4
                    product.page <= twoOrthreeOrFour 
                    ?
                        // 3 - то показывать первые 3 кнопки
                        // 5 - то показывать первые 5 кнопок
                        // 7 - то показывать первые 7 кнопок
                        page <= threOrfiveOrSeven 
                        ?
                            <Pagination.Item
                                key={page}
                                active={product.page === page}
                                onClick={() => onClick(page)}
                            >
                                {page}
                            </Pagination.Item>
                        : 
                            !doted // если ещё небыло показано троеточие
                            ? // то показать
                                <Pagination.Item
                                    key={page}
                                    disabled
                                    >
                                    ...
                                    {doted = true}
                                </Pagination.Item>
                            : null
                    :
                        // 2 - если выбраная страница предпоследняя или последняя
                        // 3 - если выбраная страница от конца 3ья, 2я или первая
                        // 4 - если выбраная страница от конца 4ая, 3ья, 2я или первая
                        product.page > pages.length - twoOrthreeOrFour
                        ?
                            // 3 - то показывать последние 3 кнопки
                            // 5 - то показывать последние 5 кнопок
                            // 7 - то показывать последние 7 кнопок
                            page > pages.length - threOrfiveOrSeven 
                            ?
                                <Pagination.Item
                                    key={page}
                                    active={product.page === page}
                                    onClick={() => onClick(page)}
                                >
                                    {page}
                                </Pagination.Item>
                            : 
                                !doted // если ещё небыло показано троеточие
                                ? // то показать
                                    <Pagination.Item
                                        key={uuid()}
                                        disabled
                                        >
                                        ...
                                        {doted = true}
                                    </Pagination.Item>
                                : null

                        : // иначе, если выбраная страница где-то в середине
                            // если 2 - то показать 3 штуки
                            // если 3 - то показать 5 штук
                            // если 4 - то показать 7 штук
                            page < product.page + twoOrthreeOrFour && page > product.page - twoOrthreeOrFour 
                            ?
                                <Pagination.Item
                                    key={page}
                                    active={product.page === page}
                                    onClick={() => onClick(page)}
                                >
                                    {page}
                                    {doted = false}
                                </Pagination.Item>
                            : 
                                !doted // если ещё небыло показано троеточие
                                ? // то показать
                                    <Pagination.Item
                                        key={page}
                                        disabled
                                        >
                                        ...
                                        {doted = true}
                                    </Pagination.Item>
                                : null

                :
                    <Pagination.Item
                        key={page}
                        active={product.page === page}
                        onClick={() => onClick(page)}
                    >
                        {page}
                    </Pagination.Item>
               
                )
            )}
            {pages.length > 10 
            // && sizePagination !== "sm"
            ? 
                <Pagination.Next
                    onClick={() =>{product.page !== pages.length && onClick(product.page + 1)}}
                    disabled={product.page === pages.length && true}
                /> 
            : null}
            {pages.length > 10 
            ? 
                <Pagination.Last
                    onClick={() =>{product.page !== pages.length && onClick(pages.length)}}
                    disabled={product.page === pages.length && true}
                /> 
            : null}
        </Pagination>
    )
})

export default Pages
