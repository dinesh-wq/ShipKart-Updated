import './index.css'

const HomePageFeature = (props) => {
    const { heading, image } = props
    return (
        <button className="home-page-feature-container">
            <h1 className="feature-heading">{heading}</h1>
            <img src={image} alt={heading} className="feature-image" />
        </button>
    )
}

export default HomePageFeature