// eslint-disable-next-line
import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { API_URL } from '../../utils/consts'
import deleteAbbreviation from '../../utils/deleteAbbreviation'
import priceFormater from '../../utils/priceFormater'
import { searchArticle, searchName } from '../../http/searchAPI'
// import Loading from '../Loading'

import { Context } from '../..'
import './Search.css'
import { Spinner } from 'react-bootstrap'


const Search = observer((props) => {
    // eslint-disable-next-line
    const { product, brand } = useContext(Context)

    const [ admin, setAdmin ] =  useState(false)

    const [ value, setValue ] = useState("")
    const [ list, setList ] = useState([])
    const [ array, setArray ] = useState([])
    const [ searchTimeOut, setSearchTimeOut ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    // если поиск не дал результатов
    const [ noSearch, setNoSearch ] = useState(false)

    const history = useHistory()

    useEffect(() => {
        if (product.allProducts.length) {
            setArray(product.allProducts)
        }
    },[product.allProducts])

    // useEffect(() => { 
    //     if (list.length) {
    //         document.addEventListener("click", () => {
    //             setList([])
    //         }, {once: true})
    //     }
    // },[list])

    function isNumber(n){
        // eslint-disable-next-line
        return Number(n) == n
    }

    // производим поиск на сервере
    const setChangesSearch = async (search) => {
        setLoading(true)
        setNoSearch(false)
        setList([])
        if (search.indexOf("!") === 0) setAdmin(true)
        search = search.replace("!","")
        // функция deleteAbbreviation убирает сокращённые названия бренда (hqv, rgk, kvt)
        let searchNumber = deleteAbbreviation(search)
        // alert("array.length: " + array.length)
        if ( isNumber( searchNumber ) ) {
            if (array && array.length) setList(array.filter(i => i.article.includes( searchNumber )))
            else setList(await searchArticle({text:searchNumber, limit: 6}))
        }else {
            if (array && array.length) setList(array.filter(i => i.name.toLowerCase().includes(search.toLowerCase().trim())))
            else setList(await searchName({text:search, limit: 6}))
        }
        if (list && list.length === 0) setNoSearch(true)
        // else setNoSearch(false)
        setLoading(false)
        // if (list && list.length > 0) setNoSearch(false)
    }

    // при изменении значения в поле поиска устанавливаем таймаут
    const onChangeSearchInputValue = async (search) => {
        setValue(search)
        if (search) {
            if (searchTimeOut !== null) {
                clearTimeout(searchTimeOut)
            }
            setSearchTimeOut(setTimeout(async (search) => {
                await setChangesSearch(search)
            }, 500, search))
        }else setList([])
    }

    // при нажатии на поле поиска
    const onClickSearchInput = async (search) => {
        setValue(search)
        if (search) {
           await setChangesSearch(search)
        }else setList([])
    }


    const onClickFon = (e) => {
        setList([])
        setNoSearch(false)
    }

    const redirectOnSearch = (key, val) => {
        if (loading) return
        setList([])
        setNoSearch(false)
        if (key === "value" && val !== "")
            history.push(`/search?${key}=${val}`)
        else if (key === "article")
            if (admin) history.push(`/product/${val.id}`)
            else {
                let brandName
                brand.allBrands.forEach(i => {
                    if (val.brandId === i.id) brandName = i.name.toLowerCase()
                })
                history.push(`/${brandName}/${val.url}`)
            }
    }

    const onKeyDownInput = (e) => {
        if (e.key === "Enter") redirectOnSearch("value", e.target.value.trim())
    }
    
    // if (loading) return <Loading width={150} />

    return (
        <div className="SearchComponent">
            <div className="SearchWrapper">
                {props?.label ? <label>&nbsp;{props.label}</label> : null}
                <div className="SearchBox">
                    <div id="searchDiv" className="SearchDiv">
                        <input 
                            className="SearchInput" 
                            type="text" 
                            autoComplete="off" 
                            name="search" 
                            id="search" 
                            placeholder="Поиск" 
                            value={value}
                            onChange={e => onChangeSearchInputValue(e.target.value)}
                            onClick={async (e) => await onClickSearchInput(e.target.value)}
                            onKeyDown={e => onKeyDownInput(e)}
                        />

                        <span className="InputGroupButton">
                            <button 
                                type="text" 
                                className="SearchButton btn btn-default"
                                onClick={() => redirectOnSearch("value", value)}
                            > 
                                {loading 
                                ? <Spinner size="sm" animation="border" variant="secondary" />
                                : <i className="fa fa-search " />
                            }
                            </button>
                        </span>

                    </div>
                </div>
                
                {list && list.length > 0
                ?
                    <div 
                        className="SearchListBox"
                    >
                        <div 
                            className="SearchList"
                        >
                            {list.map((i, index) =>
                                index < 5 && 
                                <div
                                    key={i.id}
                                >
                                {/* {index !== 0 && <hr />} */}
                                <div
                                    className="SearchListItem"
                                    onClick={() => redirectOnSearch("article", i)}
                                >
                                    <img 
                                        className="SearchListItemImg" 
                                        src={Array.isArray(i.img) && i.img[0]?.big !== undefined
                                            ? API_URL + i.img[0].small
                                            : typeof(i.img) === "string" 
                                                ? JSON.parse(i.img)[0].small !== undefined 
                                                    ? API_URL + JSON.parse(i.img)[0].small
                                                    : API_URL + "unknown.jpg"
                                                : API_URL + "unknown.jpg"
                                        } 
                                        alt={i.name}
                                    />
                                    <div
                                        className="SearchListItemBody"
                                    >
                                        <div
                                            className="SearchListItemBodyBoxTitle"
                                        >
                                            <div
                                                className="SearchListItemBodyName"
                                            >
                                                {i.name}
                                            </div>
                                            <div
                                                className="SearchListItemBodyArticle"
                                            >
                                                артикул: {i.article}
                                            </div>
                                        </div>

                                        <div
                                            className="SearchListItemBodyPrice"
                                        >
                                            <div> 
                                                {i.price > 0 && i.request === 0 ? "Цена: " + priceFormater(i.price) + " р." : "Цена по запросу"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            )}
                            {list.length > 5 
                            ?
                            <>
                                {/* <hr /> */}
                                <div
                                    className="SearchListBottom"
                                    onClick={(e) => redirectOnSearch("value", value)}
                                >
                                    Показать все
                                </div>
                            </>
                            :
                                null
                            }
                        </div>

                        
                    </div>
                :
                    noSearch 
                    ? 
                    <div className="SearchListBox">
                        <div className="SearchList">
                            <div className="SearchListItem">
                                <div className="SearchListItemBody">
                                    <div className="SearchListItemBodyPrice">
                                        Поиск не дал результата...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
                }

            </div>

            {(list && list.length > 0) || noSearch
            ? <div className="fon" onClick={e => onClickFon(e)} />
            : null}

        </div>
    );
})

export default Search;
