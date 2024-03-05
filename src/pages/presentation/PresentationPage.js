
import { useEffect, useState } from 'react'

import InfoPage from '../info/InfoPage'
import { API_URL } from '../../utils/consts'
import Loading from '../../components/Loading'

import './PresentationPage.css'
import { getAllPresentations } from '../../http/presentationAPI'


const PresentationPage = () => {

    const [ loading, setLoading ] = useState(false)
    const [ presentations, setPresentations ] = useState(null)

    useEffect(() => {
        setLoading(true)
        getAllPresentations()
        .then(data => {
            setPresentations(data)
            setLoading(false)
        })
    },[])

    const getDownload = (fileURL) => {
        fetch(API_URL + "presentation/" + fileURL, {
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
            <div className="PresentationPage">
                <header className="PresentationPage_header">Презентация ЛеидТоги</header>

                <hr />
                
                <div className="PresentationPage_header_mini">Здесь вы можете посмотреть или скачать нашу презентацию:</div>

                <hr />

                {presentations && Array.isArray(presentations) && 
                presentations.map((item,index) => {
                    return (
                    <div
                        key={item+"presentations"}
                        className="PresentationPage_row"
                    >
                        {index+1}.&nbsp;{item}&nbsp;
                        <a 
                            href={API_URL + "presentation/" + item} 
                            target="_blank"
                            className="PresentationPage_row_view"
                        >
                            Посмотреть
                            &nbsp;
                        </a>
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

export default PresentationPage
