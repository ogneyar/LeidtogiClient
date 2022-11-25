
import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { ListGroup } from 'react-bootstrap'

import CategoryItemService from './CategoryItemService'

import { Context } from '../..'
import './CategoryService.css'


const CategoryService = observer((props) => {

    const { category } = useContext(Context)
    

    const onClickSelectedCategory = (id) => {
        category.setSelectedCategory(id)
    }


    return (
        <ListGroup 
            className="CategoryService"
        >
            {category.categories && Array.isArray(category.categories) && category.categories.map(i => {
                if (i.sub_category_id === 0 && i.id !== 1)
                    return <CategoryItemService key={i.id} item={i} onHide={props?.onHide} funcOnClick={onClickSelectedCategory} />
                return null
            })}
        </ListGroup>
    )
})

export default CategoryService