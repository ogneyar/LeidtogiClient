import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite'

import { API_URL } from '../../utils/consts';
import deleteAbbreviation from '../../utils/deleteAbbreviation';
import priceFormater from '../../utils/priceFormater';

import { Context } from '../..'
import './Search.css'


const Search = observer((props) => {

    const { product, brand } = useContext(Context)

    const [ admin, setAdmin ] =  useState(false)

    const [value, setValue] = useState("")
    const [list, setList] = useState([])
    const [array, setArray] = useState([])

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
        return Number(n) == n;
    }

    const onChangeSearchInputValue = (search) => {
        setValue(search)
        if (search) {
            if (search.indexOf("!") === 0) setAdmin(true)
            search = search.replace("!","")
            // функция deleteAbbreviation убирает сокращённые названия бренда (hqv, rgk, kvt)
            let searchNumber = deleteAbbreviation(search)
            if ( isNumber( searchNumber ) ) {
                setList(array.filter(i => i.article.includes( searchNumber )))
            }else {
                setList(array.filter(i => i.name.toLowerCase().includes(search.toLowerCase().trim())))
            }

        }else setList([])
    }

    const onClickSearchInput = (search) => {onChangeSearchInputValue(search)}

    const onClickFon = (e) => {
        setList([])
    }

    const redirectOnSearch = (key, val) => {
        setList([])
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
                            onClick={e => onClickSearchInput(e.target.value)}
                            onKeyDown={e => onKeyDownInput(e)}
                        />

                        <span className="InputGroupButton">

                            <button 
                                type="text" 
                                className="SearchButton btn btn-default"
                                onClick={() => redirectOnSearch("value", value)}
                            >
                                <i className="fa fa-search " />
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
                                        src={Array.isArray(i.img)  && i.img[0]?.big !== undefined
                                            ? API_URL + i.img[0].small
                                            : API_URL + "unknown.jpg"} 
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
                                                {i.price > 0 ? "Цена: " + priceFormater(i.price) + " р." : "Цена по запросу"}
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
                    null
                }

            </div>

            {list && list.length > 0 
            ? <div className="fon" onClick={e => onClickFon(e)} />
            : null}

        </div>
    );
})

export default Search;
