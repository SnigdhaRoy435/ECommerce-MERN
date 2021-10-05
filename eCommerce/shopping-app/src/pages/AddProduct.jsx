import React, { useState } from 'react';
import axios from 'axios';

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('user', product.user);
        formData.append('description', product.description);
        formData.append('brand', product.brand);
        formData.append('category', product.category);
        formData.append('price', product.price);
        formData.append('countInStock', product.countInStock);
        formData.append('rating', product.rating);
        formData.append('numReview', product.numReview);
        formData.append('image', product.image);


        axios.post('http://localhost:8080/api/products/', formData)
            .then(res => {
                console.log(res);
                alert('successfully added')
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    const handlePhoto = (e) => {
        setProduct({ ...product, image: e.target.files[0] });
    }

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

                <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="image"
                    onChange={handlePhoto}
                /><br />

                <input
                    type="submit"
                />
            </form>
        </>
    )

}

export default AddProduct;