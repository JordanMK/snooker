import React, { useState, useEffect, useRef } from "react";
import { getSpeeldag, patchSpeeldagVote, getUserVotesBySpeeldagId } from "../components/api_calls/call";

export default function WedstrijdPanel({ speeldag_id }) {
  const [state, setState] = useState({
    speeldag: null,
    loading: true,
    error: null,
    selectedOptions: [],
    jokerChecked: false,
    schiftingsAntwoord: '',
    speeldagVoteID: {}
  });
  const latestState = useRef(state);

  useEffect(() => {
    latestState.current = state;
  }, [state]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const speeldag = await getSpeeldag(speeldag_id);
        setState(prevState => ({ ...prevState, speeldag, loading: false, error: null, selectedOptions: [], jokerChecked: false, schiftingsAntwoord: '', canUpdateJokerAndSchiftingAntwoord: false, eindObject: {} }));

        const fetchUserVotes = async () => {
          try {
            const speeldagVotes = await getUserVotesBySpeeldagId(speeldag_id);
            console.log(speeldagVotes);
            setState(prevState => ({
              ...prevState,
              speeldagVoteID: speeldagVotes._id,
              jokerChecked: speeldagVotes.jokerGebruikt,
              schiftingsAntwoord: speeldagVotes.SchiftingsvraagAntwoord,
            }));

            if (speeldagVotes.wedstrijdVotes && speeldagVotes.wedstrijdVotes.length > 0) {
              speeldagVotes.wedstrijdVotes.forEach(vote => {
                handleOptionChange(vote.wedstrijd, vote.vote, vote._id);
              });
            }
          } catch (error) {
            console.error(error);
            setState(prevState => ({
              ...prevState,
              loading: false,
              error: "Error fetching data"
            }));
          }
        };
        await fetchUserVotes();

      } catch (error) {
        console.error(error);
        setState(prevState => ({ ...prevState, loading: false, error: "Error fetching data" }));
      }
    };
    fetchData();
  }, [speeldag_id]);

  const handleOptionChange = (matchId, option, wedstrijdId) => {
    setState(prevState => {
      const existingOptionIndex = prevState.selectedOptions.findIndex(item => item.wedstrijd === matchId);
      if (existingOptionIndex !== -1) {
        const updatedOptions = [...prevState.selectedOptions];
        updatedOptions[existingOptionIndex] = { ...updatedOptions[existingOptionIndex], vote: option };
        return { ...prevState, selectedOptions: updatedOptions };
      } else {
        return { ...prevState, selectedOptions: [...prevState.selectedOptions, { _id: wedstrijdId, vote: option, wedstrijd: matchId }] };
      }
    });
  };

  const handleJokerChange = (event) => {
    setState(prevState => ({ ...prevState, jokerChecked: event.target.checked }));
  };

  const handleSchiftingsvraagChange = (event) => {
    setState(prevState => ({ ...prevState, schiftingsAntwoord: event.target.value }));
  };

  function isBeforeToday(datum) {
    return new Date(datum) < new Date();
  }

  return (
    <>
      <div>
        <p className="speeldagTitel">Speeldag</p>
        {state.loading && !state.speeldag ? (
          <div>Loading...</div>
        ) : state.error ? (
          <div>Error: {state.error}</div>
        ) : (
          <>
            {state.speeldag && (
              <>
                {!isBeforeToday(state.speeldag.startDatum) && (
                  <JokerEnSchiftingsvraagPanel
                    state={state}
                    onJokerChange={handleJokerChange}
                    onSchiftingsVraagChange={handleSchiftingsvraagChange}
                  />
                )}
                {isBeforeToday(state.speeldag.startDatum) && !isBeforeToday(state.speeldag.eindDatum) && (
                  <VotePanel state={state} handleOptionChange={handleOptionChange} />
                )}
                {isBeforeToday(state.speeldag.eindDatum) && (
                  <VoteResultPanel state={state} />
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

const VotePanel = ({ state, handleOptionChange }) => {
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const data = {
        wedstrijdVotes: state.selectedOptions,
      };
      // Assuming patchSpeeldagVote is an asynchronous function
      await patchSpeeldagVote(data, state.speeldagVoteID);
      setSubmitting(false);
      setSubmissionSuccess(true);
    } catch (error) {
      console.error("Failed to post speeldag:", error.message);
      setSubmitting(false);
      setSubmissionError(error.message);
    }
  };

  return (
    <>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Match</th>
            <th>Winst ploeg 1</th>
            <th>Gelijkspel</th>
            <th>Winst ploeg 2</th>
          </tr>
        </thead>
        <tbody>
          {state.speeldag.wedstrijden.map((match) => (
            <tr key={match._id}>
              <td>
                <span>
                  {match.thuis} - {match.uit}
                </span>
              </td>
              <td>
                <input
                  type="radio"
                  value="1"
                  checked={
                    state.selectedOptions.find(
                      (item) => item.wedstrijd === match._id
                    )?.vote === "1" || false
                  }
                  onChange={() => handleOptionChange(match._id, "1")}
                />
              </td>
              <td>
                <input
                  type="radio"
                  value="x"
                  checked={
                    state.selectedOptions.find(
                      (item) => item.wedstrijd === match._id
                    )?.vote === "x" || false
                  }
                  onChange={() => handleOptionChange(match._id, "x")}
                />
              </td>
              <td>
                <input
                  type="radio"
                  value="2"
                  checked={
                    state.selectedOptions.find(
                      (item) => item.wedstrijd === match._id
                    )?.vote === "2" || false
                  }
                  onChange={() => handleOptionChange(match._id, "2")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Schiftingsvraag: {state.speeldag.schiftingsvraag}</p>
      <p>jouw antwoord: {state.schiftingsAntwoord}</p>
      <p>joker gebruikt: <input type="checkbox" checked={state.jokerChecked || false}/></p>
      {submitting && <p>Submitting...</p>}
      {submissionError && <p>Error: {submissionError}</p>}
      {submissionSuccess && <p>Submission successful!</p>}
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

const JokerEnSchiftingsvraagPanel = ({ state, onJokerChange, onSchiftingsVraagChange }) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async () => {
    try {
      const data = {
        _id : state.speeldagVoteID,
        user: localStorage.getItem("userID"),
        jokerGebruikt: state.jokerChecked,
        SchiftingsvraagAntwoord: state.schiftingsAntwoord,
      };
      await putSpeeldagVote(data, state.speeldag._id);
      setSubmitSuccess(true);
      setSubmitError(null);
    } catch (error) {
      console.error("Failed to post speeldag:", error.message);
      setSubmitSuccess(false);
      setSubmitError(error.message);
    }
  }

  return (
    <>
      <h2>vul schiftingsvraag in</h2>
      <div className="jokerContainer checkbox-wrapper-13">
        <label htmlFor="c1-13">Gebruik joker?</label>
        <input
          type="checkbox"
          id="c1-13"
          checked={state.jokerChecked} // Use checked instead of defaultChecked
          onChange={onJokerChange}
        />
      </div>
      <div className="schiftingsContainer">
        <h4>Schiftingsvraag:</h4>
        <label htmlFor="schiftingsvraag">
          {state.speeldag.schiftingsvraag}
        </label>
        <input
          type="number"
          min="0"
          max="10000"
          id="schiftingsAntwoord"
          defaultValue={state.schiftingsAntwoord}
          onChange={onSchiftingsVraagChange}
          required
        />
      <p>Beschikbare jokers: WIP</p>
      </div>
      <button onClick={handleSubmit}>Submit</button>
      {submitSuccess && <p>Submission successful!</p>}
      {submitError && <p>Error: {submitError}</p>}
    </>
  )
}

const VoteResultPanel = ({ state }) => {
  return (
  <>
  <p>Show results</p>
  </>
  )
}
