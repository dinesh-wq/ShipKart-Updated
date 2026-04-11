import './index.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'


const LoginPage = () => {
    const [Username, setUserName] = useState('')
    const [Password, setPassword] = useState('')
    const [UsernameError, setUsernameError] = useState('')
    const [PasswordError, setPasswordError] = useState('')

    const handleUsernameChange = (e) => {
        setUserName(e.target.value)
        if (e.target.value.length === 0) {
            setUsernameError('Username is required')
        } else {
            setUsernameError('')
        }
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length === 0) {
            setPasswordError('Password is required')
        } else {
            setPasswordError('')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (Username === '') {
                setUsernameError('Username is required')
            }
            else if (Password === '') {
                setPasswordError('Password is required')
            }
            else if (Username !== '' && Password !== '') {
                console.log('Username:', Username)
                console.log('Password:', Password)
                const response = await fetch('https://shipkart-updated-backend-1.onrender.com/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: Username,
                        password: Password,
                    }),
                })
                const data = await response.json()
                setUserName('')
                setPassword('')
                console.log(data)
                alert(data.message)
            }



        } catch (error) {
            console.log('Login Error:', error)
            alert(`Login Error: ${error.message}`)
        }
    }
    return (
        <div className='login-page-background-container'>
            <div className="login-page-main-container">
                <div className="login-page-header">
                    <h1>Login Page</h1>
                </div>
                <div className="login-page-form-container">
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Username" value={Username} onChange={handleUsernameChange} />
                        <p className="error-message">{UsernameError}</p>
                        <input type="password" placeholder="Password" value={Password} onChange={handlePasswordChange} />
                        <p className="error-message">{PasswordError}</p>
                        <button type="submit">Login</button>
                    </form>
                </div>
                <div className="login-page-footer">
                    <p>Don't have an account? <Link to="/signUpPage">Register</Link></p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage