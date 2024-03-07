import "./components.css";


export default function Footer() {
    return <>
        <footer className="site-footer" style={{
                paddingLeft: "20px",
                fontSize: "15px",
                lineHeight: "24px",
                color: "#000000",
                position: "fixed",
                bottom: "0",
                width: "100%",
        }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-6 col-12">
                        <p className="copyright-text">Copyright © 2024 All Rights Reserved by 
                            <a href="https://www.vives.be/nl"><span className="logo">VIVES.</span></a>
                        </p>
                    </div>
                
                </div>
            </div>
        </footer>
    </>
}