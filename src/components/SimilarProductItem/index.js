// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {similarDetails} = props
  const {imageUrl, title, brand, rating, price} = similarDetails
  return (
    <li className="each-similar-container">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="similar-image"
      />
      <h5 className="similar-title">{title}</h5>
      <p className="similar-para">by {brand}</p>
      <div className="similar-price-rating-container">
        <p>Rs {price}</p>
        <p className="similar-rating-para">
          {rating}{' '}
          <span>
            <img
              className="star-image"
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
            />
          </span>
        </p>
      </div>
    </li>
  )
}

export default SimilarProductItem
