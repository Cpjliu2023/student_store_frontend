import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Stars from "../Stars/Stars"
import NotFound from "../NotFound/NotFound"
import codepath from "../../assets/codepath.svg"
import { formatPrice } from "../../utils/format"
import axios from "axios"
import "./ProductDetail.css"

export default function ProductDetail({ getQuantityOfItemInCart, addToCart, removeFromCart }) {
  const { productId } = useParams()

  const [product, setProduct] = useState({})
  const [isFetching, setIsFetching] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      setIsFetching(true)

      try {
        const res = await axios.get(`https://student-store-backend.onrender.com/store/${productId}`)
        if (res?.data?.product) {
          setProduct(res.data.product)
        } else {
          setError("Something went wrong.")
        }
      } catch (err) {
        console.log(err)
        const message = err?.response?.data?.error?.message
        setError(message ?? String(err))
      } finally {
        setIsFetching(false)
        setHasFetched(true)
      }
    }

    if (productId) fetchProduct()
  }, [productId])

  const quantity = product?.name ? getQuantityOfItemInCart(product) : 0
  const handleAddToCart = () => (product?.name ? addToCart(product) : null)
  const handleRemoveFromCart = () => (product?.name ? removeFromCart(product) : null)

  if (hasFetched && !isFetching && !product?.name) return <NotFound />

  return (
    <div className="ProductDetail">
      {error ? <p className="is-danger">{error}</p> : null}
      {isFetching ? (
        <h1>Loading...</h1>
      ) : (
        <div className="product-card">
          <div className="media">
            {product.image ? (
              <img src={product.image} alt="product cover" />
            ) : (
              <img src={codepath} alt="product cover" />
            )}
          </div>
          <div className="product-info">
            <div className="info">
              <p className="product-name">{product.name}</p>
              <Stars rating={4.5} max={5} />
              <p className="product-price">{formatPrice(product.price)}</p>
            </div>
            <div className="desc">
              <p className="description">{product.description}</p>
            </div>
            <div className="actions">
              <div className="buttons">
                <i className="material-icons" onClick={handleAddToCart}>
                  add
                </i>
                <i className="material-icons" onClick={handleRemoveFromCart}>
                  remove
                </i>
              </div>

              {quantity ? (
                <span className="quantity">
                  <span className="amt">{quantity}</span>
                </span>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
