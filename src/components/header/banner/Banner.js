
import React, { useEffect } from 'react'
// import { Container } from 'react-bootstrap'

// import url from 'images/banner.jpg'

import './Banner.css'


const Banner = () => {

    useEffect(() => {
        // const containerBoots = document.getElementById("containerBoots")
        // containerBoots.style.height = (containerBoots.clientWidth / 3).toString() + "px"
    },[])
    
    return (
        <div
            id="containerBoots"
            className="Banner"
        >
            <div
                className="Banner_img"
            >

                <img src={"/images/banner.jpg"} alt="banner" />

            </div>
        
        </div>
    )

}

export default Banner
