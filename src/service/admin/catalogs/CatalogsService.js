
import { useEffect, useState } from "react"

import { getAllCatalogs, addedCatalog, deleteCatalog } from "../../../http/catalogsAPI"
import Loading from "../../../components/Loading"
import { Button, Input } from "../../../components/myBootstrap"

import './CatalogsService.css'


const CatalogsService = () => {

    const [ catalogs, setCatalogs ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [ file, setFile ] = useState(null)

    useEffect(() => {
        setLoading(true)
        getAllCatalogs()
        .then(data => {
            setCatalogs(data)
        })
        .finally(_ => {
            setLoading(false)
        })
    },[])

    const onClickDeleteCatalog = (name) => {
        let yes = confirm("Уверены что хотите удалить каталог?")
        if (yes) {
            setLoading(true)
            deleteCatalog(name)
            .then(data => {
                if (data) {
                    alert("Каталог удалён!")
                    getAllCatalogs()
                    .then(catalogs => {
                        setCatalogs(catalogs)
                    })
                    .finally(_ => {
                        setLoading(false)
                    })
                }else setLoading(false)
            })
        }
    }

    const onClickAddedCatalog = () => {
        
        const formData = new FormData()
        if (file) {
            formData.append("catalog", file)
            setLoading(true)
            addedCatalog(formData)
            .then(data => {
                if (data) {
                    alert("Каталог добавлен!")
                    setFile(null)
                    getAllCatalogs()
                    .then(catalogs => {
                        setCatalogs(catalogs)
                    })
                    .finally(_ => {
                        setLoading(false)
                    }) 
                }else setLoading(false)
            })
        }
    }

    if (loading) return <Loading />

    return (
        <div
            className="CatalogsService"
        >
            <span>Файл с товарами</span>
            <Input 
                type="file"
                className="LeidTogiParserPage_box_file" 
                onChange={(e) => setFile(e.target.files[0])} 
                placeholder="Выберите файл" 
            />
            <Button 
                variant="outline-success"
                disabled={ ! file && true}
                onClick={onClickAddedCatalog}
            >
                Добавить каталог
            </Button>

            <hr />

            {catalogs && Array.isArray(catalogs) && 
            catalogs.map(item => {
                return (
                    <div
                        key={item+"admin"}
                        className="CatalogsService_one"
                    >
                        {item}
                        &nbsp;
                        <Button 
                            variant="outline-danger"
                            onClick={() => onClickDeleteCatalog(item)}
                        >
                            Удалить
                        </Button>
                    </div>
                )
            })
            }
        </div>
    )
}

export default CatalogsService 
