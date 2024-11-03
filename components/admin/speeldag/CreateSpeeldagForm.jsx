import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { postSpeeldag } from '@/src/api_calls';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SpeelDagForm() {
  const searchParams = useSearchParams();

  const [errors, setErrors] = useState({});

  const seizoenId = searchParams.get('seizoenId');
  function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const startdatum = formData.get('startdatum');
    const startUur = formData.get('startUur');
    const eindDatum = formData.get('eindatum');
    const eindUur = formData.get('einduur');
    const schiftingsvraag = formData.get('schiftingsvraag');
    const schiftingantwoord = formData.get('schiftingantwoord');

    const newErrors = [];

    if (!startdatum) {
      newErrors.startDatum = 'Invalid start datum';
    }

    if (!startUur) {
      newErrors.startUur = 'Invalid start uur';
    }

    if (!eindDatum) {
      newErrors.eindDatum = 'Invalid eind datum';
    }

    if (!eindUur) {
      newErrors.eindUur = 'Invalid eind uur';
    }

    if (!schiftingsvraag) {
      newErrors.schiftingsvraag = 'Invalid schiftingsvraag';
    }

    if (!schiftingantwoord) {
      newErrors.schiftingantwoord = 'Invalid schiftingantwoord';
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const startDate = new Date(startdatum + ' ' + startUur).toISOString();
    const eindDate = new Date(eindDatum + ' ' + eindUur).toISOString();

    postSpeeldag(
      schiftingsvraag,
      schiftingantwoord,
      startDate,
      eindDate,
      seizoenId
    )
      .then((data) => {
        // Handle success, if needed
        console.log('Speeldag posted successfully:', data);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        // Handle error, if needed
        console.error('Failed to post speeldag:', error.message);
      });
  }

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId='schiftingsVraag'>
          <Form.Label>Schiftingsvraag:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Schiftingsvraag'
            name='schiftingsvraag'
            isInvalid={!!errors.schiftingsvraag}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.schiftingsvraag}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='schiftingsAntwoord'>
          <Form.Label>Schiftingsantwoord:</Form.Label>
          {/* answer is always a number */}
          <Form.Control
            type='number'
            placeholder='Schiftingsantwoord'
            name='schiftingantwoord'
            isInvalid={!!errors.schiftingantwoord}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.schiftingantwoord}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='startdatum'>
          <Form.Label>startDatum::</Form.Label>
          <Form.Control
            type='date'
            placeholder='startdatum'
            name='startdatum'
            isInvalid={!!errors.startDatum}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.startDatum}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='startUur'>
          <Form.Label>startUur:</Form.Label>
          <Form.Control
            type='time'
            placeholder='startUur'
            name='startUur'
            isInvalid={!!errors.startUur}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.startUur}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='eindatum'>
          <Form.Label>eindatum invullen</Form.Label>
          <Form.Control
            type='date'
            placeholder='eindatum'
            name='eindatum'
            isInvalid={!!errors.eindDatum}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.eindDatum}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='einduur'>
          <Form.Label>einduur invullen</Form.Label>
          <Form.Control
            type='time'
            placeholder='einduur'
            name='einduur'
            isInvalid={!!errors.eindUur}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.eindUur}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </>
  );
}
