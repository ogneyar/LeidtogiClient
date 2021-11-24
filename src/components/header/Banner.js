import React, { useState } from 'react'
import { Carousel, Container } from 'react-bootstrap'

import { API_URL } from '../../utils/consts'
import './Banner.css'


const Banner = () => {

    const [index, setIndex] = useState(0);
    
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    
    return (
      <Carousel 
        activeIndex={index} 
        onSelect={handleSelect}
        className="Banner" 
        variant="dark"
    >
        <Carousel.Item>
            <Container
                className="BannerContainer"
            >
                <img
                    className="BannerImg"
                    // width="200"
                    src={API_URL + "milwaukee/4933451512/big/dcd548eb-d5dc-41b1-9b3f-e7fb252bb8dc.jpg"}
                    alt="First slide"
                />
                <Carousel.Caption
                    className="BannerCaption"
                >
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Container>
        </Carousel.Item>

        <Carousel.Item>
            <Container
                className="BannerContainer"
            >
                <img
                    className="BannerImg"
                    // width="200"
                    src={API_URL + "milwaukee/4932471886/big/6577b7a8-bb88-48f6-8f25-d3b25e32131e.jpg"}
                    alt="Second slide"
                />
            
                <Carousel.Caption
                    className="BannerCaption"
                >
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Container>
        </Carousel.Item>

        <Carousel.Item>
            <Container
                className="BannerContainer"
            >
                <img
                    className="BannerImg"
                    // width="200"
                    src={API_URL + "milwaukee/4933441225/big/50e03c6a-f4b4-4f97-8e6e-2a1b1b6470ac.jpg"}
                    alt="Third slide"
                />
            
                <Carousel.Caption
                    className="BannerCaption"
                >
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Container>
        </Carousel.Item>
      </Carousel>
    )
      
}

export default Banner
