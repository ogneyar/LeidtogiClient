import React from 'react'
import { Spinner, Container, Col, Row } from 'react-bootstrap'


const Loading = (props) => {
    return (
        <Container
            className="d-flex justify-content-center align-items-center" 
        >
            <div style={props?.width ? {width: props.width} : {width: 300}} className="p-5 m-5">
                <Row>
                    <Col
                        className="d-flex justify-content-center align-items-center"
                    >
                        <Spinner animation="border" variant="secondary" />
                    </Col>
                </Row>
            </div>
            
        </Container>
    )
}

export default Loading
