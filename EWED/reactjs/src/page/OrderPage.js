import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

function OrderPage() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }


    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AZSI0PvFkU4b4zCTGhyghtLUnKRsYvi1qgukf4x8LhVFKSt-PCiM8eTD_JFnkbjnRAdZlmCJMMJ42bHE&disable-funding=credit'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {

        if (!userInfo) {
            navigate('/login')
        }

        if (!order || successPay || order._id !== Number(id)) {
            dispatch({ type: ORDER_PAY_RESET })
            

            dispatch(getOrderDetails(id))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, order, id, successPay])


    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
                <div>
                    <h1>????n ?????t: {order._id}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Th??ng tin c?? nh??n</h2>
                                    <p><strong>T??n ng?????i d??ng: </strong> {order.user.name}</p>
                                    <p><strong>?????a ch??? Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Ph????ng th???c thanh to??n</h2>
                                    <p>
                                        <strong>Ph????ng th???c: </strong>
                                        {order.paymentMethod}
                                    </p>
                                    {order.isPaid ? (
                                        <Message variant='success'>???? Thanh to??n {order.paidAt}</Message>
                                    ) : (
                                            <Message variant='warning'>Ch??a Thanh to??n</Message>
                                        )}

                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>????n ?????t t???i nh?? h??ng</h2>
                                    {order.orderItems.length === 0 ? <Message variant='info'>
                                        ????n ?????t hi???n t???i tr???ng!!
                                        </Message> : (
                                            <ListGroup variant='flush'>
                                                {order.orderItems.map((item, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image src={item.image} alt={item.name} fluid rounded />
                                                            </Col>

                                                            <Col>
                                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                            </Col>

                                                            <Col md={4}>
                                                                {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        )}
                                </ListGroup.Item>

                            </ListGroup>

                        </Col>

                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>T???ng ????n ?????t</h2>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>T???ng H??a ????n(Tr?????c Thu???):</Col>
                                            <Col>${order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Thu???(10%):</Col>
                                            <Col>${order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>T???ng H??a ????n(Sau Thu???):</Col>
                                            <Col>${order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>


                                    {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}

                                            {!sdkReady ? (
                                                <Loader />
                                            ) : (
                                                    <PayPalButton
                                                        amount={order.totalPrice}
                                                        onSuccess={successPaymentHandler}
                                                    />
                                                )}
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                                
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
}

export default OrderPage