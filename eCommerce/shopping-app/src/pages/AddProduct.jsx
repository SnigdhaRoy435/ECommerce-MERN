import React, { useState } from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64';

const AddProduct = ({ match }) => {
    const userId = match.params.id

    console.log(userId)

    const [product, setProduct] = useState({
        user: userId,
        name: '',
        description: '',
        brand: '',
        category: '',
        price: '',
        countInStock: '',
        rating: '',
        numReview: '',
        image: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userId) {
            await axios.post('http://localhost:8080/api/products/', product)
                .then(res => {
                    console.log(res);
                    alert('successfully added')
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            console.log('Not posted')
        }


    }

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    // const handlePhoto = (e) => {
    //     setProduct({ ...product, image: e.target.files[0] });
    // }

    console.log(product.image)

    return (
        <>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>

                <input
                    type="text"
                    placeholder="name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                /><br />
                <input
                    type="text"
                    placeholder="description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                /><br />
                <input
                    type="text"
                    placeholder="brand"
                    name="brand"
                    value={product.brand}
                    onChange={handleChange}
                /><br />
                <input
                    type="number"
                    placeholder="price"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                /><br />
                <input
                    type="text"
                    placeholder="category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                /><br />
                <input
                    type="number"
                    placeholder="countInStock"
                    name="countInStock"
                    value={product.countInStock}
                    onChange={handleChange}
                /><br />
                <input
                    type="number"
                    placeholder="rating"
                    name="rating"
                    value={product.rating}
                    onChange={handleChange}
                /><br />
                <input
                    type="number"
                    placeholder="numReview"
                    name="numReview"
                    value={product.numReview}
                    onChange={handleChange}
                /><br />

                <FileBase type="file"
                    multiple={false} onDone={({ base64 }) => setProduct({ ...product, image: base64 })} />

                <button type='submit'>Submit</button>
            </form>
        </>
    )

}

export default AddProduct;
