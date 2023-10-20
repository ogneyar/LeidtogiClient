
import React, { useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'

import CatalogsService from '../../service/admin/catalogs/CatalogsService'


const Catalogs = ({show, onHide}) => {

    useEffect(() => {
        // fetchBrands().then(data => {
        //     brandStore.setBrands(data)
        // })        
    },[])

    
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактор каталогов
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <CatalogsService /> 

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>                
            </Modal.Footer>
        </Modal>
    )
}

export default Catalogs
 