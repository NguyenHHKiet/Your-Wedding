import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Search() {
    const [keyword, setKeyword] = useState('')

    const navigate  = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        navigate(`/?keyword=${keyword}`)
    }
    return (
        <div className='d-grid gap-2'>
        <Form className='d-flex' onSubmit={submitHandler} inline>
            <Form.Control
                type='search'
                name='q'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5 px-sm-5'
                placeholder='Tìm kiếm..'
            ></Form.Control>
            
            <Button
                type='submit'
                variant='primary'
                className='p-0 px-3 align-content-lg-stretch'
                size="lg"
            >
                Tìm kiếm
            </Button>
            
        </Form>
        
        </div>
    )
}

export default Search
