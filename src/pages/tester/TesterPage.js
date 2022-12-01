import React, { useState, useEffect, useContext } from 'react'
import { Button } from 'react-bootstrap'
import ReactHtmlParser from 'react-html-parser'

import { fetchAllProducts, updateProduct } from '../../http/productAPI'
import { 
    setLocationCitiesSdek, setFeed, setPlacesDl, setSiteMap, getLengthTor, editWeightTor
} from '../../http/testerAPI'
import { getAllProductSizes } from '../../http/productSizeAPI'
import { getAllProductInfos } from '../../http/productInfoAPI'
import { Alert } from '../../components/myBootstrap'
import Loading from '../../components/Loading'
import translit from '../../utils/translite'
import { API_URL } from '../../utils/consts'
import InfoPage from '../info/InfoPage'
import { Context } from '../..'


const TesterPage = () => {
    // eslint-disable-next-line
    const { productStore, brand } = useContext(Context)

    const [ showAlert, setShowAlert ] = useState(false)
    const [ message, setMessage ] = useState("")

    const [ xml, setXML ] = useState("")

    const [ map, setMap ] = useState("")

    const [ places, setPlaces ] = useState("")

    const [ locationCities, setLocationCities ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const [ page, setPage ] = useState(0)

    const [ weight, setWeight ] = useState("")


    // eslint-disable-next-line
    const onClickButtonSetUrl = async () => {
        let response = await fetchAllProducts()

        setShowAlert(true)

        await response.forEach(async i => {
            if (!i?.url || !i.url.includes(i?.article)) {
                setTimeout(async() => {
                    let url = translit(i?.name) + "_" + i?.article
                    await updateProduct(i?.id,{url})
                        .then(() => setMessage(message + "id: " + i.id + " url: " + url + "<br /><br />"))
                },50)
            }
        })

    }


    useEffect(() => {
    }, [message])

    const getProductWithOutGabarites = async () => {
        let sizes = await getAllProductSizes()
        setShowAlert(true)
        let messageInfo = productStore
            .allProducts
            .filter(i => {
                let no = true
                sizes.forEach(j => {
                    if (i.id === j.productId) no = false
                })
                return no
            })
            .map(j => j.id)
            .join(" ")
        if (!messageInfo) messageInfo = "Нет таких."
        setMessage(messageInfo)
    }

    const getProductWithOutDescription = async () => {
        let infos = await getAllProductInfos()
        setShowAlert(true)
        let messageInfo = productStore
            .allProducts
            .filter(i => {
                let no = true
                infos.forEach(j => {
                    if (i.id === j.productId && j.title === "description") no = false
                })
                return no
            })
            .map(j => j.id)
            .join(" ")
        if (!messageInfo) messageInfo = "Нет таких."
        setMessage(messageInfo)
    }

    const getProductWithOutCharacteristics = async () => {
        let infos = await getAllProductInfos()
        setShowAlert(true)
        let messageInfo = productStore
            .allProducts
            .filter(i => {
                let no = true
                infos.forEach(j => {
                    if (i.id === j.productId && j.title === "characteristics") no = false
                })
                return no
            })
            .map(j => j.id)
            .join(" ")
        if (!messageInfo) messageInfo = "Нет таких."
        setMessage(messageInfo)
    }

    const getProductWithOutEquipment = async () => {
        let infos = await getAllProductInfos()
        setShowAlert(true)
        let messageInfo = productStore
            .allProducts
            .filter(i => {
                let no = true
                infos.forEach(j => {
                    if (i.id === j.productId && j.title === "equipment") no = false
                })
                return no
            })
            .map(j => j.id)
            .join(" ")
        if (!messageInfo) messageInfo = "Нет таких."
        setMessage(messageInfo)
    }

    const getXML = async () => {
        if (productStore?.allProducts) {
            setXML("...")

            let response = await setFeed()

            if (response?.error) setXML("ошибка")
            else setXML("успех")

        }else setXML("")
    }

    const getSiteMap = async () => {
        if (productStore?.allProducts) {
            setMap("...")

            let response = await setSiteMap({
                routes: [
                    "/about_us",
                    "/delivery",
                    "/payment",
                    "/privacy_policy",
                    "/returns_policy",
                    "/terms_of_use",
                    "/warranty",
                    "/contacts",
                    "/specials",
                ]
            })

            if (response?.error) setMap("ошибка")
            else setMap("успех")

        }else setMap("")
    }

    const getLocationCities = async () => {
        // let page = 0
        setLoading(true)
        await setLocationCitiesSdek({page}) 
            .then(data => {
                if (data?.error !== undefined) {
                    setLocationCities("Ошибка: " + data?.error)
                    setPage(0)
                }else if (data <= 1) {
                    setLocationCities("Закончил успешно - " + API_URL + "deliveries/sdek/locationCities.json")
                    setPage(0)
                }else {
                    setLocationCities("Количество записей - " + data)
                    setTimeout(() => {
                        setPage(page + 1)
                        // getLocationCities(page)
                    },[2000])
                }
            })
            .finally(() => setLoading(false))
    }

    // Создание файла places.csv для Деловых линий
    const getPlacesDL = async () => {
        setLoading(true)
        setPlaces(await setPlacesDl())
        setLoading(false)
    }

    
    useEffect(() => {
        if (page && page > 0) {
            getLocationCities(page)
        }
    // eslint-disable-next-line
    }, [page])


    //
    const setNewWeight = async () => {
        let length = await getLengthTor()

        if (length > 0) {
            for(let i = 0; i < length; i = i + 10) {
                let stop = i + 9
                if ((length - i) < 10) stop = length - 1 
                editWeightTor(i, stop).then(data => {
                    setWeight(data)  
                    // console.log(data)
                })
            }
        }
    }


    if (loading) return <Loading />

    return (
        <InfoPage>
            <div>
                
                <div>
                    <br />
                    Создание фида yml для Яндекс.Метрики
                    <hr />
                    {xml && <> {xml} <br /> </>}
                    <Button onClick={getXML}> Создать фид </Button>
                    <hr />
                </div>

                <div>
                    <br />
                    Создание карты сайта (siteMap)
                    <hr />
                    {map && <> {map} <br /> </>}
                    <Button onClick={getSiteMap}> Создать siteMap </Button>
                    <hr />
                </div>

                <div>
                    <br />
                    Создание places.csv для Деловых линий
                    <hr />
                    {places && <> {places} <br /> </>}
                    <Button onClick={getPlacesDL}> Создать places </Button>
                    <hr />
                </div>

                <div>
                    <br />
                    Создание locationCities.json для СДЭК
                    <hr />
                    {locationCities &&
                    <>
                        {locationCities}
                        <br />
                    </> 
                    }
                    {page ?
                    <>
                        Номер страницы: {page}
                        <br />
                    </> 
                    : null}
                    <Button onClick={() => getLocationCities(page)}>
                        Создать locationCities
                    </Button>
                    <hr />
                </div>

                
                <div>
                    <br />
                    Смена веса у tor (перевод в кг)
                    <hr />
                    {weight && <> {weight} <br /> </>}
                    <Button onClick={setNewWeight}> Начать перевод </Button>
                    <hr />
                </div>



                <br />
                Поиск отсутствующих параметров
                <hr />
                <Button onClick={getProductWithOutGabarites}>
                    Поcмотреть товары без габаритов
                </Button>
                <hr />
                <Button onClick={getProductWithOutDescription}>
                    Поcмотреть товары без описания
                </Button>
                <hr />
                <Button onClick={getProductWithOutCharacteristics}>
                    Поcмотреть товары без характеристик
                </Button>
                <hr />
                <Button onClick={getProductWithOutEquipment}>
                    Поcмотреть товары без комплектации
                </Button>
                <hr />

                {/* <Button onClick={onClickButtonSetUrl}>
                    Задать url товарам
                </Button> */}

            </div>
            <Alert show={showAlert} onHide={() => setShowAlert(false)}>
                {/* {React.createElement(
                    "img", 
                    {src: `${message}`},
                    null
                )} */}
                {ReactHtmlParser(message)}
            </Alert>
        </InfoPage>
    )
}

export default TesterPage
