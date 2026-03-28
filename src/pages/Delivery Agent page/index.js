import './index.css'
import { useState, useEffect } from 'react'
import DeliveryAgentOrder from '../../components/delivery agent page order'

const DeliveryAgentPage = () => {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('https://shipkart-updated-backend-1.onrender.com/orders')
            const data = await response.json()
            setOrders(data)
        }
        fetchOrders()
    }, [])
    return (
        <div className="delivery-agent-page-main-container">
            <div className="delivery-agent-header">
                <h1>Welcome Agent</h1>
            </div>
            <div className="orders-status-container">
                <div className="total-orders-status">
                    <h1>Total Orders</h1>
                    <p>19</p>
                </div>
                <div className="orders-not-collected-status">
                    <h1>Orders not Collected</h1>
                    <p>10</p>
                </div>
                <div className="on-the-way-status">
                    <h1>On The Way</h1>
                    <p>5</p>
                </div>
                <div className="out-for-delivery-status">
                    <h1>Out for Delivery</h1>
                    <p>4</p>
                </div>
            </div>
            <div className="orders-container">
                {orders.map((order) => (
                    <DeliveryAgentOrder key={order.order_id} orderDetails={order} />
                ))}
            </div>
        </div>
    )
}

export default DeliveryAgentPage