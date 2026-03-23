import './index.css'
import { useState } from 'react'

const PackageStatus = (props) => {
    const [isDeliveryStatusDisplaying, setIsDeliveryStatusDisplaying] = useState(false)
    const { itemDetails } = props

    if (!itemDetails) return null

    const { item_name, item_weight, item_condition, delivery_agent_name, delivery_agent_phone_number, delivery_status } = itemDetails

    return (
        <div className="package-status-container">
            <div className="package-status-header">
                <p className="package-status-item-name">{item_name}</p>
                <p className="package-status-item-weight">{item_weight}</p>
                <p className="package-status-item-condition">{item_condition}</p>
                <p className="package-status-delivery-agent-name">{delivery_agent_name}</p>
                <p className="package-status-delivery-agent-phone-number">{delivery_agent_phone_number}</p>
                <button className="package-status-button" onClick={() => setIsDeliveryStatusDisplaying(!isDeliveryStatusDisplaying)}>
                    {isDeliveryStatusDisplaying ? 'Hide Delivery Status' : 'Show Delivery Status'}
                </button>
            </div>
            {isDeliveryStatusDisplaying && (
                <div className="package-status-body">
                    <p>Delivery Status: {delivery_status}</p>
                </div>
            )}
        </div>
    )
}

export default PackageStatus
