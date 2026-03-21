import './index.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const BookingPage = () => {
    const navigate = useNavigate()
    const [pickupDetails, setPickupDetails] = useState({
        pickupAddress: '',
        pickupPincode: '',
        landmark: '',
        pickupDateTime: '',
        phoneNumber: ''
    })
    const [deliveryDetails, setDeliveryDetails] = useState({
        deliveryAddress: '',
        deliveryPincode: '',
        landmark: '',
        receiverPhoneNumber: ''
    })
    const [itemDetails, setItemDetails] = useState({
        itemName: '',
        itemWeight: '',
        itemCondition: ''
    })
    const [pickupDetailsErrors, setPickupDetailsErrors] = useState({
        pickupAddressError: '',
        pickupPincodeError: '',
        landmarkError: '',
        pickupDateTimeError: '',
        phoneNumberError: ''
    })
    const [deliveryDetailsErrors, setDeliveryDetailsErrors] = useState({
        deliveryAddressError: '',
        deliveryPincodeError: '',
        landmarkError: '',
        receiverPhoneNumberError: ''
    })
    const [itemDetailsErrors, setItemDetailsErrors] = useState({
        itemNameError: '',
        itemWeightError: '',
        itemConditionError: ''
    })

    const updatePickupDetails = (e) => {
        const { name, value } = e.target
        const err = e.target.getAttribute('err')
        setPickupDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }))
        if (value === "") {
            setPickupDetailsErrors(prevErrors => ({
                ...prevErrors,
                [err]: `${name} is required`
            }))
        } else {
            setPickupDetailsErrors(prevErrors => ({
                ...prevErrors,
                [err]: ''
            }))
        }
        console.log({ [name]: value, [err]: value })
    }

    const updateDeliveryDetails = (e) => {
        const { name, value } = e.target
        const err = e.target.getAttribute('err')
        setDeliveryDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }))
        if (value === "") {
            setDeliveryDetailsErrors(prevErrors => ({
                ...prevErrors,
                [err]: `${name} is required`
            }))
        } else {
            setDeliveryDetailsErrors(prevErrors => ({
                ...prevErrors,
                [err]: ''
            }))
        }
    }

    const updateItemDetails = (e) => {
        const { name, value } = e.target
        const err = e.target.getAttribute('err')
        setItemDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }))
        if (value === "") {
            setItemDetailsErrors(prevErrors => ({
                ...prevErrors,
                [err]: `${name} is required`
            }))
        } else {
            setItemDetailsErrors(prevErrors => ({
                ...prevErrors,
                [err]: ''
            }))
        }
    }



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
                            <input type="text" placeholder="Pickup Address" className="booking-page-form-input" name='pickupAddress' err="pickupAddressError" onChange={updatePickupDetails} />
                            <p className="error-message">{pickupDetailsErrors.pickupAddressError}</p>
                            <input type="number" maxLength={6} pattern='[0-9]{6}' placeholder="Pickup Pincode" name="pickupPincode" err="pickupPincodeError" className="booking-page-form-input" onChange={updatePickupDetails} />
                            <p className="error-message">{pickupDetailsErrors.pickupPincodeError}</p>
                            <input type="text" placeholder="Landmark" className="booking-page-form-input" name="landmark" err="landmarkError" onChange={updatePickupDetails} />
                            <p className="error-message">{pickupDetailsErrors.landmarkError}</p>
                            <input type="datetime-local" placeholder="Pickup Date&Time" className="booking-page-form-input" name="pickupDateTime" err="pickupDateTimeError" onChange={updatePickupDetails} />
                            <p className="error-message">{pickupDetailsErrors.pickupDateTimeError}</p>
                            <input type="" maxLength={10} pattern='[0-9]{10}' placeholder="Phone Number" className="booking-page-form-input" name="phoneNumber" err="phoneNumberError" onChange={updatePickupDetails} />
                            <p className="error-message">{pickupDetailsErrors.phoneNumberError}</p>
                        </form>
                    </div>
                    <div className="delivery-schedule-container">
                        <div className="delivery-schedule-forms-container">
                            <form className="booking-page-form">
                                <input type="text" placeholder="Delivery Address" name="deliveryAddress" err="deliveryAddressError" className="booking-page-form-input" onChange={updateDeliveryDetails} />
                                <p className="error-message">{deliveryDetailsErrors.deliveryAddressError}</p>
                                <input type="number" minLength={6} maxLength={6} placeholder="Delivery Pincode" name="deliveryPincode" err="deliveryPincodeError" className="booking-page-form-input" onChange={updateDeliveryDetails} />
                                <p className="error-message">{deliveryDetailsErrors.deliveryPincodeError}</p>
                                <input type="text" placeholder="Landmark" name="landmark" err="landmarkError" className="booking-page-form-input" onChange={updateDeliveryDetails} />
                                <p className="error-message">{deliveryDetailsErrors.landmarkError}</p>
                                <input type="tel" minLength={10} maxLength={10} placeholder="Receiver's Phone Number" name="receiverPhoneNumber" err="receiverPhoneNumberError" className="booking-page-form-input" onChange={updateDeliveryDetails} />
                                <p className="error-message">{deliveryDetailsErrors.receiverPhoneNumberError}</p>
                            </form>
                            <form className="booking-page-form">
                                <input type="text" placeholder="Item Name" name="itemName" err="itemNameError" className="booking-page-form-input" onChange={updateItemDetails} />
                                <p className="error-message">{itemDetailsErrors.itemNameError}</p>
                                <input type="number" minLength={1} maxLength={3} placeholder="Item Weight" name="itemWeight" err="itemWeightError" className="booking-page-form-input" onChange={updateItemDetails} />
                                <p className="error-message">{itemDetailsErrors.itemWeightError}</p>
                                <select name="itemCondition" err="itemConditionError" className="booking-page-form-input" onChange={updateItemDetails}>
                                    <option value="good">Good</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="poor">Poor</option>
                                </select>
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