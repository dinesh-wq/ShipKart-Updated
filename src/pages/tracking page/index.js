import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'
import PackageStatus from '../../components/packageStatus'
import { JwtTokenContext } from '../../App'
import { jwtDecode } from 'jwt-decode'

const TrackingPage = () => {
    const navigate = useNavigate()
    const { jwtToken } = useContext(JwtTokenContext)
    const decodedToken = jwtDecode(jwtToken)
    const user_id = decodedToken.user_id
    const [allPackagesDetails, setAllPackagesDetails] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const getPackagesDetails = async () => {
            try {
                const response = await fetch(`https://shipkart-updated-backend-1.onrender.com/users/${user_id}/orders`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const contentType = response.headers.get("content-type");
                if (!response.ok || !contentType || !contentType.includes("application/json")) {
                    const errorText = await response.text();
                    console.error('Server error response:', errorText);
                    throw new Error(`Server returned ${response.status}. Expected JSON but got ${contentType || 'unknown'}.`);
                }

                const data = await response.json()
                setAllPackagesDetails(data)
            } catch (error) {
                setError(error.message)
            }
        }

        getPackagesDetails()
    }, [])

    return (
        <div className='tracking-page-container'>
            <div className="tracking-page-header-container">
                <h1 className="tracking-page-heading">Tracking Page</h1>
                <button className="back-button" onClick={() => navigate('/')}>Back</button>
            </div>
            <div className='tracking-page-packages-header-container'>
                <h1 className='tracking-page-packages-header-item-name'>Item Name</h1>
                <h1 className='tracking-page-packages-header-item-weight'>Item Weight</h1>
                <h1 className='tracking-page-packages-header-item-condition'>Item Condition</h1>
                <h1 className='tracking-page-packages-header-delivery-agent-name'>Delivery Agent Name</h1>
                <h1 className='tracking-page-packages-header-delivery-agent-phone-number'>Delivery Agent Phone Number</h1>
            </div>
            {error && <p className='error-message'>Error: {error}</p>}
            {allPackagesDetails.map(eachPackage => (
                <PackageStatus key={eachPackage.id} itemDetails={eachPackage} />
            ))}
        </div>
    )
}

export default TrackingPage
