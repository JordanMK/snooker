'use client'
import React from 'react';
export default function SeizoenForm(){
    function handleForm(formData){
        const naam = formData.get('naam');
        const bevriesKlassement = formData.get('bevriesKlassement');
        const startDatum = formData.get('startDatum');
        const startTijd = formData.get('startTijd');
        const eindDatum = formData.get('eindDatum');
        const eindTijd = formData.get('eindTijd');

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
            <label htmlFor="naam">Naam</label>
            <input name="naam" type="text" className="form-control" id="naam" placeholder="Name" />
        </div>
        <div className="form-group">
            <label htmlFor="bevriesKlassement">bevriesKlassement</label>
            <input name="bevriesKlassement" type="date" className="form-control" id="bevriesKlassement" placeholder="Date" />
        </div>
        <div className="form-group">
            <label htmlFor="startDatum">startDatum</label>
            <input name="startDatum" type="date" className="form-control" id="startDatum" placeholder="Time" />
        </div>
        <div className="form-group">
            <label htmlFor="startTijd">startTijd</label>
            <input name="startTijd" type="time" className="form-control" id="startTijd" placeholder="Time" />
        </div>
        <div className="form-group">
            <label htmlFor="eindDatum">eindDatum</label>
            <input name="eindDatum" type="date" className="form-control" id="eindDatum" placeholder="Time" />
        </div>
        <div className="form-group">
            <label htmlFor="eindTijd">eindtijd</label>
            <input name="eindTijd" type="time" className="form-control" id="eindTijd" placeholder="Time" />
        </div>
        <div className="form-group">
            <input type="submit" value="Nieuw Seizoen"/>
        </div>
    </form>
        </>
    )
    
}