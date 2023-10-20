
import React, { useEffect, useContext, useState } from 'react'

import InfoPage from '../info/InfoPage'
import { API_URL } from '../../utils/consts'
import Loading from '../../components/Loading'

import './CatalogsPage.css'
import { getAllCatalogs } from '../../http/catalogsAPI'


const CatalogsPage = () => {

    const [ loading, setLoading ] = useState(false)
    const [ catalogs, setCatalogs ] = useState(null)

    useEffect(() => {
        setLoading(true)
        getAllCatalogs()
        .then(data => {
            setCatalogs(data)
            setLoading(false)
        })
    },[])

    const getDownload = (fileURL) => {
        fetch(API_URL + "catalogs/" + fileURL, {
            method: 'GET',
            headers: { 'Content-Type': 'application/pdf' },
        })
        .then((response) => response.blob())
        .then((blob) => {
            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([blob]),)
            const link = document.createElement('a')
            link.href = url;
            link.setAttribute(
                'download',
                fileURL,
            )
            // Append to html link element page
            document.body.appendChild(link)
            // Start download
            link.click()
            // Clean up and remove the link
            link.parentNode.removeChild(link)
        })
    }

    if (loading) return <Loading />

    return (
        <InfoPage>
            <div className="CatalogsPage">
                <h2>Каталоги</h2>

                <hr />
                
                <div>Здесь вы можете посмотреть или скачать каталоги:</div>

                <hr />

                {catalogs && Array.isArray(catalogs) && 
                catalogs.map((item,index) => {
                    return (
                    <div>
                        {index+1}.&nbsp;{item}&nbsp;
                        <a 
                            href={API_URL + "catalogs/" + item} 
                            target="_blank"
                        >
                            Посмотреть
                        </a>
                        &nbsp;
                        <span 
                            style={{cursor:"pointer",color:"green"}} 
                            onClick={() => getDownload(item)}
                        >
                            Скачать
                        </span>
                    </div>
                    )
                })
                }
                
                <br />

            </div>
        </InfoPage>
    )
}

export default CatalogsPage
