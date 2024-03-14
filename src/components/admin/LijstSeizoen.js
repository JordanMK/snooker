'use client'
import React from 'react';
import Seizoen from '@/components/Admin/Seizoen';
import { useRouter } from 'next/navigation';


export default function LijstSeizoen () {
    const router = useRouter();
    const maakSeizoenClick = () =>{
        console.log('maakSeizoenClick')
        router.push('/admin/seizoen/CreateSeizoen');
    }
    return <>
    <div className="seizoen-container">
        <h1>Lijst Seizoen</h1>
        <button type="button" className="" onClick={maakSeizoenClick}>nieuw Seizoen</button>
        <Seizoen></Seizoen>
        <Seizoen></Seizoen>
    </div>
        
    </>
}