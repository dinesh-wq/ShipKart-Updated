import './index.css'
import { useState, useEffect } from 'react'

const DeliveryAgentOrder = (props) => {
    const [isStatusDisplaying, setIsStatusDisplaying] = useState(false)
    const [status, setStatus] = useState("")
    const [displayAddress, setDisplayAddress] = useState(false)
    const { orderDetails } = props
    const { order_id, user_id, receiver_address, receiver_pincode, receiver_landmark, receiver_phone_number, item_name, item_condition, delivery_status } = orderDetails
    const updateStatus = (event) => {
        setStatus(event.target.value)
    }

    const [name, setName] = useState('')

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const response = await fetch(`https://shipkart-updated-backend-1.onrender.com/users/${user_id}`)
                const data = await response.json()
                setName(data.name || 'Unknown')
            } catch (error) {
                console.error('Error fetching user name:', error)
                setName('Unknown')
            }
        }
        fetchUserName()
    }, [user_id])

    const updateDeliveryStatus = async () => {
        const url = `https://shipkart-updated-backend-1.onrender.com/orders/${order_id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "delivery_status": status
            })
        }
        try {
            const response = await fetch(url, options)
            const data = await response.json()
            alert(data.message)
        } catch (error) {
            console.error('Error updating status:', error)
            alert('Failed to update status. Please try again.')
        }
    }

    useEffect(() => {
        if (orderDetails.delivery_status) {
            setStatus(orderDetails.delivery_status)
        }
    }, [orderDetails])

    return (
        <div className="delivery-agent-order-main-container">
            <div className='delivery-agent-order-card'>
                <p className="delivery-agent-order-card-text">Order ID: <span>{order_id}</span></p>
                <p className="delivery-agent-order-card-text">User ID: <span>{user_id}</span></p>
                <p className="delivery-agent-order-card-text">User Name: <span>{name}</span></p>
                <p className="delivery-agent-order-card-text">Item Name: <span>{item_name}</span></p>
                <p className="delivery-agent-order-card-text">Item Condition: <span>{item_condition}</span></p>
            </div>
            <div className='delivery-agent-order-card'>
                <button onClick={() => setDisplayAddress(!displayAddress)}>{displayAddress ? 'Hide Address' : 'Show Address'}</button>
                {displayAddress && (
                    <div className="status-update-container">
                        <p className="delivery-agent-order-card-text">Receiver Address: <span>{receiver_address}</span></p>
                        <p className="delivery-agent-order-card-text">Receiver Pincode: <span>{receiver_pincode}</span></p>
                        <p className="delivery-agent-order-card-text">Receiver Landmark: <span>{receiver_landmark}</span></p>
                        <p className="delivery-agent-order-card-text">Receiver Phone Number: <span>{receiver_phone_number}</span></p>
                    </div>
                )}
            </div>
            <div className="status-update-section">
                <button onClick={() => setIsStatusDisplaying(!isStatusDisplaying)}>{isStatusDisplaying ? 'Hide Status' : 'Show Status'}</button>
                {isStatusDisplaying && (
                    <div className="status-update-container">
                        <select onChange={updateStatus} value={status}>
                            <option value={delivery_status} selected disabled>{delivery_status}</option>
                            <option value="Delivery Agent has to collect">Delivery Agent has to collect</option>
                            <option value="On the way to customer">On the way to customer</option>
                            <option value="Out For Delivery">Out For Delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                        <button onClick={updateDeliveryStatus}>Update Status</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DeliveryAgentOrder