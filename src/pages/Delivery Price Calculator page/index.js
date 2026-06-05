import React, { useState } from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'

const DeliveryPriceCalculatorPage = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        originAddress: '',
        destinationAddress: '',
        weight: '',
        dimensions: ''
    })
    const [price, setPrice] = useState(null)
    const [calculating, setCalculating] = useState(false)

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    const handleCalculate = (e) => {
        e.preventDefault()
        if (!formData.originAddress || !formData.destinationAddress || !formData.weight) {
            alert('Please fill in all required fields')
            return
        }

        setCalculating(true)
        // Simulate a calculation delay
        setTimeout(() => {
            const basePrice = 50
            const weightFactor = parseFloat(formData.weight) || 0
            const calculatedPrice = (basePrice + (weightFactor * 10)).toFixed(2)
            setPrice(calculatedPrice)
            setCalculating(false)
        }, 800)
    }

    return (
        <div className="calculator-container">
            <header className="calculator-header">
                <div className="header-content">
                    <h1 className="title">Delivery Price Calculator</h1>
                    <button className="back-btn" onClick={() => navigate('/')}>
                        <span>←</span> Back
                    </button>

                </div>
            </header>

            <main className="calculator-main">
                <section className="form-card">
                    <div className="card-header">
                        <h2>Shipment Details</h2>
                        <p>Enter your package details to get an estimated delivery cost.</p>
                    </div>

                    <form className="calculator-form" onSubmit={handleCalculate}>
                        <div className="form-grid">
                            <div className="input-group full-width">
                                <label htmlFor="originAddress">Origin Address</label>
                                <input
                                    type="text"
                                    id="originAddress"
                                    placeholder="Enter origin city or address"
                                    value={formData.originAddress}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group full-width">
                                <label htmlFor="destinationAddress">Destination Address</label>
                                <input
                                    type="text"
                                    id="destinationAddress"
                                    placeholder="Enter destination city or address"
                                    value={formData.destinationAddress}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="weight">Weight (kg)</label>
                                <input
                                    type="number"
                                    id="weight"
                                    placeholder="e.g. 5.5"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="dimensions">Dimensions (LxWxH cm)</label>
                                <input
                                    type="text"
                                    id="dimensions"
                                    placeholder="e.g. 20x15x10"
                                    value={formData.dimensions}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button type="submit" className="calculate-btn" disabled={calculating}>
                            {calculating ? 'Calculating...' : 'Calculate Estimate'}
                        </button>
                    </form>

                    {price && (
                        <div className="price-result animate-fade-in">
                            <div className="result-divider"></div>
                            <h3>Estimated Delivery Price</h3>
                            <div className="price-value">
                                <span className="currency">₹</span>
                                <span className="amount">{price}</span>
                            </div>
                            <p className="price-note">*Final price may vary based on actual weight and dimensions at pickup.</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}

export default DeliveryPriceCalculatorPage
