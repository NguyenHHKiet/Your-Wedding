import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

function RegisterPage() {

    const location = useLocation()
    // const {search} = useSearchParams()

    const navigate  = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [ userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Mật khẩu không hợp lệ!!!')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <div>
        <FormContainer>
                <h1>Đăng ký</h1>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Tên người dùng</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Nhập tên người dùng'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Địa chỉ Email</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Nhập địa chỉ Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control
                            required
                            type='password'
                            placeholder='Nhập mật khẩu'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Xác nhận mật khẩu</Form.Label>
                        <Form.Control
                            required
                            type='password'
                            placeholder='Xác nhận mật khẩu'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Đăng ký
                    </Button>

                </Form>

                <Row className='py-3'>
                    <Col>
                        Đã có Tài khoản? <Link
                            to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                            Đăng nhập
                            </Link>
                    </Col>
                </Row>
        </FormContainer>
        </div>
    )
}

export default RegisterPage
