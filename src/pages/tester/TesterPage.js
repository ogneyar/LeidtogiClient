import React, { useState, useEffect, useContext } from 'react'
import { Button } from 'react-bootstrap'
import ReactHtmlParser from 'react-html-parser'

import { fetchAllProducts, updateProduct } from '../../http/productAPI'
import { setLocationCitiesSdek, setFeed, setPlacesDl, setSiteMap } from '../../http/testerAPI'
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
    const { product, brand } = useContext(Context)

    const [ showAlert, setShowAlert ] = useState(false)
    const [ message, setMessage ] = useState("")

    const [ xml, setXML ] = useState("")

    const [ map, setMap ] = useState("")

    const [ places, setPlaces ] = useState("")

    const [ locationCities, setLocationCities ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const [ page, setPage ] = useState(0)


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
        let messageInfo = product
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
        if (!messageInfo) messageInfo = "?????? ??????????."
        setMessage(messageInfo)
    }

    const getProductWithOutDescription = async () => {
        let infos = await getAllProductInfos()
        setShowAlert(true)
        let messageInfo = product
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
        if (!messageInfo) messageInfo = "?????? ??????????."
        setMessage(messageInfo)
    }

    const getProductWithOutCharacteristics = async () => {
        let infos = await getAllProductInfos()
        setShowAlert(true)
        let messageInfo = product
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
        if (!messageInfo) messageInfo = "?????? ??????????."
        setMessage(messageInfo)
    }

    const getProductWithOutEquipment = async () => {
        let infos = await getAllProductInfos()
        setShowAlert(true)
        let messageInfo = product
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
        if (!messageInfo) messageInfo = "?????? ??????????."
        setMessage(messageInfo)
    }

    const getXML = async () => {
        if (product?.allProducts) {
            setXML("...")

            let response = await setFeed()

            if (response?.error) setXML("????????????")
            else setXML("??????????")

        }else setXML("")
    }

    const getSiteMap = async () => {
        if (product?.allProducts) {
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

            if (response?.error) setMap("????????????")
            else setMap("??????????")

        }else setMap("")
    }

    const getLocationCities = async () => {
        // let page = 0
        setLoading(true)
        await setLocationCitiesSdek({page}) 
            .then(data => {
                if (data?.error !== undefined) {
                    setLocationCities("????????????: " + data?.error)
                    setPage(0)
                }else if (data <= 1) {
                    setLocationCities("???????????????? ?????????????? - " + API_URL + "deliveries/sdek/locationCities.json")
                    setPage(0)
                }else {
                    setLocationCities("???????????????????? ?????????????? - " + data)
                    setTimeout(() => {
                        setPage(page + 1)
                        // getLocationCities(page)
                    },[2000])
                }
            })
            .finally(() => setLoading(false))
    }

    // ???????????????? ?????????? places.csv ?????? ?????????????? ??????????
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


    if (loading) return <Loading />

    return (
        <InfoPage>
            <div>
                
                <div>
                    <br />
                    ???????????????? ???????? yml ?????? ????????????.??????????????
                    <hr />
                    {xml && <> {xml} <br /> </>}
                    <Button onClick={getXML}> ?????????????? ?????? </Button>
                    <hr />
                </div>

                <div>
                    <br />
                    ???????????????? ?????????? ?????????? (siteMap)
                    <hr />
                    {map && <> {map} <br /> </>}
                    <Button onClick={getSiteMap}> ?????????????? siteMap </Button>
                    <hr />
                </div>

                <div>
                    <br />
                    ???????????????? places.csv ?????? ?????????????? ??????????
                    <hr />
                    {places && <> {places} <br /> </>}
                    <Button onClick={getPlacesDL}> ?????????????? places </Button>
                    <hr />
                </div>

                <div>
                    <br />
                    ???????????????? locationCities.json ?????? ????????
                    <hr />
                    {locationCities &&
                    <>
                        {locationCities}
                        <br />
                    </> 
                    }
                    {page ?
                    <>
                        ?????????? ????????????????: {page}
                        <br />
                    </> 
                    : null}
                    <Button onClick={() => getLocationCities(page)}>
                        ?????????????? locationCities
                    </Button>
                    <hr />
                </div>


                <br />
                ?????????? ?????????????????????????? ????????????????????
                <hr />
                <Button onClick={getProductWithOutGabarites}>
                    ????c?????????????? ???????????? ?????? ??????????????????
                </Button>
                <hr />
                <Button onClick={getProductWithOutDescription}>
                    ????c?????????????? ???????????? ?????? ????????????????
                </Button>
                <hr />
                <Button onClick={getProductWithOutCharacteristics}>
                    ????c?????????????? ???????????? ?????? ??????????????????????????
                </Button>
                <hr />
                <Button onClick={getProductWithOutEquipment}>
                    ????c?????????????? ???????????? ?????? ????????????????????????
                </Button>
                <hr />

                {/* <Button onClick={onClickButtonSetUrl}>
                    ???????????? url ??????????????
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
