import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartPage() {
    const {id} = useParams()
    const location = useLocation()
    const navigate  = useNavigate()
    const productId = id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart


    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/invoice')
    }

    return (
        <div>
        <Link to='/' className='btn btn-light my-3'>Tiếp tục Đặt đơn</Link>
            <Row>
                <Col md={8}>
                    <h1>Đơn đặt tiệc cưới</h1>
                    {cartItems.length === 0 ? (
                        <Message variant='info'>
                            Đơn đặt hiện tại trống <Link to='/'>Trang chủ</Link>
                        </Message>
                    ) : (
                            <ListGroup variant='flush'>
                                {cartItems.map(item => (
                                    <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>

                                            <Col md={2}>
                                                ${item.price}
                                            </Col>

                                            
                                                <Col md={3}>
                                                    <Form.Control
                                                        as="select"
                                                        value={item.qty}
                                                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                                    >
                                                        { 
                                                            
                                                            [...Array(item.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                            
                                                        }

                                                    </Form.Control>
                                                </Col>
                                            
                                            

                                            <Col md={1}>
                                                <Button
                                                    type='button'
                                                    variant='light'
                                                    onClick={() => removeFromCartHandler(item.product)}
                                                >
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Tổng ({cartItems.reduce((acc, item) => acc + item.qty, 0)-1}) số lượng</h2>
                                <p>Chọn buổi lễ được tổ chức:</p>
                                <Form>
                                    <Form.Group controlId='rating'>
                                        <Form.Control
                                            as='select'>
                                            <option value=''>Chọn...</option>
                                            <option value='1'>1 - Buổi Sáng</option>
                                            <option value='2'>2 - Buổi Trưa</option>
                                            <option value='3'>3 - Buổi Tối</option>
                                        </Form.Control>
                                        <Form.Label>Tổng số tiền:</Form.Label><br/>
                                        
                                        ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                                    </Form.Group>
                                </Form>
                                
                            </ListGroup.Item>
                        </ListGroup>

                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Thanh Toán
                            </Button>
                        </ListGroup.Item>


                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CartPage
