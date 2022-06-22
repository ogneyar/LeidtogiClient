import React, { useEffect, useContext, useState } from 'react'
import { Container } from 'react-bootstrap'
// eslint-disable-next-line
import { useHistory, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import CategoryBar from '../../components/category/CategoryBar'
import BrandBar from '../../components/brand/BrandBar'
import ProductList from '../../components/product/ProductList'
import Filter from '../../components/filter/Filter'
import Loading from '../../components/Loading'

import { Context } from '../..'
import './ShopPage.css'


const Shop = observer((props) => { 

    const { product, category, brand } = useContext(Context)

    const [ loadingCategory, setLoadingCategory ] = useState(true)
    const [ loadingBrand, setLoadingBrand ] = useState(true)
    const [ loadingProduct, setLoadingProduct ] = useState(true)
    
    //const history = useHistory()
    
    let { name } = useParams()


    useEffect(() => {
        brand.setSelectedBrand({})
        if (brand.allBrands.length) {
            brand.setBrands(brand.allBrands)
            setLoadingBrand(false)
        }
    },[brand])


    useEffect(() => {

        if (name) { product.setPage(1) }

        // это для роута /shop
        // хотя в принципе этот роут не используется (:
        // eslint-disable-next-line
        if (name === "shop") name = ""

        if (product.allProducts.length) {
            if (!name) { // если в url указан корневой каталог /
                product.setProducts(product.allProducts)
                product.setTotalCount(product.allProducts.length) // указываем общее количество товаров
                setLoadingProduct(false)
            }
        }

        if (category.allCategories.length) {
            if (!name) { // если в url указан корневой каталог /
                category.setCategories(category.allCategories)
                if (category.selectedCategory.id !== undefined) {// если есть выбраная категория
                    category.setSelectedCategory({}) // то её нужно обнулить
                }
                setLoadingCategory(false)
            }
        }

        if (product.allProducts.length && category.allCategories.length && name) {

            // category.setLoading(true)
            // console.log("start")

            const reOpenCategory = (array, item) => { // рекурсивная функция для открытия выбраных подкаталогов
                let response = []
                array.forEach(i => {
                    if (item && item === i.id) {
                        response = [...response, i.id]
                        response = [...response, ...reOpenCategory(array, i.sub_category_id)]
                    }
                })
                return response
            }
    
            let arrayCategory = []
            
            let arr = category.allCategories.filter(i => {
                if (i.url === name) { // если в url указан категория (напиример: /instrumenti)
                    category.setSelectedCategory(i) // то сделать её выделенной (таким образом fetchProducts вызовится в следующем useEffect)
                    
                    arrayCategory = [...arrayCategory, i.id]
                    arrayCategory = [...arrayCategory, ...reOpenCategory(category.allCategories, i.sub_category_id)]
    
                    return true
                }
                return false
            })
    
            let returnSelectedCategory = arr[0]
    
            if (!returnSelectedCategory) { // если категория не найдена
    
                //history.push("/error")
                window.location.href = "/404.html"
    
            }else {
    
                let returnArrayCategories = category.allCategories.map(i => {
                    if (name) { // если в url указана категория (напиример: /lopata)
                        let yes = false
                        arrayCategory.forEach(k => {
                            if (i.id === k) yes = true
                        })
                        if (yes) return {...i,open:true} // то её надо открыть
                    }
                    return {...i,open:false}
                })
        
                const filterSubCategory = (id) => { // функция фильтрует из store все категории, которые не подходят для подкатегории id
                    return returnArrayCategories.filter(i => i.sub_category_id === id) // и возвращает новый массив категорий
                }
                const filterIsProduct = (array) => { // функция
                    let arr = array.filter(i => i.is_product)
                    return arr.map(i => i.id)
                }
                const reArray = (array) => { // рекурсивная функция принимает массив и возвращает увеличеный массив категорий
                    let newArray = array
                    array.forEach(i => {
                        let arr = filterSubCategory(i.id) // функция фильтрует из store все категории
                        newArray = [...newArray, ...arr] // наращивается массив
                        newArray = [...newArray, ...reArray(arr)] // функция вызывает саму себя и наращивает массив
                    })
                    return newArray
                }
        
                let selectedCategory // выбрана категория
                if (returnSelectedCategory?.is_product) { // если выбранная категория содержит товар 
                    selectedCategory = returnSelectedCategory?.id
                }else {
                    let array = filterSubCategory(returnSelectedCategory?.id) // удаляем все категории, которые не подходят для подкатегории id
                    selectedCategory = filterIsProduct( // удаляем категории в которых нет товаров - !is_product
                        reArray(array) // наращиваем массив рекурсивной функцией
                    )
                }
                
                let returnArrayProducts =[]
                if (Array.isArray(selectedCategory)) {
                    returnArrayProducts = product.allProducts.filter(i => {
                        let yes = false
                        selectedCategory.forEach(k => {
                            if (i.categoryId === k) yes = true
                        })
                        if (yes) return true
                        return false
                    })
                }else {
                    returnArrayProducts = product.allProducts.filter(i => i.categoryId === selectedCategory)
                }

                product.setProducts(returnArrayProducts)
                product.setTotalCount(returnArrayProducts.length)
                category.setCategories(returnArrayCategories)
                

                // setTimeout(() => {
                //     console.log("stop")
                setLoadingProduct(false)
                setLoadingCategory(false)
                // }, 500)

                // category.setLoading(false)
            }
    
        }

    },[product.allProducts, category.allCategories, name, product.sort])

    // if (loadingProduct) return <Loading />

    return (
        <Container
            className="ShopPage Mobile"
        >
            <div className="ShopRow">
                <div className="ShopColCategory">
                    {loadingCategory || category.loading ? <Loading variant="warning" /> : <CategoryBar />}
                </div>
                <div className="ShopColContent">
                    {loadingBrand ? <Loading variant="warning" /> : <BrandBar />}
                    <Filter />
                    {/* {loadingProduct ? <Loading variant="success" /> 
                    :  */}
                        <div className="ShopProductList">
                            <ProductList loading={loadingProduct} setLoading={setLoadingProduct} /> 
                        </div>
                    {/* } */}
                    
                </div>
            </div>
        </Container>
    )
})

export default Shop
