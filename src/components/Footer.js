import '../app/page.module.css'


export default function Footer() {
    return <>
        <footer className="site-footer" style={{
              backgroundColor:'#26272b',
              padding: "45px",
  fontSize: "15px",
  lineHeight: "24px",
  color: "#737373",
  boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
        }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-12">
                        <p className="copyright-text">Copyright © 2020 All Rights Reserved by
                            <a href="#"><span className="logo"> VIVES.</span></a>
                        </p>
                    </div>
                
                </div>
            </div>
        </footer>
    </>
}