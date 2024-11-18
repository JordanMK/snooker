import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { postSpeeldag } from '@/src/api_calls';
import { useSearchParams } from 'next/navigation';

export default function SpeelDagForm() {
  const searchParams = useSearchParams();
  const seizoenId = searchParams.get('seizoenId');

  /** @param {FormData} formData */
  function handleFormSubmit(formData) {
    // NOTE: uses client-side validation to ensure proper input
    const startdatum = formData.get('startdatum');
    const startUur = formData.get('startUur');
    const eindDatum = formData.get('eindatum');
    const eindUur = formData.get('einduur');
    const schiftingsvraag = formData.get('schiftingsvraag');
    const schiftingantwoord = formData.get('schiftingantwoord');

    const startDate = new Date(startdatum + ' ' + startUur).toISOString();
    const eindDate = new Date(eindDatum + ' ' + eindUur).toISOString();

    postSpeeldag(
      schiftingsvraag,
      schiftingantwoord,
      startDate,
      eindDate,
      seizoenId
    )
      .then(() => setTimeout(() => window.location.reload(), 400))
      .catch((error) => console.error('Failed to post speeldag:', error))
  }

  return (
    <>
      <Form action={handleFormSubmit}>
        <Form.Group controlId='schiftingsVraag'>
          <Form.Label>Schiftingsvraag:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Schiftingsvraag'
            name='schiftingsvraag'
            required
          />
        </Form.Group>

        <Form.Group controlId='schiftingsAntwoord'>
          <Form.Label>Schiftingsantwoord:</Form.Label>
          {/* answer is always a number */}
          <Form.Control
            type='number'
            placeholder='Schiftingsantwoord'
            name='schiftingantwoord'
            required
          />
        </Form.Group>

        <Form.Group controlId='startdatum'>
          <Form.Label>startDatum:</Form.Label>
          <Form.Control
            type='date'
            placeholder='startdatum'
            name='startdatum'
            required
          />
        </Form.Group>

        <Form.Group controlId='startUur'>
          <Form.Label>startUur:</Form.Label>
          <Form.Control
            type='time'
            placeholder='startUur'
            name='startUur'
            required
          />
        </Form.Group>

        <Form.Group controlId='eindatum'>
          <Form.Label>eindatum invullen</Form.Label>
          <Form.Control
            type='date'
            placeholder='eindatum'
            name='eindatum'
            required
          />
        </Form.Group>

        <Form.Group controlId='einduur'>
          <Form.Label>einduur invullen</Form.Label>
          <Form.Control
            type='time'
            placeholder='einduur'
            name='einduur'
            required
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </>
  );
}
