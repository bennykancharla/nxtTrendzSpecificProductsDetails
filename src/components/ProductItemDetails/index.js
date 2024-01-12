// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

class ProductItemDetails extends Component {
  state = {
    productCard: [],
    similarProducts: [],
    quantity: 1,
    isDataFetched: true,
    isInProgress: false,
  }

  componentDidMount() {
    this.getProductItem()
  }

  getProductItem = async () => {
    this.setState({isInProgress: true})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      //   console.log(data)
      const updatedProductData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        description: data.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        similarProducts: data.similar_products,
      }
      //   console.log(updatedProductData)
      const updatedSimilarProducts = updatedProductData.similarProducts.map(
        eachProduct => ({
          id: eachProduct.id,
          imageUrl: eachProduct.image_url,
          title: eachProduct.title,
          style: eachProduct.style,
          price: eachProduct.price,
          description: eachProduct.description,
          brand: eachProduct.brand,
          totalReviews: eachProduct.total_reviews,
          rating: eachProduct.rating,
          availability: eachProduct.availability,
        }),
      )

      this.setState({
        productCard: updatedProductData,
        similarProducts: updatedSimilarProducts,
        isDataFetched: true,
        isInProgress: false,
      })
    } else {
      this.setState({isDataFetched: false, isInProgress: false})
    }
  }

  onDecreaseQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prev => ({
        quantity: prev.quantity - 1,
      }))
    }
  }

  onIncreaseQuantity = () => {
    this.setState(prev => ({
      quantity: prev.quantity + 1,
    }))
  }

  getProductCard = () => {
    const {productCard, quantity, isInProgress} = this.state
    const {
      imageUrl,
      title,
      price,
      description,
      rating,
      brand,
      totalReviews,
      availability,
    } = productCard
    // console.log(productCard.title)

    return isInProgress ? (
      <div className="products-loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    ) : (
      <>
        <img src={imageUrl} alt="product" className="product-image" />

        <div className="details-container">
          <h1>{title}</h1>
          <p>Rs {price}/-</p>
          <div className="rating-review-container">
            <p className="rating-para">
              {rating}{' '}
              <span>
                <img
                  className="star-image"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                />
              </span>
            </p>
            <p>{totalReviews} Reviews</p>
          </div>
          <p className="product-desc">{description}</p>
          <p>
            <span> Available:</span> {availability}
          </p>
          <p>
            <span> Brand: </span>
            {brand}
          </p>
          <div className="quantity-container">
            {/* eslint-disable-next-line */}
            <button
              type="button"
              data-testid="minus"
              className="quantity-btn"
              onClick={this.onDecreaseQuantity}
            >
              <BsDashSquare />
            </button>

            <p>{quantity}</p>
            {/* eslint-disable-next-line */}
            <button
              type="button"
              onClick={this.onIncreaseQuantity}
              className="quantity-btn"
              data-testid="plus"
            >
              <BsPlusSquare />
            </button>
          </div>
          <button type="button" className="add-to-btn">
            ADD TO CART
          </button>
        </div>
      </>
    )
  }

  //   getSimilarProduct = eachData => {
  //     const {imageUrl, title, brand, rating, price} = eachData
  //     return (
  //       <div className="each-similar-container">
  //         <img
  //           src={imageUrl}
  //           alt={`similar product ${title}`}
  //           className="similar-image"
  //         />
  //         <h5 className="similar-title">{title}</h5>
  //         <p className="similar-para">by {brand}</p>
  //         <div className="similar-price-rating-container">
  //           <p>Rs {price}</p>
  //           <p className="similar-rating-para">
  //             {rating}{' '}
  //             <span>
  //               <img
  //                 className="star-image"
  //                 src="https://assets.ccbp.in/frontend/react-js/star-img.png"
  //                 alt="star"
  //               />
  //             </span>
  //           </p>
  //         </div>
  //       </div>
  //     )
  //   }

  onClickContinue = () => {
    const {history} = this.props
    history.replace('/products')
  }

  render() {
    const {similarProducts, isDataFetched} = this.state
    return (
      <>
        <Header />

        {isDataFetched ? (
          <div className="main-bg">
            <div className="each-product-container">
              {this.getProductCard()}
            </div>
            <div className="similar-products-container">
              <h1>Similar Products</h1>
              <ul className="similar-product-list">
                {similarProducts.map(eachProduct => (
                  <SimilarProductItem
                    key={eachProduct.id}
                    similarDetails={eachProduct}
                  />
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="not-found-bg">
            <img
              className="not-found-image"
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
              alt="failure view"
            />
            <h1 className="not-found-heading">Product Not Found</h1>

            <button
              type="button"
              className="continue-btn"
              onClick={this.onClickContinue}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(ProductItemDetails)
