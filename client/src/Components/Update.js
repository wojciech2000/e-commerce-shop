import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { getAllData } from '../redux/products/productsOperations'
import { DataContext } from './DataContext'
import Loading from './Loading'
import Error from './Error'

function Update(props) {

    const dispatch = useDispatch()

    const id = props.match.params.id
    const { loading, products, error } = useSelector(state => state.products)
    const product = products && products.find(({_id}) => _id === id)

    const { username, status } = useContext(DataContext)

    const [image, setImage] = useState('')
    const [sizes, setSizes] = useState(product && [...product.size])
    const AvailableSizes = ['XS', 'S', 'M', 'L','XL']  

    const onChangeImage = e => {
        setImage(e.target.files[0])
    }

    const onChangeSize = e => {

        const clickedSize = e.target.name
        const checkBoxes = document.querySelectorAll('.update__checkbox-size')

        const sizeIsInArray = sizes.find(size => size === clickedSize)

        if(!sizeIsInArray)
        {
            //add
            setSizes([...sizes, clickedSize])
            e.target.classList.add('update__checkbox-size--active')
        }
        else
        {
            //remove
            setSizes(sizes.filter(size => size !== clickedSize && size))
            e.target.classList.remove('update__checkbox-size--active')
        }

        //require at least one size to bo choosen
        const checkBoxesActive = document.querySelectorAll('.update__checkbox-size--active')

        if(checkBoxesActive.length > 0)
        {
            checkBoxes.forEach(checkBox => checkBox.removeAttribute('required'))
        }
        else
        {
            checkBoxes.forEach(checkBox => checkBox.setAttribute('required', true))
        }
    }

    const update = e => {
        e.preventDefault()
        
        const datas = document.querySelectorAll('.update__product-input')

        const formData = new FormData()

        datas.forEach(data => {
            formData.append(data.getAttribute('id'), data.value)
        })

        if(image)
        {
            formData.append('image', image)
        }
        
        formData.append('size', sizes)

        axios.patch(`/product/update/${props.match.params.id}`, formData )
        .then(res =>{
            status(res.data)
            if(res.data !== 'Podana nazwa produku jest zajęta')
            {
                props.history.push('/admin')
                dispatch(getAllData()) 
            } 
        }  )
        .catch(err => console.log(err))

    }

    return (
        <div className="update">

            {username !== 'admin' && <Redirect to='/' />}

            {loading ? <Loading /> : error ? <Error /> : product && 

            <form className="update__form" onSubmit={update}>

                <h2>Zmień dane</h2>

                <div>
                    <label htmlFor="name">Nazwa</label>
                    <input type="text" id="name" className="update__product-input" name="name" required defaultValue={product.name}/>
                </div>

                <div>
                    <label htmlFor="price">Cena</label>
                    <input type="number" step="0.01" id="price" className="update__product-input" name="price" required defaultValue={product.price}/>
                </div>

                <div className="update__sizes">
                    <span>Dostępne rozmiary</span>

                    <div className="update__sizes-container">
                    {
                        AvailableSizes.map((size, id) => {

                            if(sizes.find(sizeInState => sizeInState === size))
                            {
                                return (

                                    <div key={id} className="update__size" >
                                        <input type="checkbox" name={size} onChange={onChangeSize} id={size} checked className="update__checkbox-size update__checkbox-size--active" />
                                        <label htmlFor={size}>{size}</label>
                                    </div>
                                    )
                            }
                            else
                            {
                                return (
                                    <div key={id} className="update__size" >
                                        <input type="checkbox" name={size} onChange={onChangeSize} id={size} className="update__checkbox-size" />
                                        <label htmlFor={size}>{size}</label>
                                    </div>
                                )
                            }

                            
                        })
                    }
                    </div>

                </div>

                <div>
                    <label htmlFor="brand">Marka</label>
                    <input type="text" id="brand" className="update__product-input" name="brand" required defaultValue={product.brand}/>
                </div>

                <div>
                    <label htmlFor="quantity">Ilość</label>
                    <input type="number" id="quantity" className="update__product-input" name="quantity" required defaultValue={product.quantity}/>
                </div>

                <div>
                    <label htmlFor="imageName">Zdjęcie <br />(brak wyboru nie zmieni zdjęcia)</label>
                    <input type="file" id="image" className="update__image" name="image" accept="image/x-png,image/gif,image/jpeg" onChange={onChangeImage} />
                </div>

                <input type="submit" value="Zmień" className="update__submit" />

            </form>

            }
            
        </div>
    )
}

export default Update
