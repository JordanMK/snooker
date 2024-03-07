export default function Footer() {
    return <>
        <footer className="site-footer" style={{
                backgroundColor:'#1f2121',
                padding: "10px",
                fontSize: "15px",
                lineHeight: "24px",
                color: "#e8ebea",
                boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
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