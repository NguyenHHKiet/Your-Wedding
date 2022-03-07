import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image} from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'
import Loader from '../components/Loader'
import Message from '../components/Message'
import BigProduct from '../components/BigProduct'
import { useLocation } from 'react-router-dom'
import Paginate from '../components/Paginate'

function HomePage() {
    const [products, setProducts] = useState([])
    const location = useLocation()
    const keyword = location.search


    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, page, pages } = productList
    
    useEffect(() => {
        
        async function fetchProducts(){
            const {data} = await axios.get(`/api/products${keyword}`)
            setProducts(data)
        }
        fetchProducts()
        
    }, [dispatch, keyword])

    return (
        <div>
            <div id="hero" className='hero overlay'>
                <div className='hero-content'>
                    <div className='hero-text'>
                        <h1>Câu chuyện của bạn bắt đầu từ đây</h1>
                        <p>Tình yêu - Hạnh phúc - Gia đình</p>
                        <i className='btn btn-border'>Bắt đầu</i>
                    </div>
                </div>
            </div>
            <h1>Sảnh tiệc</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <BigProduct product={product} />
                                </Col>
                            ))}
                        </Row>
                    </div>
            }
            <h1>Thực đơn</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <Row>
                            {products.map(product => (
                                
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    
                                        <Product product={product} />
                                    
                                </Col>    
                            ))}
                        </Row>
                        <Paginate page={page} pages={pages} keyword={keyword} />
                    </div>
            }
            <div id="he" className='he overlay'>
                <div className='hero-content'>
                    <div className='hero-text'>
                        <h2>Love Dear</h2>
                        <i className='border'>Thank You Today</i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
