'use client'
import React, {  useEffect, useState } from 'react';
import { db } from '../firebase';
import{ getDocs, collection} from "firebase/firestore"

async function fetchDataFromFirestore(){
  const querySnapshot = await getDocs(collection(db, "Wedstrijden"))

  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({id: doc.id, ...doc.data()});
  });
  return data;
}

export default function Home(){
  const [wedstrijdData, setWedstrijdData] = useState([]);

  useEffect(() => {
    async function fetchData(){
      const data = await fetchDataFromFirestore();
      setWedstrijdData(data); 
    }
    fetchData();
  }, []);
  return(
    <div>
    <h1 className='text-5xl font-bold'>
      data van firestore db
    </h1>
    <div>
      {wedstrijdData.map((wedstrijd) => (
        <div key={wedstrijd.id} className='mb-4'>
          <p>thuis: {wedstrijd.thuisploeg}</p>
          <p>uit: {wedstrijd.uitploeg}</p>
        </div>
      ))}
    </div>
    </div>

  )
}