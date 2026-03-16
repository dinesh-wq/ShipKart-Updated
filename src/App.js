import './App.css'
import HomePageFeature from './components/homepage feature'

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

const App = () => {
  return (
    <div className="background-container">
      <div className="main-container">
        <div className="home-page-top-container shadow-sm">
          <div className="home-page-profile-container">
            <img src="ShipKart logo design.png" alt="website-logo" className="shipkart-logo" />
            <h1>Welcome Guest</h1>
          </div>
          <div className="home-page-card-container">
            <div className="home-page-card-data">
              <h1 className="shipkart-card-heading">Welcome to <span className="shipkart-card-heading-span">ShipKart</span></h1>
              <p className="shipkart-card-description">Fast and Reliable Delivery Services</p>
            </div>
            <img src="shipkart delivery image.png" alt="shipkart delivery image" className="shipkart-card-delivery-image" />
          </div>
        </div>
        <div className="home-page-bottom-container">
          {homePageFeaturesData.map((feature) => (
            <HomePageFeature key={feature.heading} heading={feature.heading} image={feature.image} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App