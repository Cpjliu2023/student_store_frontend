import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import Hero from "../Hero/Hero"
import ProductGrid from "../ProductGrid/ProductGrid"
import About from "../About/About"
import Contact from "../Contact/Contact"
import Footer from "../Footer/Footer"
import "./Home.css"

export default function Home({
  isFetching,
  products,
  addToCart,
  removeFromCart,
  searchInputValue,
  getQuantityOfItemInCart,
  activeCategory,
}) {
  const location = useLocation()

  useEffect(() => {
    // some silly react router magic to get hash links to work
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [location.hash])

  const productsByCategory =
    Boolean(activeCategory) && activeCategory.toLowerCase() !== "all categories"
      ? products.filter((p) => p.category === activeCategory.toLowerCase())
      : products

  const productsToShow = Boolean(searchInputValue)
    ? productsByCategory.filter((p) => p.name.toLowerCase().indexOf(searchInputValue.toLowerCase()) !== -1)
    : productsByCategory

  return (
    <div className="Home">
      <Hero />
      <About />
      <ProductGrid
        products={productsToShow}
        isFetching={isFetching}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        getQuantityOfItemInCart={getQuantityOfItemInCart}
      />
      <Contact />
      <Footer />
    </div>
  )
}
