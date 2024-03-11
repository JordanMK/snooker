'use client'
import React, {  useEffect, useState } from 'react';
import { db } from '../../firebase';
import{ getDocs, collection} from "firebase/firestore";

async function fetchDataFromFirestore(){
  const querySnapshot = await getDocs(collection(db, "Users"))

  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({id: doc.id, ...doc.data()});
  });
  return data;
}

export default function Klassement(){
  const [userData, setuserData] = useState([]);

  useEffect(() => {
    async function fetchData(){
      const data = await fetchDataFromFirestore();
      setuserData(data); 
    }
    fetchData();
  }, []);
  return(
    <div>
    <h1 className='text-5xl font-bold'>
      Klassement
    </h1>
    <div>
      {userData.map((user) => (
        <table>
            <td>Nr.</td>
            <td>Naam</td>
            <td>Score</td>
            <tr>{"counter"}</tr>
            <tr>{user.naam}</tr>
            <tr>{user.score}</tr>
        </table>
      ))}
    </div>
    </div>

  )
}