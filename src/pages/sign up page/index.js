import './index.css'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { JwtTokenContext } from '../../App'

const SignUpPage = () => {
    const { setJwtToken } = useContext(JwtTokenContext)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    const handleNameChange = (e) => {
        setUsername(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            if (username === '') {
                setUsernameError('username is required')
            }
            if (email === '') {
                setEmailError('Email is required')
            }
            if (password === '') {
                setPasswordError('Password is required')
            }
            if (confirmPassword === '') {
                setConfirmPasswordError('Confirm Password is required')
            }
            if (password !== confirmPassword) {
                setConfirmPasswordError('Passwords do not match')
            }
            if (username !== '' && email !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword) {
                const response = await fetch('https://shipkart-updated-backend-1.onrender.com/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        password: password,
                    }),
                })

                const contentType = response.headers.get("content-type");
                if (!response.ok || !contentType || !contentType.includes("application/json")) {
                    const errorText = await response.text();
                    console.error('Server error response:', errorText);
                    throw new Error(`Server returned ${response.status} ${response.statusText}${!contentType?.includes("application/json") ? '. Expected JSON but got HTML/Text. Please check if the backend URL and endpoint are correct.' : ''}`);
                }

                const data = await response.json()
                console.log(data)

                if (data.message === 'User Registered Successfully') {
                    setUsername('')
                    setEmail('')
                    setPassword('')
                    setConfirmPassword('')
                    setJwtToken(data.token)
                    alert(data.message)
                }
                else {
                    alert(data.message || 'Registration failed')
                }
            }
        } catch (error) {
            console.error('SignUp Error:', error)
            alert(`SignUp Error: ${error.message}`)
        }
    }

    return (
        <div className="sign-up-page-main-container">
            <div className="sign-up-page-form-container">
                <div className="sign-up-page-header">
                    <h1>Sign Up</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="User Name" value={username} onChange={handleNameChange} required />
                    <p className="error-message">{usernameError}</p>
                    <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} required />
                    <p className="error-message">{emailError}</p>
                    <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
                    <p className="error-message">{passwordError}</p>
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                    <p className="error-message">{confirmPasswordError}</p>
                    <button type="submit" className="sign-up-button">Sign Up</button>
                </form>
            </div>
            <div className="sign-up-page-footer">
                <p>Already have an account? <Link to="/">Login</Link></p>
            </div>
        </div>
    )
}

export default SignUpPage