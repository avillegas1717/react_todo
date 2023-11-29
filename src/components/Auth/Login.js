import React from 'react'
import { Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
//useAuth below gives us access to currentUser, login, or logout.
//We must destructure these values from useAuth in a hook inside the component (see below)
import { useAuth } from '../../contexts/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleAuth() {
    await login()

    //return the user to a specific location using useNavigate hook from react-router-dom
    return navigate('/')
  }

  return (
    <div className='login'>
      <article className="bg-info mb-5 p-5 text-dark">
        <h1 className="text-center">Welcome to ToDo!</h1>
      </article>
      <Container>
        <Card className="m-2 border-dark text-center">
          <Card.Header className="bg-dark text-white">
            <h2>Login for full functionality</h2>
          </Card.Header>
          <Card.Body>
            <button className="btn btn-success" onClick={() => handleAuth()}>
              Login w/ GitHub
            </button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}