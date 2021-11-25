import React, { useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'


import './Confirm.css'


const Confirm = (props) => {

    
    let time = props?.time
    if (!time) time = 1500
 
    useEffect(() => {
        if (props.show) {
            setTimeout(()=> {
                props.onHide()
            },time)
        }
    // eslint-disable-next-line
    },[props.show])


    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            // className="d-flex justify-content-center align-items-center"
            onClick={e => {
                e.stopPropagation()
                e.preventDefault()
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Уведомление
                </Modal.Title>
            </Modal.Header>
            <Modal.Body
                className="pl-4"
            >

                {props.children ? props.children : props?.message}

                <Button>Да</Button>
                <Button>Нет</Button>

            </Modal.Body>
        </Modal>
    )
}

export default Confirm