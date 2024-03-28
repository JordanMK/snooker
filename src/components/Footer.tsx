import "./components.css";
import Image from 'next/image'
import snooker from '../images/snooker.png'

export default function Footer() {
    return <>
        <footer>
            <div className="footerFlex">
                <div className="imageFooter">
                    <Image
                        src={snooker}
                        width={110}
                        alt="Picture of the author"
                    />
                </div>
                <div id="address">
                    <h3>Snooker Pocket</h3>
                    <p>Hoogstraat 78</p>
                    <p>8540 Deerlijk</p>
                    <p>
                        <a href="tel:0473 79 73 50">0473 79 73 50</a>
                    </p>

                </div>
                <div className="">
                    <h3>Volg ons</h3>
                    <p>
                        Via onze
                        <a href="https://www.facebook.com/Snooker-Pocket-790776524369943" target="_blank"> facebookpagina </a>
                        houden we je op de hoogte van alle updates en nieuwtjes
                    </p>

                </div>
            </div>
            <div className="subfooter">
                <div className="uk-container">
                    <div className="uk-grid">
                        <div className="uk-width-1-2@s uk-text-left@s">
                            <p>© 2020 Snooker Pocket</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
}