import React from "react"
import "./components.css";
import Image from 'next/image'
import snooker from "../public/snooker.png"

const TELEPHONE = "0473 79 73 50"
const EDGES_PADDING = 18

export default function Footer() {
  return <footer>
    <div className="d-flex justify-content-between">

      <section className="d-flex justify-content-center align-items-center" style={{paddingLeft: EDGES_PADDING}}>
        <Image
          src={snooker}
          width={110}
          alt="Picture of the author"
        />
      </section>

      <section id="address">
        <h3>Snooker Pocket</h3>
        <p>Hoogstraat 78</p>
        <p>8540 Deerlijk</p>
        <a href={`tel:${TELEPHONE}`}>{TELEPHONE}</a>
      </section>

      <div style={{paddingRight: EDGES_PADDING}}>
        <h3>Volg ons</h3>
        <span>
          Via onze <a href="https://www.facebook.com/Snooker-Pocket-790776524369943" target="_blank">facebookpagina</a> houden we je
          op de hoogte van alle updates en nieuwtjes
        </span>
      </div>

    </div>

    <section className="subfooter">
      <div className="uk-container">
        <div className="uk-grid">
          <div className="uk-width-1-2@s uk-text-left@s">
            <p>© 2020 Snooker Pocket</p>
          </div>
        </div>
      </div>
    </section>

  </footer>
}
