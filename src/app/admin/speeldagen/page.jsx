'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import AdminPopup from '@/components/Popup';
import SpeelDagForm from '@/components/admin/speeldag/CreateSpeeldagForm';
import WedstrijdForm from '@/components/admin/wedstrijd/CreateWedstrijd';
import WedstrijdAdmin from '@/components/admin/wedstrijd/wedstrijdAdmin';

import {
  getSpeeldagen,
  patchSpeeldag,
  updateKlassementen,
  getSpeeldagenBySeizoenId,
  updateSpeeldagIsOnline,
} from '@/src/api_calls';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactjs-popup/dist/index.css';
import '@/styles/style.css';

import { Form, Button } from 'react-bootstrap';

export default function Speeldagen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [speeldagen, setSpeeldagen] = useState([]);

  const seizoenId = searchParams.get('seizoenId');
  console.log(seizoenId);

  useEffect(() => {
    const isAdmin = localStorage.getItem('admin');
    console.log(isAdmin);
    if (isAdmin === 'false') {
      router.push('/');
      return;
    }
    getSpeeldagenBySeizoenId(seizoenId)
      .then(setSpeeldagen)
      .catch((error) => console.error(error.message));
  }, [seizoenId]);

  return (
    <>
      <div className='header'>
        <h1>Dashboard Admin</h1>
      </div>
      <AdminPopup triggerButtonName='Nieuwe speeldag'>
        <SpeelDagForm />
      </AdminPopup>
      <div className='speeldag'>
        <ul>
          {speeldagen
            .slice()
            .reverse()
            .map((speeldag, idx) => (
              <Speeldag
                speeldag={speeldag}
                number={speeldagen.length - idx}
                key={speeldag._id}
              />
            ))}
        </ul>
      </div>
    </>
  );

  function Speeldag({ speeldag, number }) {
    const {
      schiftingsvraag,
      schiftingsantwoord,
      startDatum,
      eindDatum,
      _id,
      wedstrijden,
    } = speeldag;

    console.log('Wedstrijden', wedstrijden);

    const handleCheckboxChange = async (event) => {
      const updatedIsOnline = event.target.checked;

      try {
        await updateSpeeldagIsOnline(speeldag._id, updatedIsOnline); // Update de speeldag
        const updatedSpeeldagen = await getSpeeldagen(); // Haal opnieuw alle speeldagen op
        setSpeeldagen(updatedSpeeldagen); // Update de status in de UI
      } catch (error) {
        console.error('Error updating speeldag:', error);
      }
    };

    return (
      <li>
        <div className='speeldagHead'>
          <h2>Speeldag {number}</h2>

          <AdminPopup triggerButtonName='Pas aan'>
            <PasSpeeldagAan
              schiftingsvraag={schiftingsvraag}
              schiftingsantwoord={schiftingsantwoord}
              startDatum={startDatum}
              eindDatum={eindDatum}
              speeldagId={_id}
            />
          </AdminPopup>

          <AdminPopup triggerButtonName='Nieuwe wedstrijd'>
            <WedstrijdForm id={_id} />
          </AdminPopup>

          <label htmlFor='online'>Zet speeldag online: </label>
          <input
            type='checkbox'
            name='online'
            checked={speeldag.isOnline}
            onChange={handleCheckboxChange}
          />
        </div>
        <WedstrijdAdmin wedstrijden={wedstrijden} />
      </li>
    );
  }
}

function PasSpeeldagAan({
  schiftingsvraag,
  schiftingsantwoord,
  startDatum,
  eindDatum,
  speeldagId,
}) {
  const searchParams = useSearchParams();
  const seizoenId = searchParams.get('seizoenId');

  // TODO: how is this supposed to work?
  const formattedStartDatum = formattedDate(new Date(startDatum));
  const formattedStartUur = formattedTime(new Date(startDatum));

  const formattedEindDatum = formattedDate(new Date(eindDatum));
  const formattedEindUur = formattedTime(new Date(eindDatum));

  console.log('datum', formattedDate);
  function handlePatchSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const startdatum = formData.get('startdatum');
    const startUur = formData.get('startUur');
    const eindDatum = formData.get('eindDatum');
    const eindUur = formData.get('einduur');
    const schiftingsvraag = formData.get('schiftingsvraag');
    const schiftingantwoord = formData.get('schiftingantwoord');

    const startDate = new Date(startdatum + ' ' + startUur).toISOString();
    const eindDate = new Date(eindDatum + ' ' + eindUur).toISOString();

    patchSpeeldag(
      schiftingsvraag,
      schiftingantwoord,
      startDate,
      eindDate,
      speeldagId
    )
      .then((data) => {
        // Handle success, if needed
        console.log('Wedstrijd patched successfully:', data);
        updateKlassementen(seizoenId);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        // Handle error, if needed
        console.error('Failed to patch wedstrijd:', error.message);
      });
  }

  return (
    <>
      <Form onSubmit={handlePatchSubmit}>
        <Form.Group controlId='schiftingsVraag'>
          <Form.Label>Schiftingsvraag:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Schiftingsvraag'
            name='schiftingsvraag'
            defaultValue={schiftingsvraag}
          />
        </Form.Group>
        <Form.Group controlId='schiftingsAntwoord'>
          <Form.Label>Schiftingsantwoord:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Schiftingsantwoord'
            name='schiftingantwoord'
            defaultValue={schiftingsantwoord}
          />
        </Form.Group>
        <Form.Group controlId='startdatum'>
          <Form.Label>startDatum::</Form.Label>
          <Form.Control
            type='date'
            placeholder='startdatum'
            name='startdatum'
            defaultValue={formattedStartDatum}
          />
        </Form.Group>
        <Form.Group controlId='startUur'>
          <Form.Label>startUur:</Form.Label>
          <Form.Control
            type='time'
            placeholder='startUur'
            name='startUur'
            defaultValue={formattedStartUur}
            format='HH:mm'
          />
        </Form.Group>
        <Form.Group controlId='eindDatum'>
          <Form.Label>eindDatum invullen</Form.Label>
          <Form.Control
            type='date'
            placeholder='eindDatum'
            name='eindDatum'
            defaultValue={formattedEindDatum}
          />
        </Form.Group>
        <Form.Group controlId='einduur'>
          <Form.Label>einduur invullen</Form.Label>
          <Form.Control
            type='time'
            placeholder='einduur'
            name='einduur'
            defaultValue={formattedEindUur}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </>
  );
}

function formattedDate(date) {
  const localDate = new Date(date);
  const offset = localDate.getTimezoneOffset(); // Get the timezone offset in minutes
  const localISODate = new Date(
    localDate.getTime() - offset * 60000
  ).toISOString();
  return localISODate.split('T')[0];
}

function formattedTime(date) {
  const localDate = new Date(date);
  const offset = localDate.getTimezoneOffset(); // Get the timezone offset in minutes
  const localISOTime = new Date(
    localDate.getTime() - offset * 60000
  ).toISOString();
  return localISOTime.split('T')[1].split('.')[0];
}
