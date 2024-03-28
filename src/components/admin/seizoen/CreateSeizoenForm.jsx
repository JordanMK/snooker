'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
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
        <div class="container d-flex">
            <div class="form- w-50 justify-content-center">
                <form action="/submit" method="POST">
                    <label for="name">Name:</label>
                    <input type="text" name="name" class="form-control" required />
                    <br />
                    <label for="bevriesKlassement">Bevries Klassement:</label>
                    <input type="date" name="bevriesKlassement" class="form-control" required />
                    <br />
                    <label for="startDatum">Start Datum:</label>
                    <input type="date" name="startDatum" class="form-control" required />
                    <br />
                    <label for="startTijd">Start Tijd:</label>
                    <input type="time" name="startTijd" class="form-control" required />
                    <br />
                    <label for="eindDatum">Eind Datum:</label>
                    <input type="date" name="eindDatum" class="form-control" required />
                    <br />
                    <label for="eindTijd">Eind Tijd:</label>
                    <input type="time" name="eindTijd" class="form-control" required />
                    <br />
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
        </>
    )
    
}