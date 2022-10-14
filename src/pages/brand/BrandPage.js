// eslint-disable-next-line
import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { observer } from 'mobx-react-lite'
import { Container } from 'react-bootstrap'

import ProductPage from '../product/ProductPage'
import ShopPage from '../shop/ShopPage'

// import CategoryBar from '../../components/category/CategoryBar'
// import BrandBar from '../../components/brand/BrandBar'
// import ProductList from '../../components/product/ProductList'
// import Filter from '../../components/filter/Filter'
// import Loading from '../../components/Loading'

import { Context } from '../..'
import './BrandPage.css'


const BrandPage = (props) => {
    
    const { url } = useParams()
    // eslint-disable-next-line
    const { product, category, brand } = useContext(Context)
        
    const [ images ] = useState(document.getElementsByClassName("BrandPage_image"))
    
    // const [ loadingCategory, setLoadingCategory ] = useState(true)
    // const [ loadingBrand, setLoadingBrand ] = useState(true)
    // const [ loadingProduct, setLoadingProduct ] = useState(true)
    
    useEffect(() => {
        if (images && images[0] !== undefined && window.innerWidth < 576) {
            images[0].style.height = Math.round(window.innerWidth * 0.173) - 20 + "px"
        }
    },[images])
    
    // brands
    useEffect(() => {
        if (brand.allBrands.length) {
            // console.log("brands true")
            // brand.setBrands(brand.allBrands)
            brand.allBrands.forEach(i => {
                if (i.name.toLowerCase() === props?.brandName) {
                    brand.setSelectedBrand(i)
                    // console.log("props?.brandName",i.name)
                }
            })
            // setLoadingBrand(false)
        }
    },[brand, props?.brandName])

    
    // ----------------------------- НЕ УДАЛЯЙ, ДОДЕЛАЙ ------------------------------------

    // categories & products
    // useEffect(() => {        
    //     if (product.allProducts.length) {
    //         console.log("products true")
    //         product.setProducts(product.allProducts)
    //         product.setTotalCount(product.allProducts.length) // указываем общее количество товаров
    //         setLoadingProduct(false)
    //     }

    //     if (category.allCategories.length && product.allProducts.length) {
    //     // if (category.allCategories.length) {
    //         console.log("categories true")
    //         let arrayIdProducts = []
    //         product.allProducts.forEach(prod => {
    //             if (prod.brandId === brand.selectedBrand.id) {
    //                 arrayIdProducts.push(prod.categoryId)
    //                 // console.log("prod.categoryId",prod.categoryId)
    //             }
    //         })
    //         let unique = [...new Set(arrayIdProducts)] // массив уникальных значений id категорий
    //         // console.log(JSON.stringify(unique))
    //         // рекурсивная функция для проверки содержит ли 
    //         // выбранная категория внутри себя категории с товарами
    //         const reFindProductInCategory = (item) => {
    //             let response = false
    //             let flagSearchCategory = false // флаг поиска категории
    //             for (var i = 0; i < unique.length; i++) {
    //                 if (unique[i] === item?.id) {
    //                     flagSearchCategory = true
    //                     break
    //                 }
    //             }                         
    //             if (flagSearchCategory) {                             
    //                 response = true
    //             }else {                        
    //                 for (let i = 0; i < category.allCategories.length; i++) {
    //                     if (category.allCategories[i].sub_category_id === item?.id) {
    //                         response = reFindProductInCategory(category.allCategories[i])
    //                         if (response) break
    //                     }
    //                 }
    //             }
    //             return response
    //         }
    //         category.setCategories(category.allCategories.filter(i => {
    //             return reFindProductInCategory(i)
    //         }).map(data => {
    //             return {...data, open: true}
    //         }))
    //         category.setSelectedCategory({})
    //         setLoadingCategory(false)
    //     }
    // },[category, product.allProducts, brand.selectedBrand])

    
    if (url) return <ProductPage brandName={props?.brandName} />


    return (<>
        <Container
            className="BrandPage"
        >
            {/* ----------------------------- BrandPageHeader ---------------------------------- */}
            <div className="BrandPageHeader">
                <div className="BrandPage_image">
                    {/* Пропорции лого бренда 7:1 */}
                    <img src={`images/brands/${props?.brandName}/${props?.brandName}_logo.jpg`}  alt={`logo_${props?.brandName}`} />
                </div>
            </div>
            {/* -------------------------------------------------------------------------------- */}


            {/* ----------------------------- НЕ УДАЛЯЙ, ДОДЕЛАЙ ------------------------------------ */}

            {/* ----------------------------- BrandPageBody ------------------------------------ */}
            {/* <div className="BrandPageBody">
                <div className="BrandColCategory">
                    {loadingCategory || category.loading ? <Loading variant="warning" /> : <CategoryBar />}
                </div>
                <div className="BrandColContent">
                    {loadingBrand ? <Loading variant="warning" /> : <BrandBar />}
                    <Filter />
                    <div className="BrandProductList">
                        <ProductList loading={loadingProduct} setLoading={setLoadingProduct} categoryUrl={false} /> 
                        {loadingCategory || category.loading ? <Loading variant="warning" /> : <CategoryBar />}
                    </div>
                </div>
            </div> */}
            {/* -------------------------------------------------------------------------------- */}

        </Container>

        <ShopPage brandName={props?.brandName} />
        

    </>)
}

export default BrandPage
// export default observer(BrandPage)
