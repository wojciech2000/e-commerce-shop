import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { DataContext } from './DataContext'
import { getAllData } from '../redux/products/productsOperations'

function AddProduct(props) {

    const dispatch = useDispatch()

    const { username, status } = useContext(DataContext)

    const [image, setImage] = useState('')
    const [sizes, setSizes] = useState([])
    const AvailableSizes = ['XS', 'S', 'M', 'L','XL']

    const onChangeImage = e => {
        const file = e.target.files[0]
        setImage(file)
    }

    const onChangeSize = e => {

        const clickedSize = e.target.name
        const checkBoxes = document.querySelectorAll('.add-product__checkbox-size')

        const sizeIsInArray = sizes.find(size => size === clickedSize)

        if(!sizeIsInArray)
        {
            //add
            setSizes([...sizes, clickedSize])
            e.target.classList.add('add-product__checkbox-size--active')
        }
        else
        {
            //remove
            setSizes(sizes.filter(size => size !== clickedSize && size))
            e.target.classList.remove('add-product__checkbox-size--active')
        }

        //require at least one size to bo choosen
        const checkBoxesActive = document.querySelectorAll('.add-product__checkbox-size--active')

        if(checkBoxesActive.length > 0)
        {
            checkBoxes.forEach(checkBox => checkBox.removeAttribute('required'))
        }
        else
        {
            checkBoxes.forEach(checkBox => checkBox.setAttribute('required', true))
        }
    }

    const addData = e => {

        e.preventDefault()
        
        const datas = document.querySelectorAll('.add-product__product-input')

        const formData = new FormData()

        datas.forEach(data => {
            formData.append(data.getAttribute('id'), data.value)
        })

        formData.append('image', image)
        formData.append('size', sizes)

        axios.post('product/add', formData)
        .then(res => {
            status(res.data)
            dispatch(getAllData()) 
            props.history.push('/admin')
        } )
        .catch(err => console.log(err))
    }

    return (
        <div className="add-product">

            {username !== 'admin' && <Redirect to='/' />}

            <h2>Dodaj produkt</h2>

            <form className="add-product__form" onSubmit={addData}>

                <div>
                    <label htmlFor="name">Nazwa</label>
                    <input type="text" id="name" className="add-product__product-input" name="name" required/>
                </div>

                <div>
                    <label htmlFor="price">Cena</label>
                    <input type="number" step="0.01" id="price" className="add-product__product-input" name="price" required/>
                </div>

                <div className="add-product__sizes">
                    <span>Dostępne rozmiary</span>

                    <div className="add-product__sizes-container">
                    {
                        AvailableSizes.map((size, id) => (
                            <div key={id} className="add-product__size" >
                                <input type="checkbox" name={size} onChange={onChangeSize} id={size} required={true} className="add-product__checkbox-size" />
                                <label htmlFor={size}>{size}</label>
                            </div>
                        ))
                    }
                    </div>

                </div>

                <div>
                    <label htmlFor="brand">Marka</label>
                    <input type="text" id="brand" className="add-product__product-input" name="brand" required/>
                </div>

                <div>
                    <label htmlFor="quantity">Ilość</label>
                    <input type="number" id="quantity" className="add-product__product-input" name="quantity" required/>
                </div>

                <div>
                    <label htmlFor="image">Zdjęcie</label>
                    <input type="file" id="image" className="add-product__image" name="image" accept="image/x-png,image/gif,image/jpeg" onChange={onChangeImage} required/>
                </div>

                <input type="submit" value="Dodaj" className="add-product__submit"/>
                
            </form>
            
        </div>
    )
}

export default AddProduct
