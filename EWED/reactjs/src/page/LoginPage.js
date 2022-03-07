import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate,  useSearchParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'


function LoginPage() {
    const location = useLocation()
    // const {search} = useSearchParams()

    const navigate  = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [ userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Đăng nhập</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='email'>
                    <Form.Label>Địa chỉ Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Nhập Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Nhập Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Đăng nhập
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Đăng ký Tài khoản? <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Đăng ký
                        </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default LoginPage