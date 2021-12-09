import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'

import './Banner.css'


const Banner = () => {

    useEffect(() => {
        // const containerBoots = document.getElementById("containerBoots")
        // containerBoots.style.height = (containerBoots.clientWidth / 3).toString() + "px"
    },[])
    
    return (
        <Container
          id="containerBoots"
          className="Banner"
        >
        
        </Container>
    )
      
}

export default Banner
