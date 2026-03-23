import './index.css'
import HomePageFeature from '../../components/homepage feature'
import { useNavigate } from 'react-router-dom'

const homePageFeaturesData = [
    {
        heading: "Track Package",
        image: "delivery package image.png",
        destination: "tracking"
    },
    {
        heading: "Delivery Price Calculator",
        image: "delivery price caluculator image.png",
        destination: "priceCalculator"
    },
    {
        heading: "Book a Delivery",
        image: "book delivery image.png",
        destination: "booking"
    }
]
const HomeBottomContainer = () => {
    const navigate = useNavigate()
    return (
        <div className="home-page-bottom-container">
            {homePageFeaturesData.map((feature) => (
                <HomePageFeature key={feature.heading} heading={feature.heading} image={feature.image} navigateTo={() => navigate(`/${feature.destination}`)} />
            ))}
        </div>
    )
}

export default HomeBottomContainer
