import './index.css'

const HomePageFeature = (props) => {
    const { heading, image, navigateTo } = props
    return (
        <button className="home-page-feature-container" onClick={navigateTo}>
            <h1 className="feature-heading">{heading}</h1>
            <img src={image} alt={heading} className="feature-image" />
        </button>
    )
}

export default HomePageFeature