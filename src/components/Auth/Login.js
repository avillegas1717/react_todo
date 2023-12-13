import React from 'react'
import { Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleAuth() {
    await login()

   
    return navigate('/')
  }

  return (
    <div className='login'>
      <article className="bg-customPurple mb-5 p-5 text-light">
        <h1 className="text-center">Welcome to AV Photography!</h1>
      </article>
      <Container>
        <Card className="m-2 border-dark text-center">
          <Card.Header className="bg-customBlue text-white">
            <h2>Login for full functionality</h2>
          </Card.Header>
          <Card.Body>
            <button className="btn btn-customBlue" onClick={() => handleAuth()}>
              Login w/ GitHub
            </button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}