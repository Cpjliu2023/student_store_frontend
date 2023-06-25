import Footer from "../Footer/Footer"
import "./NotFound.css"

export default function NotFound({ user }) {
  return (
    <div className="NotFound">
      <div className="cta">
        <h1>404</h1>
        <p>That page does not exist</p>
      </div>

      <Footer />
    </div>
  )
}
