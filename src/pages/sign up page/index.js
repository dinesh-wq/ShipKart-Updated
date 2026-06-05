import './index.css'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { JwtTokenContext } from '../../App'
import Cookies from 'js-cookie'

const SignUpPage = () => {
    const navigate = useNavigate()
    const { setJwtToken } = useContext(JwtTokenContext)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [usernameError, setUsernameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [formError, setFormError] = useState('')

    const handleNameChange = (e) => {
        const val = e.target.value
        setUsername(val)
        if (val.trim() === '') {
            setUsernameError('Username is required')
        } else if (val.length < 3) {
            setUsernameError('Username must be at least 3 characters')
        } else {
            setUsernameError('')
        }
    }

    const handleEmailChange = (e) => {
        const val = e.target.value
        setEmail(val)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (val.trim() === '') {
            setEmailError('Email is required')
        } else if (!emailRegex.test(val)) {
            setEmailError('Please enter a valid email')
        } else {
            setEmailError('')
        }
    }

    const handlePasswordChange = (e) => {
        const val = e.target.value
        setPassword(val)
        if (val.trim() === '') {
            setPasswordError('Password is required')
        } else if (val.length < 6) {
            setPasswordError('Password must be at least 6 characters')
        } else {
            setPasswordError('')
        }

        // Re-validate confirm password if it's already filled
        if (confirmPassword && val !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match')
        } else if (confirmPassword && val === confirmPassword) {
            setConfirmPasswordError('')
        }
    }

    const handleConfirmPasswordChange = (e) => {
        const val = e.target.value
        setConfirmPassword(val)
        if (val.trim() === '') {
            setConfirmPasswordError('Confirm Password is required')
        } else if (val !== password) {
            setConfirmPasswordError('Passwords do not match')
        } else {
            setConfirmPasswordError('')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError('')

        // Final validation check
        if (!username || !email || !password || !confirmPassword) {
            setFormError('Please fill in all fields')
            return
        }

        if (usernameError || emailError || passwordError || confirmPasswordError) {
            setFormError('Please fix the errors before submitting')
            return
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match')
            return
        }

        try {
            setIsLoading(true)
            const response = await fetch('https://shipkart-updated-backend-1.onrender.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            })
            setIsLoading(false)

            const contentType = response.headers.get("content-type");
            if (!response.ok) {
                let errorMessage = `Server returned ${response.status} ${response.statusText}`
                if (contentType && contentType.includes("application/json")) {
                    const errorData = await response.json()
                    errorMessage = errorData.message || errorMessage
                }
                throw new Error(errorMessage)
            }

            const data = await response.json()

            if (data.token) {
                // Successful registration
                Cookies.set('jwt_token', data.token, { expires: 30 })
                setJwtToken(data.token)
                alert(data.message || 'User Registered Successfully')
                navigate('/', { replace: true })
            } else {
                throw new Error(data.message || 'Registration failed')
            }
        } catch (error) {
            console.error('SignUp Error:', error)
            setFormError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="sign-up-page-main-container">
            <div className="sign-up-card-wrapper">
                <div className="sign-up-page-header">
                    <h1>Create Account</h1>
                    <p className="header-subtitle">Join ShipKart for fast and reliable services</p>
                </div>
                <div className="sign-up-page-form-container">
                    {formError && <div className="form-error-banner">{formError}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={handleNameChange}
                                className={usernameError ? 'input-error' : ''}
                                required
                            />
                            {usernameError && <p className="error-message">{usernameError}</p>}
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={handleEmailChange}
                                className={emailError ? 'input-error' : ''}
                                required
                            />
                            {emailError && <p className="error-message">{emailError}</p>}
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={handlePasswordChange}
                                className={passwordError ? 'input-error' : ''}
                                required
                            />
                            {passwordError && <p className="error-message">{passwordError}</p>}
                        </div>

                        <div className="input-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className={confirmPasswordError ? 'input-error' : ''}
                                required
                            />
                            {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
                        </div>

                        <button
                            type="submit"
                            className={`sign-up-button ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>
                </div>
                <div className="sign-up-page-footer">
                    <p>Already have an account? <Link to="/">Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage
