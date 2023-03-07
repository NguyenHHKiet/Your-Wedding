import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        <div className='col-xs-4'>
                            <p>Copyright &copy; <span className='site-title'>Your Wedding</span></p>
                            All Rights Reserved                
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
