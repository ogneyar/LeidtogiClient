import React, { useEffect, useContext, useState } from 'react'
import { Container } from 'react-bootstrap'
// import { useHistory, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useQueryParam, StringParam } from 'use-query-params';

// import BrandBar from '../../components/brand/BrandBar'
import CategoryBar from '../../components/category/CategoryBar'
import ProductList from '../../components/product/ProductList'
import Pagination from '../../components/pagination/Pagination'
import Filter from '../../components/filter/Filter'
import Loading from '../../components/Loading'
// import Search from '../../components/search/Search'
import deleteAbbreviation from '../../utils/deleteAbbreviation';

import { Context } from '../..'


const SearchPage = observer(() => {
    // eslint-disable-next-line
    const { product, category, brand } = useContext(Context)
    
    const [ loadingCategory, setLoadingCategory ] = useState(true)
    // const [ loadingBrand, setLoadingBrand ] = useState(true)
    const [ loadingProduct, setLoadingProduct ] = useState(true)
    
    const [ value ] = useQueryParam('value', StringParam)

    function isNumber(n){
        // eslint-disable-next-line
        return Number(n) == n;
    }

    // const history = useHistory()

    useEffect(() => {
        if (product.allProducts.length) {
            // alert(product.allProducts.length)
            product.setPage(1)
            // setLoadingProduct(true)
            let length = 0
            product.setProducts(product.allProducts.filter(i => {
                if (value) {
                    // функция deleteAbbreviation убирает сокращённые названия бренда (hqv, rgk, kvt)
                    let valueNumber = deleteAbbreviation(value)
                    if ( isNumber( valueNumber ) ) {
                        if (i.article.includes( valueNumber )) {
                            length++
                            return true
                        }
                    }else {
                        if (i.name.toLowerCase().includes(value.toLowerCase())) {
                            length++
                            return true
                        }
                    }
                }
                return false
            }))
            product.setTotalCount(length)
            setLoadingProduct(false)
        }
        // eslint-disable-next-line
    },[product.allProducts, value])

    useEffect(() => {
        if (category.allCategories.length) {
            category.setCategories(category.allCategories)
            category.setSelectedCategory({})
            setLoadingCategory(false)
        }
        // eslint-disable-next-line
    },[category.allCategories])

    // useEffect(() => {
    //     if (brand.allBrands.length) {
    //         brand.setBrands(brand.allBrands)
    //         setLoadingBrand(false)
    //     }
    //     // eslint-disable-next-line
    // },[brand.allBrands])


    return (
        <Container
            className="ShopPage Mobile"
        >
        <div className="ShopRow">
            <div className="ShopColCategory">
                {loadingCategory ? <Loading /> : <CategoryBar search />}
            </div>
            <div className="ShopColContent">
                {/* {loadingBrand ? <Loading /> : <BrandBar search />} */}
                <Filter />
                {loadingProduct 
                ? <Loading />
                : <>
                    <h3>
                        Поиск - {value}
                    </h3>

                    <br />
                    <h5>
                        Товары, соответствующие критериям поиска
                    </h5>
                    <br />
                    <Pagination />
                    <ProductList search />
                    <Pagination />
                </>}
                
            </div>
        </div>
        </Container>
    )
})

export default SearchPage;
