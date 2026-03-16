import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import LoadingPage from './pages/loading page'
import HomeBottomContainer from './pages/home page bottom container'
import BookingPage from './pages/booking page'

const homeBottomContainer = lazy(() => {
  return (
    () => {
      return (
        <HomeBottomContainer />
      )
    }
  )
})

const bookingPage = lazy(() => {
  return (
    () => {
      return (
        <BookingPage />
      )
    }
  )
})

const App = () => {
  return (
    <BrowserRouter>
      <div className="background-container">
        <div className="main-container">
          <div className="home-page-top-container shadow-sm">
            <div className="home-page-profile-container">
              <img src="ShipKart logo design.png" alt="website-logo" className="shipkart-logo" />
              <h1>Welcome Guest</h1>
            </div>
            <div className="home-page-card-container">
              <div className="home-page-card-data">
                <h1 className="shipkart-card-heading">Welcome to <span className="shipkart-card-heading-span">ShipKart</span></h1>
                <p className="shipkart-card-description">Fast and Reliable Delivery Services</p>
              </div>
              <img src="shipkart delivery image.png" alt="shipkart delivery" className="shipkart-card-delivery-image" />
            </div>
          </div>
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              <Route path="/" element={<HomeBottomContainer />} />
              <Route path="/booking" element={<BookingPage />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App