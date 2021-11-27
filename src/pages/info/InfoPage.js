import React from 'react'
import { Container, Card } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { SHOP_ROUTE } from '../../utils/consts'
import './InfoPage.css'


const InfoPage = (props) => {
    return (
        <Container 
            className="InfoPage"
        >            
            <Card 
                className="InfoPageCard"
                style={props?.width && {width: props?.width}}
            >
                <div className="InfoPageCardBody">
                    {props?.children}
                </div>
                <div className="InfoPageCardFooter">
                    Поcетить &nbsp;
                    <NavLink
                        className="NavLink"
                        to={SHOP_ROUTE}
                    >
                        магазин!
                    </NavLink>
                </div>
            </Card>
        </Container>
    )
}

export default InfoPage
