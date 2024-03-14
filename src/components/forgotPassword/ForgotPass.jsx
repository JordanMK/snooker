import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
    /*moet nog backend maken*/
    const email = "";

    //form om email in te vullen
    return <>
    <div class="container d-flex flex-column">
	    <div class="row justify-content-center align-items-center g-0 min-vh-100">
		      <div class="col-lg-5 col-md-8 py-8 py-xl-0 col-md-offset-4">
            
            <div class="card shadow">

              <div class="card-body p-6">

                <div class="mb-4 text-center">
                  <h3><i class="fa fa-lock fa-4x"></i></h3>
                  <h2 class="text-center">Wachtwoord vergeten?</h2>
                  <p>Voer uw email in.</p>
                  <div class="panel-body">
    
                    <form id="register-form" role="form" autocomplete="off" class="form" method="post">
    
                      <div class="form-group">
                        <div class="input-group">
                          <span class="input-group-addon"><i class="glyphicon glyphicon-envelope color-blue"></i></span>
                          <input id="email" name="email" placeholder="email adres" class="form-control"  type="email"/>
                        </div>
                      </div>
                      <div class="form-group">
                        <input name="recover-submit" class="btn btn-lg btn-primary btn-block m-3" value="Reset Password" type="submit"/>
                      </div>
                      
                      <input type="hidden" class="hide" name="token" id="token" value=""/> 
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