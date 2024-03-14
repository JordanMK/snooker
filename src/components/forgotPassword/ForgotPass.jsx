import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
    /*moet nog backend maken*/
    const email = "";

    //form om email in te vullen
    return <>
    <div className="container d-flex flex-column">
	    <div className="row justify-content-center align-items-center g-0 min-vh-100">
		      <div className="col-lg-5 col-md-8 py-8 py-xl-0 col-md-offset-4">
            
            <div className="card shadow">

              <div className="card-body p-6">

                <div className="mb-4 text-center">
                  <h3><i className="fa fa-lock fa-4x"></i></h3>
                  <h2>Wachtwoord vergeten?</h2>
                  <p>Vul de form in om je wachtwoord te wijzigen.</p>
                  <div className="panel-body">
    
                    <form id="register-form" role="form" autoComplete="off" className="form" method="post">
    
                      <div className="form-group">
                  
                          <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                          <input id="email" name="email" placeholder="voer email in" className="form-control"  type="email"/>
                      
                      </div>

                      <div className="mb-3 d-grid">
                        <input name="recover-submit" className="btn btn-lg btn-primary btn-block mt-3" value="Reset Password" type="submit"/>
                      </div>
                      
                      <span>Return to <a href="">login</a></span>
                    </form>
    
                  </div>
                </div>
              </div>
            </div>
          </div>
	      </div>
      </div>
    </>
}