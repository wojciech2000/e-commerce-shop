import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { DataContext } from './DataContext'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getAllData } from '../redux/products/productsOperations'
import axios from 'axios'

function Update(props) {

    const id = props.match.params.id
    const { loading, products, error } = useSelector(state => state.products)
    const product = products && products.find(({_id}) => _id === id)

    const { username, status } = useContext(DataContext)

    const [image, setImage] = useState('')
    const [sizes, setSize] = useState(product && product.size)

    const dispatch = useDispatch()

    const AvailableSizes = ['XS', 'S', 'M', 'L','XL']

    const onChangeImage = e => {
        setImage(e.target.files[0])
    }

    const onClickSize = e => {

        const clickedSize = e.target
        const sizeIsInArray = product && sizes.find(size => size === clickedSize.textContent)

        if(!sizeIsInArray)
        {
            //add
            setSize([...sizes, clickedSize.textContent])
            clickedSize.classList.add('update__size--active')
        }
        else
        {
            //remove
            setSize(sizes.filter(size => size !== clickedSize.textContent && size))
            clickedSize.classList.remove('update__size--active')
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
            dispatch(getAllData())
            status(res.data)
            props.history.push('/admin')
        }  )
        .catch(err => console.log(err))

    }

    return (
        <div className="update">

            {/* {username !== 'admin' && <Redirect to='/' />} */}

            {loading ? <div>loading</div> : error ? <div>error</div> : product && 

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
                                return (<div key={id} className="update__size update__size--active" onClick={onClickSize} >
                                    {size}
                                </div>)
                            }
                            else
                            {
                                return (<div key={id} className="update__size" onClick={onClickSize} >
                                    {size}
                                </div>)
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
                    <label htmlFor="imageName">Zdjęcie</label>
                    <input type="file" id="image" className="update__image" name="image" onChange={onChangeImage} />
                </div>

                <input type="submit" value="Zmień" className="update__submit" />

                
            </form>

            }

            
        </div>
    )
}

export default Update
