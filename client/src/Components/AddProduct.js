import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { DataContext } from './DataContext'
import axios from 'axios'

function AddProduct() {

    const { username, status } = useContext(DataContext)

    const AvailableSizes = ['XS', 'S', 'M', 'L','XL']

    const [image, setImage] = useState('')
    const [sizes, setSize] = useState([])

    const onChangeImage = e => {
        const file = e.target.files[0]
        setImage(file)
    }

    const onClickSize = e => {

        const clickedSize = e.target
        const sizeIsInArray = sizes.find(size => size === clickedSize.textContent)

        if(!sizeIsInArray)
        {
            //add
            setSize([...sizes, clickedSize.textContent])
            clickedSize.classList.add('add-product__size--active')
        }
        else
        {
            //remove
            setSize(sizes.filter(size => size !== clickedSize.textContent && size))
            clickedSize.classList.remove('add-product__size--active')
        }
    }

    const onSubmit = e => {

        e.preventDefault()
        
        const datas = document.querySelectorAll('.add-product__product-input')

        const formData = new FormData()

        datas.forEach(data => {
            formData.append(data.getAttribute('id'), data.value)
        })

        formData.append('image', image)
        formData.append('size', sizes)

        if(sizes.length > 0)
        {
            axios.post('product/add', formData)
            .then(res => status(res.data))
            .catch(err => console.log(err))
        }
        else
        {
            status('Wybierz rozmiary')
        }

    }

    return (
        <div className="add-product">

            {/* {username !== 'admin' && <Redirect to='/' />} */}

            <h2>Dodaj produkt</h2>

            <form className="add-product__form" onSubmit={onSubmit}>

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
                            <div key={id} className="add-product__size" onClick={onClickSize} >
                                {size}
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
                    <input type="file" id="image" className="add-product__image" name="image" onChange={onChangeImage} required/>
                </div>

                <input type="submit" value="Dodaj" className="add-product__submit"/>

                
            </form>
            
        </div>
    )
}

export default AddProduct
