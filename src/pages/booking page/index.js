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

    const scheduleDelivery = async (e) => {
        e.preventDefault()
        const { pickupAddress, pickupPincode, landmark: pickupLandmark, pickupDateTime, phoneNumber } = pickupDetails
        const { deliveryAddress, deliveryPincode, landmark: deliveryLandmark, receiverPhoneNumber } = deliveryDetails
        const { itemName, itemWeight, itemCondition } = itemDetails

        if (pickupAddress === "" || pickupPincode === "" || pickupLandmark === "" || pickupDateTime === "" || phoneNumber === "" ||
            deliveryAddress === "" || deliveryPincode === "" || deliveryLandmark === "" || receiverPhoneNumber === "" ||
            itemName === "" || itemWeight === "" || itemCondition === "") {
            alert("Please fill all the details")
            return
        }

        try {
            const response = await fetch('https://shipkart-updated-backend-1.onrender.com/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: "64bd9e69-c4d6-43ff-a4fc-fd13d27a79b3",
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

            if (!response.ok) {
                throw new Error(`Failed to schedule delivery: ${response.statusText}`);
            }

            const data = await response.json()
            console.log(data)
            alert("Order Scheduled Successfully")
            setPickupDetails({
                pickupAddress: '',
                pickupPincode: '',
                landmark: '',
                pickupDateTime: '',
                phoneNumber: ''
            })
            setDeliveryDetails({
                deliveryAddress: '',
                deliveryPincode: '',
                landmark: '',
                receiverPhoneNumber: ''
            })
            setItemDetails({
                itemName: '',
                itemWeight: '',
                itemCondition: ''
            })
            setPickupDetailsErrors({
                pickupAddressError: '',
                pickupPincodeError: '',
                landmarkError: '',
                pickupDateTimeError: '',
                phoneNumberError: ''
            })
            setDeliveryDetailsErrors({
                deliveryAddressError: '',
                deliveryPincodeError: '',
                landmarkError: '',
                receiverPhoneNumberError: ''
            })
            setItemDetailsErrors({
                itemNameError: '',
                itemWeightError: '',
                itemConditionError: ''
            })
        } catch (error) {
            console.log(`Error in scheduleDelivery: ${error.message}`)
            alert("Something went wrong. Please try again.")
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
                            <input type="text" placeholder="Pickup Address" className="booking-page-form-input" name='pickupAddress' value={pickupDetails.pickupAddress} err="pickupAddressError" onChange={updatePickupDetails} required />
                            <p className="booking-page-error-message">{pickupDetailsErrors.pickupAddressError}</p>
                            <input type="text" maxLength={6} pattern='[0-9]{6}' placeholder="Pickup Pincode" name="pickupPincode" value={pickupDetails.pickupPincode} err="pickupPincodeError" className="booking-page-form-input" onChange={updatePickupDetails} required />
                            <p className="booking-page-error-message">{pickupDetailsErrors.pickupPincodeError}</p>
                            <input type="text" placeholder="Landmark" className="booking-page-form-input" name="landmark" value={pickupDetails.landmark} err="landmarkError" onChange={updatePickupDetails} required />
                            <p className="booking-page-error-message">{pickupDetailsErrors.landmarkError}</p>
                            <input type="datetime-local" placeholder="Pickup Date&Time" className="booking-page-form-input" name="pickupDateTime" value={pickupDetails.pickupDateTime} err="pickupDateTimeError" onChange={updatePickupDetails} required />
                            <p className="booking-page-error-message">{pickupDetailsErrors.pickupDateTimeError}</p>
                            <input type="text" maxLength={10} pattern='[0-9]{10}' placeholder="Phone Number" className="booking-page-form-input" name="phoneNumber" value={pickupDetails.phoneNumber} err="phoneNumberError" onChange={updatePickupDetails} required />
                            <p className="booking-page-error-message">{pickupDetailsErrors.phoneNumberError}</p>
                        </form>
                    </div>
                    <div className="delivery-schedule-container">
                        <div className="delivery-schedule-forms-container">
                            <form className="booking-page-form">
                                <input type="text" placeholder="Delivery Address" name="deliveryAddress" value={deliveryDetails.deliveryAddress} err="deliveryAddressError" className="booking-page-form-input" onChange={updateDeliveryDetails} required />
                                <p className="booking-page-error-message">{deliveryDetailsErrors.deliveryAddressError}</p>
                                <input type="text" minLength={6} maxLength={6} placeholder="Delivery Pincode" name="deliveryPincode" value={deliveryDetails.deliveryPincode} err="deliveryPincodeError" className="booking-page-form-input" onChange={updateDeliveryDetails} required />
                                <p className="booking-page-error-message">{deliveryDetailsErrors.deliveryPincodeError}</p>
                                <input type="text" placeholder="Landmark" name="landmark" value={deliveryDetails.landmark} err="landmarkError" className="booking-page-form-input" onChange={updateDeliveryDetails} required />
                                <p className="booking-page-error-message">{deliveryDetailsErrors.landmarkError}</p>
                                <input type="text" minLength={10} maxLength={10} placeholder="Receiver's Phone Number" name="receiverPhoneNumber" value={deliveryDetails.receiverPhoneNumber} err="receiverPhoneNumberError" className="booking-page-form-input" onChange={updateDeliveryDetails} required />
                                <p className="booking-page-error-message">{deliveryDetailsErrors.receiverPhoneNumberError}</p>
                            </form>
                            <form className="booking-page-form">
                                <input type="text" placeholder="Item Name" name="itemName" value={itemDetails.itemName} err="itemNameError" className="booking-page-form-input" onChange={updateItemDetails} required />
                                <p className="booking-page-error-message">{itemDetailsErrors.itemNameError}</p>
                                <input type="number" minLength={1} maxLength={3} placeholder="Item Weight" name="itemWeight" value={itemDetails.itemWeight} err="itemWeightError" className="booking-page-form-input" onChange={updateItemDetails} required />
                                <p className="booking-page-error-message">{itemDetailsErrors.itemWeightError}</p>
                                <select name="itemCondition" value={itemDetails.itemCondition} err="itemConditionError" className="booking-page-form-input" onChange={updateItemDetails} required>
                                    <option value="">Select Item Condition</option>
                                    <option value="good">Good</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="poor">Poor</option>
                                </select>
                                <p className="booking-page-error-message">{itemDetailsErrors.itemConditionError}</p>
                            </form>
                        </div>
                        <button className="schedule-button" onClick={scheduleDelivery}>Schedule Delivery</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingPage