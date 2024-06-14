
import React, { useEffect, useState } from 'react'

import { Modal, Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import UserAddService from '../../service/admin/user/UserAddService'
import UsersViewService from '../../service/admin/user/UsersViewService'


const UserAdmin = (props) => {
    
    const [viewUsers, setViewUsers] = useState(false)
    const [addUser, setAddUser] = useState(false)
    const [editUser, setEditUser] = useState(false)
    const [deleteUser, setDeleteUser] = useState(false)

    const back = () => {
        setViewUsers(false)
        setAddUser(false)
        setEditUser(false)
        setDeleteUser(false)
    }
    
    const onHideAndBack = () => {
        props.onHide()
        back()
    }

    const onClickButtonView = () => {
        setViewUsers(true)
        setAddUser(false)
        setEditUser(false)
        setDeleteUser(false)
    }

    const onClickButtonAdd = () => {
        setViewUsers(false)
        setAddUser(true)
        setEditUser(false)
        setDeleteUser(false)
    }

    const onClickButtonEdit = () => {
        setViewUsers(false)
        setAddUser(false)
        setEditUser(true)
        setDeleteUser(false)
    }

    const onClickButtonDelete = () => {
        setViewUsers(false)
        setAddUser(false)
        setEditUser(false)
        setDeleteUser(true)
    }

    return (
        <Modal
            show={props?.show}
            // onHide={props?.onHide}
            onHide={() => null}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header 
                // closeButton
            >
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактор пользователей
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
            <div className='d-flex flex-column'>
                
                {viewUsers 
                ?
                    <UsersViewService onHide={onHideAndBack} back={back} />
                :
                    <Button
                        className='mt-4 mb-4'
                        variant="outline-success"
                        onClick={onClickButtonView}
                    >
                        Посмотреть пользователей
                    </Button>
                }

                {addUser  
                ?
                    <UserAddService onHide={onHideAndBack} back={back} />
                :
                    <Button
                        className='mt-4 mb-2'
                        variant="outline-primary"
                        onClick={onClickButtonAdd}
                    >
                        Добавить нового пользователя
                    </Button>
                }

                {editUser  
                ?
                    // <UserEditService onHide={onHideAndBack} back={back} />
                    "no"
                :
                    <Button
                        className='mt-4 mb-2'
                        variant="outline-warning"
                        onClick={onClickButtonEdit}
                    >
                        Редактировать пользователя
                    </Button>
                }
                
                {deleteUser  
                ?
                    // <UserDeleteService onHide={onHideAndBack} back={back} />
                    "no"
                :
                    <Button
                        className='mt-4 mb-4'
                        variant="outline-danger"
                        onClick={onClickButtonDelete}
                    >
                        Удалить пользователя
                    </Button>
                }
            </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={props?.onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default observer(UserAdmin)
