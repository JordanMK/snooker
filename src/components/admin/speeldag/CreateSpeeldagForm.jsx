'use client'
import React from 'react';
export default function SpeelDagForm(){
    function handleForm(formData){
        const schiftingsvraag = formData.get('schiftingsvraag');
        const schiftingsantwoord = formData.get('schiftingsantwoord');
        console.log(schiftingsvraag, schiftingsantwoord);
        }
        const handleSubmit = (e) => {
            e.preventDefault();
        
            const form = e.target;
            const formData = new FormData(form);
        
            handleForm(formData);
          };
    return(
        <>
            <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="schiftingsvraag">schiftingsvraag</label>
            <input name="schiftingsvraag" type="text" className="form-control" id="schiftingsvraag" placeholder="Name" />
        </div>
        <div className="form-group">
            <label htmlFor="schiftingsantwoord">schiftingsantwoord</label>
            <input name="schiftingsantwoord" type="text" className="form-control" id="schiftingsantwoord" placeholder="Date" />
        </div>
        <div className="form-group">
            <input type="submit" value="Nieuw speeldag"/>
        </div>
    </form>
        </>
    )
    
}