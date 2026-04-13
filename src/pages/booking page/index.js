import './index.css'
import { useNavigate } from 'react-router-dom'
import { useState, useContext, useMemo } from 'react'
import { JwtTokenContext } from '../../App'
import { jwtDecode } from 'jwt-decode'

const BookingPage = () => {
    const navigate = useNavigate()
    const { jwtToken } = useContext(JwtTokenContext)
    
    // Safely decode token and memoize the result
    const decodedToken = useMemo(() => {
        if (!jwtToken) return null
        try {
            return jwtDecode(jwtToken)
        } catch (error) {
            console.error('Invalid token:', error)
            return null
        }
    }, [jwtToken])

    const user_id = decodedToken?.user_id || decodedToken?.id || ''

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

    const [isLoading, setIsLoading] = useState(false)

    const updatePickupDetails = (e) => {
        const { name, value } = e.target
        const errKey = `${name}Error`
        
        setPickupDetails(prev => ({ ...prev, [name]: value }))
        
        if (value.trim() === "") {
            setPickupDetailsErrors(prev => ({ ...prev, [errKey]: `${name} is required` }))
        } else {
            setPickupDetailsErrors(prev => ({ ...prev, [errKey]: '' }))
        }
    }

    const updateDeliveryDetails = (e) => {
        const { name, value } = e.target
        const errKey = `${name}Error`
        
        setDeliveryDetails(prev => ({ ...prev, [name]: value }))
        
        if (value.trim() === "") {
            setDeliveryDetailsErrors(prev => ({ ...prev, [errKey]: `${name} is required` }))
        } else {
            setDeliveryDetailsErrors(prev => ({ ...prev, [errKey]: '' }))
        }
    }

    const updateItemDetails = (e) => {
        const { name, value } = e.target
        const errKey = `${name}Error`
        
        setItemDetails(prev => ({ ...prev, [name]: value }))
        
        if (value.trim() === "") {
            setItemDetailsErrors(prev => ({ ...prev, [errKey]: `${name} is required` }))
        } else {
            setItemDetailsErrors(prev => ({ ...prev, [errKey]: '' }))
        }
    }

    const validateForm = () => {
        const pValues = Object.values(pickupDetails)
        const dValues = Object.values(deliveryDetails)
        const iValues = Object.values(itemDetails)
        
        if (pValues.some(v => v === '') || dValues.some(v => v === '') || iValues.some(v => v === '')) {
            alert("Please fill all the details")
            return false
        }
        return true
    }

    const scheduleDelivery = async (e) => {
        e.preventDefault()
        
        if (!validateForm()) return
        if (!user_id) {
            alert("Session expired. Please login again.")
            navigate('/')
            return
        }

        try {
            setIsLoading(true)
            const response = await fetch('https://shipkart-updated-backend-1.onrender.com/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user_id,
                    pickup_address: pickupDetails.pickupAddress,
                    pickup_pincode: pickupDetails.pickupPincode,
                    pickup_landmark: pickupDetails.landmark,
                    pickup_date_time: new Date(pickupDetails.pickupDateTime).toISOString(),
                    user_phone_number: pickupDetails.phoneNumber,
                    receiver_address: deliveryDetails.deliveryAddress,
                    receiver_pincode: deliveryDetails.deliveryPincode,
                    receiver_landmark: deliveryDetails.landmark,
                    receiver_phone_number: deliveryDetails.receiverPhoneNumber,
                    item_name: itemDetails.itemName,
                    item_weight: Number(itemDetails.itemWeight),
                    item_condition: itemDetails.itemCondition,
                    delivery_agent_name: "Dinesh",
                    delivery_agent_phone_number: "9876543210",
                    delivery_status: "Delivery Agent on the way to pick the order"
                })
            })

            const contentType = response.headers.get("content-type");
            if (!response.ok) {
                const errorBody = contentType?.includes("application/json") ? await response.json() : await response.text();
                throw new Error(errorBody.message || `Server returned ${response.status}`);
            }

            alert("Order Scheduled Successfully")
            
            // Reset states
            setPickupDetails({ pickupAddress: '', pickupPincode: '', landmark: '', pickupDateTime: '', phoneNumber: '' })
            setDeliveryDetails({ deliveryAddress: '', deliveryPincode: '', landmark: '', receiverPhoneNumber: '' })
            setItemDetails({ itemName: '', itemWeight: '', itemCondition: '' })
            
            setPickupDetailsErrors({ pickupAddressError: '', pickupPincodeError: '', landmarkError: '', pickupDateTimeError: '', phoneNumberError: '' })
            setDeliveryDetailsErrors({ deliveryAddressError: '', deliveryPincodeError: '', landmarkError: '', receiverPhoneNumberError: '' })
            setItemDetailsErrors({ itemNameError: '', itemWeightError: '', itemConditionError: '' })
            
            navigate('/')
        } catch (error) {
            console.error(`Error in scheduleDelivery:`, error)
            alert(`Booking Error: ${error.message}`)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div className="booking-page-background-container">
            <div className="booking-page-main-container">
                <div className="booking-page-header-container">
                    <h1 className="booking-page-heading">Booking Page</h1>
                    <button className="back-button" onClick={() => navigate('/')}>Back</button>
                </div>
                
                <form className="booking-page-forms-container" onSubmit={scheduleDelivery}>
                    <div className="booking-page-form-container">
                        <h2 className="booking-page-form-heading">Pickup Details</h2>
                        <div className="booking-page-form">
                            <input type="text" placeholder="Pickup Address" className="booking-page-form-input" name='pickupAddress' value={pickupDetails.pickupAddress} onChange={updatePickupDetails} required />
                            <p className="booking-page-error-message">{pickupDetailsErrors.pickupAddressError}</p>
                            
                            <input type="text" maxLength={6} pattern='[0-9]{6}' placeholder="Pickup Pincode" name="pickupPincode" value={pickupDetails.pickupPincode} className="booking-page-form-input" onChange={updatePickupDetails} required />
                            <p className="booking-page-error-message">{pickupDetailsErrors.pickupPincodeError}</p>
                            
                            <input type="text" placeholder="Landmark" className="booking-page-form-input" name="landmark" value={pickupDetails.landmark} onChange={updatePickupDetails} required />
                            <p className="booking-page-error-message">{pickupDetailsErrors.landmarkError}</p>
                            
                            <input type="datetime-local" placeholder="Pickup Date-Time" className="booking-page-form-input" name="pickupDateTime" value={pickupDetails.pickupDateTime} onChange={updatePickupDetails} required />
                            <p className="booking-page-error-message">{pickupDetailsErrors.pickupDateTimeError}</p>
                            
                            <input type="text" maxLength={10} pattern='[0-9]{10}' placeholder="Phone Number" className="booking-page-form-input" name="phoneNumber" value={pickupDetails.phoneNumber} onChange={updatePickupDetails} required />
                            <p className="booking-page-error-message">{pickupDetailsErrors.phoneNumberError}</p>
                        </div>
                    </div>
                    
                    <div className="delivery-schedule-container">
                        <div className="delivery-schedule-forms-container">
                            <div className="booking-page-form">
                                <h2 className="booking-page-form-heading">Delivery Details</h2>
                                <input type="text" placeholder="Delivery Address" name="deliveryAddress" value={deliveryDetails.deliveryAddress} className="booking-page-form-input" onChange={updateDeliveryDetails} required />
                                <p className="booking-page-error-message">{deliveryDetailsErrors.deliveryAddressError}</p>
                                
                                <input type="text" minLength={6} maxLength={6} placeholder="Delivery Pincode" name="deliveryPincode" value={deliveryDetails.deliveryPincode} className="booking-page-form-input" onChange={updateDeliveryDetails} required />
                                <p className="booking-page-error-message">{deliveryDetailsErrors.deliveryPincodeError}</p>
                                
                                <input type="text" placeholder="Landmark" name="landmark" value={deliveryDetails.landmark} className="booking-page-form-input" onChange={updateDeliveryDetails} required />
                                <p className="booking-page-error-message">{deliveryDetailsErrors.landmarkError}</p>
                                
                                <input type="text" minLength={10} maxLength={10} placeholder="Receiver Phone" name="receiverPhoneNumber" value={deliveryDetails.receiverPhoneNumber} className="booking-page-form-input" onChange={updateDeliveryDetails} required />
                                <p className="booking-page-error-message">{deliveryDetailsErrors.receiverPhoneNumberError}</p>
                            </div>
                            
                            <div className="booking-page-form">
                                <h2 className="booking-page-form-heading">Item Details</h2>
                                <input type="text" placeholder="Item Name" name="itemName" value={itemDetails.itemName} className="booking-page-form-input" onChange={updateItemDetails} required />
                                <p className="booking-page-error-message">{itemDetailsErrors.itemNameError}</p>
                                
                                <input type="number" placeholder="Weight (kg)" name="itemWeight" value={itemDetails.itemWeight} className="booking-page-form-input" onChange={updateItemDetails} required />
                                <p className="booking-page-error-message">{itemDetailsErrors.itemWeightError}</p>
                                
                                <select name="itemCondition" value={itemDetails.itemCondition} className="booking-page-form-input" onChange={updateItemDetails} required>
                                    <option value="">Select Condition</option>
                                    <option value="good">Good</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="poor">Poor</option>
                                </select>
                                <p className="booking-page-error-message">{itemDetailsErrors.itemConditionError}</p>
                            </div>
                        </div>
                        <button type="submit" className="schedule-button" disabled={isLoading}>
                            {isLoading ? 'Scheduling...' : 'Schedule Delivery'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BookingPage