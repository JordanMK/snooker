import React from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
    /*moet nog backend maken*/

    //form om email in te vullen
    return <>
    <div>
      <form /*onSubmit={functie aanmaken}*/ className="reset-password">
        <h1>Wachtwoord vergeten</h1>
        <div>
          <label htmlFor="email">Email Adres</label>
          <input type="email" name="email" id="email" placeholder="jou email adres" value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button name="reset-pwd-button" className="reset-pwd">
        
        </button>
      </form>
    </div>
    </>
}