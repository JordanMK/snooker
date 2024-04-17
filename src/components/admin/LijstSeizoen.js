'use client'
import React, { useState, useEffect } from 'react';
import Seizoen from '@/components/Admin/Seizoen';
import { useRouter } from 'next/navigation';
import { getSeizoenen } from "../api_calls/call"

export default function LijstSeizoen () {
    const router = useRouter();
    const maakSeizoenClick = () =>{
        console.log('maakSeizoenClick')
        router.push('/admin/seizoen/CreateSeizoen');
    }
    const [seizoenen, setSeizoenen] = useState([]);

    useEffect(() => {
      getSeizoenen()
        .then((fetchedSeizoenen) => {
          setSeizoenen(fetchedSeizoenen);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }, []);

    return <>
    <div className="seizoen-container">
        <h1>Lijst Seizoen</h1>
        <button type="button" className="" onClick={maakSeizoenClick}>nieuw Seizoen</button>
        {seizoenen.map((seizoen) => (
            <div
            key={seizoen._id}>
                <Seizoen seizoen={seizoen} />
            </div>
            
        ))}
    </div>
    
    </>
}