import { useState } from "react"
import { Link } from "react-router-dom"
import "./SubNavbar.css"

export default function SubNavbar({ activeCategory, setActiveCategory, searchInputValue, handleOnSearchInputChange }) {
  const [open, setOpen] = useState(true)

  const toggleOpen = () => setOpen((isOpen) => setOpen(!isOpen))

  return (
    <nav className="SubNavbar">
      <div className="content">
        <div className="row">
          <div className="search-bar">
            <input
              type="text"
              name="search"
              placeholder="Search"
              value={searchInputValue}
              onChange={handleOnSearchInputChange}
            />
            <i className="material-icons">search</i>
          </div>

          <div className="links">
            <span className="help">
              <i className="material-icons">help</i>
              Help
            </span>

            <div className="cart">
              <Link to="/">
                My Cart
                <i className="material-icons">shopping_cart</i>
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="hamburger-menu">
            <i className="material-icons" onClick={() => toggleOpen()}>
              menu
            </i>
          </div>

          <ul className={`category-menu ${open ? `open` : `closed`}`}>
            {["All Categories", "Clothing", "Food", "Accessories", "Tech"].map((cat) => (
              <li className={activeCategory === cat ? "is-active" : ""} key={cat}>
                <button onClick={() => setActiveCategory(cat)}>{cat}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
