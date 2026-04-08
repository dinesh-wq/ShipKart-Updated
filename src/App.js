import './App.css'
import Cookies from 'js-cookie'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy, useState, createContext } from 'react'
import { jwtDecode } from 'jwt-decode'
import LoadingPage from './pages/loading page'

const BookingPage = lazy(() => import('./pages/booking page'))
const TrackingPage = lazy(() => import('./pages/tracking page'))
const DeliveryPriceCalculatorPage = lazy(() => import('./pages/Delivery Price Calculator page'))
const DeliveryAgentPage = lazy(() => import('./pages/Delivery Agent page'))
const LoginPage = lazy(() => import('./pages/login page'))
const SignUpPage = lazy(() => import('./pages/sign up page'))
const HomeBottomContainer = lazy(() => import('./pages/home page bottom container'))

export const JwtTokenContext = createContext()

const App = () => {
  const [jwtToken, setJwtToken] = useState(Cookies.get('jwt_token'))

  let username = 'Guest'
  if (jwtToken) {
    try {
      const decoded = jwtDecode(jwtToken)
      username = decoded.username || decoded.name || 'Guest'
    } catch (error) {
      console.error('Invalid token:', error)
    }
  }

  return (
    <JwtTokenContext.Provider value={{ jwtToken, setJwtToken }}>
      <BrowserRouter>
        <Suspense fallback={<LoadingPage />}>
          {!jwtToken ? (
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/signUpPage" element={<SignUpPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          ) : (
            <div className="background-container">
              <div className="main-container">
                <div className="home-page-top-container shadow-sm">
                  <div className="home-page-profile-container">
                    <img src="ShipKart logo design.png" alt="website-logo" className="shipkart-logo" />
                    <h1>Welcome {username}</h1>
                  </div>
                  <div className="home-page-card-container">
                    <div className="home-page-card-data">
                      <h1 className="shipkart-card-heading">
                        Welcome to <span className="shipkart-card-heading-span">ShipKart</span>
                      </h1>
                      <p className="shipkart-card-description">Fast and Reliable Delivery Services</p>
                    </div>
                    <img src="shipkart delivery image.png" alt="shipkart delivery" className="shipkart-card-delivery-image" />
                  </div>
                </div>
                <Routes>
                  <Route path="/" element={<HomeBottomContainer />} />
                  <Route path="/booking" element={<BookingPage />} />
                  <Route path="/tracking" element={<TrackingPage />} />
                  <Route path="/deliveryPriceCalculator" element={<DeliveryPriceCalculatorPage />} />
                  <Route path="/deliveryAgentPage" element={<DeliveryAgentPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </div>
          )}
        </Suspense>
      </BrowserRouter>
    </JwtTokenContext.Provider>
  )
}

export default App