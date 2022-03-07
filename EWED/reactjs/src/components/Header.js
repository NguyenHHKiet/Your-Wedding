import React from 'react'
import { Navbar, Container, Nav, NavDropdown, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import Search from './Search'

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <div>
            <header>
                <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand>Your Wedding</Navbar.Brand>
                        </LinkContainer>
                        

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Search/>

                        <Nav className="mr-auto bg-left px-5">
                        
                            <LinkContainer to="/cart">
                                <Nav.Link > <i className='fas fa-shopping-cart'></i> Đơn Đặt</Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Trang cá nhân</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Đăng xuất</NavDropdown.Item>

                                </NavDropdown>
                            ) : (
                                    <LinkContainer to="/login">
                                        <Nav.Link> <i className='fas fa-user'></i> Đăng Nhập</Nav.Link>
                                    </LinkContainer>
                            )}
                            
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenue'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Admin</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}


                            
                            
                            
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </div>
    )
}

export default Header
