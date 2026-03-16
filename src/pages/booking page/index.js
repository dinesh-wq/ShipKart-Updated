import './index.css'
import { useNavigate } from 'react-router-dom'

const BookingPage = () => {
    const navigate = useNavigate()
    return (
        <div className="booking-page-background-container">
            <div className="booking-page-main-container">
                <div className="booking-page-header-container">
                    <h1 className="booking-page-heading">Booking Page</h1>
                    <button className="back-button" onClick={() => navigate('/')}>Back</button>
                </div>
                <div className="booking-page-forms-container">
                    <div className="booking-page-form-container">
                        <h2 className="booking-page-form-heading">Pickup Details</h2>
                        <form className="booking-page-form">
                            <input type="text" placeholder="Pickup Address" className="booking-page-form-input" />
                            <input type="text" maxLength={6} pattern='[0-9] {6}' placeholder="Pickup Pincode" className="booking-page-form-input" />
                            <input type="text" placeholder="Landmark" className="booking-page-form-input" />
                            <input type="datetime-local" placeholder="Pickup Date&Time" className="booking-page-form-input" />
                            <input type="tel" minLength={10} maxLength={10} placeholder="Phone Number" className="booking-page-form-input" />
                        </form>
                    </div>
                    <div className="delivery-schedule-container">
                        <div className="delivery-schedule-forms-container">
                            <form className="booking-page-form">
                                <input type="text" placeholder="Delivery Address" className="booking-page-form-input" />
                                <input type="number" minLength={6} maxLength={6} placeholder="Delivery Pincode" className="booking-page-form-input" />
                                <input type="text" placeholder="Landmark" className="booking-page-form-input" />
                                <input type="tel" minLength={10} maxLength={10} placeholder="Receiver's Phone Number" className="booking-page-form-input" />
                            </form>
                            <form className="booking-page-form">
                                <input type="text" placeholder="Item Name" className="booking-page-form-input" />
                                <input type="number" minLength={1} maxLength={3} placeholder="Item Weight" className="booking-page-form-input" />
                                <input type="text" placeholder="Item Condition" className="booking-page-form-input" />
                            </form>
                        </div>
                        <button className="schedule-button">Schedule Delivery</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingPage