import React, { useState, useEffect, useMemo, useRef } from "react";
import "./components.css";
import { getSpeeldag, patchSpeeldagVote,postSpeeldagVote ,getUserVotesBySpeeldagId } from "./api_calls/call.js";

export default function WedstrijdPanel({ speeldag_id }) {
  const [state, setState] = useState({
    speeldag: null,
    loading: true,
    error: null,
    selectedOptions: [],
    jokerChecked: false,
    schiftingsAntwoord: '',
    canUpdateJokerAndSchiftingAntwoord: true,
    eindObject: {}
  });
  const latestState = useRef(state);

  useEffect(() => {
    latestState.current = state;
  }, [state]);

  const fetchUserVotes = async () => {
    try {
      const speeldagVotes = await getUserVotesBySpeeldagId(speeldag_id);
      if (speeldagVotes.votes && speeldagVotes.votes.length > 0) {
        speeldagVotes.votes.forEach(vote => {
            console.log(speeldagVotes);
            if (vote._id.length > 0) {
                setState(prevState => ({ ...prevState, eindObject: { _id: speeldagVotes._id, jokerGebruikt: speeldagVotes.jokerGebruikt, schiftingsvraagAntwoord: speeldagVotes.SchiftingsvraagAntwoord }, jokerChecked: speeldagVotes.jokerGebruikt, schiftingsAntwoord: speeldagVotes.SchiftingsvraagAntwoord }));
            }
            handleOptionChange(vote.wedstrijd, vote.vote, vote._id);
        })
      } else {
        setState(prevState => ({...prevState, jokerChecked: false, schiftingsAntwoord: '', canUpdateJokerAndSchiftingAntwoord: true }));
      }
    } catch (error) {
      console.error(error);
      setState(prevState => ({ ...prevState, loading: false, error: "Error fetching data" }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const speeldag = await getSpeeldag(speeldag_id);
        setState(prevState => ({ ...prevState, speeldag, loading: false, error: null, selectedOptions: [], jokerChecked: false, schiftingsAntwoord: '', canUpdateJokerAndSchiftingAntwoord: false, eindObject: {} }));
        // Call fetchUserVotes after successfully fetching speeldag data
        await fetchUserVotes();
      } catch (error) {
        console.error(error);
        setState(prevState => ({ ...prevState, loading: false, error: "Error fetching data" }));
      }
    };
    fetchData();
  }, [speeldag_id]);

  useEffect(() => {
    setInitialUserVoteData();
  }, []);

  // voor datum
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval)
  }, []);

  const isVotingAllowed = (matchDate) => {
    const currentDate = currentDateTime;
    const matchDateObj = new Date(matchDate);

    // calc
    const timeDiff = matchDateObj.getTime() - currentDate.getTime();

    //test
    /*console.log("Current Date:", currentDate);
    console.log("Match Date:", matchDateObj);
    console.log("Time Difference (hours):", hoursDiff);*/
    
    return (currentDate > matchDateObj);
  }

  const setInitialUserVoteData = async () => {
    try {
      const speeldagVotes = await getUserVotesBySpeeldagId(speeldag_id);
      const jokerUsed = speeldagVotes.jokerGebruikt;
      const schiftingsvraagAntwoord = speeldagVotes.SchiftingsvraagAntwoord;
      const canUpdate = !(jokerUsed || schiftingsvraagAntwoord);
      setState(prevState => ({
        ...prevState,
        jokerChecked: jokerUsed,
        schiftingsAntwoord: schiftingsvraagAntwoord,
        canUpdateJokerAndSchiftingAntwoord: canUpdate,
        loading: false,
        error: null
      }));
    } catch (error) {
      console.error(error);
      setState(prevState => ({ ...prevState, loading: false, error: "Error fetching data" }));
    }
  };

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
    if (state.canUpdateJokerAndSchiftingAntwoord) {
      setState(prevState => ({ ...prevState, jokerChecked: event.target.checked }));
    }
  };

  const handleSchiftingsvraagChange = (event) => {
    if (state.canUpdateJokerAndSchiftingAntwoord) {
      setState(prevState => ({ ...prevState, schiftingsAntwoord: event.target.value }));
    }
  };

  const handleSubmit = () => {
    let loggedinUserId = '65fd662229e6cb1a392fa77f';
    let obj = {
      "_id": latestState.current.eindObject._id,
      "jokerGebruikt": latestState.current.eindObject.jokerGebruikt || state.jokerChecked,
      "user": loggedinUserId,
      "SchiftingsvraagAntwoord": latestState.current.eindObject.schiftingsvraagAntwoord || state.schiftingsAntwoord,
      "wedstrijdVotes": latestState.current.selectedOptions
    };
    console.log('eindobj', obj);
    if(state.canUpdateJokerAndSchiftingAntwoord){
      postSpeeldagVote(obj, '6605868758af03cfd7e2a128')
    } else {
      patchSpeeldagVote(latestState.current.eindObject._id, obj);
    }
    
  };

  const renderSubmitButton = useMemo(() => {
    return state.schiftingsAntwoord && state.schiftingsAntwoord.toString().length > 0 ? (
      <input type="button" value="submit" onClick={handleSubmit} />
    ) : (
      <p>Schiftingsantwoord is verplicht</p>
    );
  }, [state.schiftingsAntwoord]);

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
            {state.speeldag && state.speeldag.wedstrijden.length > 0 && (
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
                            checked={state.selectedOptions.find(item => item.wedstrijd === match._id)?.vote === '1' || false}
                            onChange={() => handleOptionChange(match._id, '1')}
                            disabled={isVotingAllowed(match.datum)}
                          />
                        </td>
                        <td>
                          <input
                            type="radio"
                            value="x"
                            checked={state.selectedOptions.find(item => item.wedstrijd === match._id)?.vote === 'x' || false}
                            onChange={() => handleOptionChange(match._id, 'x')}
                            disabled={isVotingAllowed(match.datum)}
                          />
                        </td>
                        <td>
                          <input
                            type="radio"
                            value="2"
                            checked={state.selectedOptions.find(item => item.wedstrijd === match._id)?.vote === '2' || false}
                            onChange={() => handleOptionChange(match._id, '2')}
                            disabled={isVotingAllowed(match.datum)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="jokerContainer checkbox-wrapper-13">
                  <label htmlFor="c1-13">Gebruik joker?</label>
                  <input
                    type="checkbox"
                    id="c1-13"
                    checked={state.jokerChecked}
                    onChange={handleJokerChange}
                    disabled={!state.canUpdateJokerAndSchiftingAntwoord}
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
                    value={state.schiftingsAntwoord}
                    onChange={handleSchiftingsvraagChange}
                    required
                    disabled={!state.canUpdateJokerAndSchiftingAntwoord}
                  />
                </div>
                {renderSubmitButton}
              </>
            )}
            {state.speeldag && state.speeldag.wedstrijden.length === 0 && (
              <p>Geen wedstrijden</p>
            )}
          </>
        )}
      </div>
    </>
  );
}
