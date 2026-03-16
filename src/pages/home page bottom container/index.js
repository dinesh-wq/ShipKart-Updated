import './index.css'
import HomePageFeature from '../../components/homepage feature'
import { useNavigate } from 'react-router-dom'

const homePageFeaturesData = [
    {
        heading: "Track Package",
        image: "delivery package image.png"
    },
    {
        heading: "Delivery Price Calculator",
        image: "delivery price caluculator image.png"
    },
    {
        heading: "Book a Delivery",
        image: "book delivery image.png"
    }
]
const HomeBottomContainer = () => {
    const navigate = useNavigate()
    return (
        <div className="home-page-bottom-container">
            {homePageFeaturesData.map((feature) => (
                <HomePageFeature key={feature.heading} heading={feature.heading} image={feature.image} navigateTo={() => navigate('/booking')} />
            ))}
        </div>
    )
}

export default HomeBottomContainer
