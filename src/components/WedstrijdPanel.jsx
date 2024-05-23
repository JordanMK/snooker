import React, { useState, useEffect, useMemo, useRef } from "react";
import "./components.css";
import { getSpeeldag, patchSpeeldagVote,putSpeeldagVote ,getUserVotesBySpeeldagId,getUser } from "../components/api_calls/call"

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const speeldag = await getSpeeldag(speeldag_id);
        setState(prevState => ({ ...prevState, speeldag, loading: false, error: null }));
        await fetchUserVotes();
      } catch (error) {
        console.error(error);
        setState(prevState => ({ ...prevState, loading: false, error: "Error fetching data" }));
      }
    };
    fetchData();
  }, [speeldag_id]);

  const fetchUserVotes = async () => {
    try {
      const speeldagVotes = await getUserVotesBySpeeldagId(speeldag_id);
      setState(prevState => ({
        ...prevState,
        speeldagVoteID: speeldagVotes._id ,
        jokerChecked: speeldagVotes.jokerGebruikt,
        schiftingsAntwoord: speeldagVotes.SchiftingsvraagAntwoord,
      }));

      if (speeldagVotes.wedstrijdVotes && speeldagVotes.wedstrijdVotes.length > 0) {
        speeldagVotes.wedstrijdVotes.forEach(vote => {
          handleOptionChange(vote.wedstrijd._id, vote.vote, vote._id);
        });
      }
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
                {!isBeforeToday(state.speeldag.eindDatum) ? (
                  <VotePanel state={state} handleOptionChange={handleOptionChange} onJokerChange={handleJokerChange} onSchiftingsVraagChange={handleSchiftingsvraagChange} />
                ): (
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

const VotePanel = ({ state, handleOptionChange, onJokerChange, onSchiftingsVraagChange}) => {
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [hasUserPaid, setHasUserPaid] = useState(false);

  useEffect(() => {
    const checkUserPaymentStatus = async () => {
      try {
        const loggedInUser = localStorage.getItem("userID");
        const user = await getUser(loggedInUser);
        setHasUserPaid(Boolean(user.betaald));
      } catch (error) {
        console.error("Failed to get user:", error.message);
      }
    };
    checkUserPaymentStatus();
  }, []);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const data = {
        wedstrijdVotes: state.selectedOptions,
        jokerGebruikt: state.jokerChecked,
        SchiftingsvraagAntwoord: state.schiftingsAntwoord,
      };
      if(state.speeldagVoteID){
        await patchSpeeldagVote(data, state.speeldagVoteID);
      } else {
        await putSpeeldagVote(data, state.speeldag._id);
      }
      
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
          {hasUserPaid ? (
            state.speeldag.wedstrijden.map((match) => (
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
                      state.selectedOptions.find((item) => item.wedstrijd === match._id)?.vote === "1" || false
                    }
                    onChange={() => handleOptionChange(match._id, "1")}
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    value="x"
                    checked={
                      state.selectedOptions.find((item) => item.wedstrijd === match._id)?.vote === "x" || false
                    }
                    onChange={() => handleOptionChange(match._id, "x")}
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    value="2"
                    checked={
                      state.selectedOptions.find((item) => item.wedstrijd === match._id)?.vote === "2" || false
                    }
                    onChange={() => handleOptionChange(match._id, "2")}
                  />
                </td>
              </tr>
            ))
          ) 
          : (
            <tr>
              <td colSpan="4">Je kan niet stemmen wat je hebt nog niet betaald.</td>
            </tr>
          )}
        </tbody>
      </table>

     {hasUserPaid && 
     <>
      <JokerEnSchiftingsvraagPanel state={state} onJokerChange={onJokerChange} onSchiftingsVraagChange={onSchiftingsVraagChange} />
      <button onClick={handleSubmit}>Submit</button>
     </>}
       

      {submitting && <p>Submitting...</p>}
      {submissionError && <p>Error: {submissionError}</p>}
      {submissionSuccess && <p>Submission successful!</p>}
    </>
  );
};

const SchiftingsvraagInfo = ({schiftingsvraag, schiftingsAntwoord,jokerChecked}) => {
  return (
    <>
      <p>Schiftingsvraag: {schiftingsvraag}</p>
      <p>jouw antwoord: {schiftingsAntwoord}</p>
      <p>joker gebruikt: <input type="checkbox" checked={jokerChecked || false}/></p>
    </>
  );
};


const JokerEnSchiftingsvraagPanel = ({ state, onJokerChange, onSchiftingsVraagChange }) => {

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
      </div>
    </>
  )
}

const VoteResultPanel = ({ state }) => {
  // Function to generate circle span element
  console.log(state.selectedOptions);
  const renderCircle = (matchResult, selectedVote, voteSign) => {
    let backgroundColor;
    console.log(matchResult, selectedVote, voteSign);
    if (matchResult === selectedVote?.toUpperCase() && matchResult === voteSign) {
      backgroundColor = "green"; // Correct vote
    }
    else if (matchResult !== selectedVote?.toUpperCase() && selectedVote?.toUpperCase() === voteSign) {
      backgroundColor = "blue"; // Incorrect vote
    }
    else if (matchResult !== selectedVote?.toUpperCase() && matchResult === voteSign) {
      backgroundColor = "red"; // Not selected and not correct
    }
    else {
      backgroundColor = "gray"; // Not selected but correct
    }
    return (
      <span
        style={{
          backgroundColor,
          borderRadius: "50%",
          display: "inline-block",
          width: "15px",
          height: "15px",
          marginLeft: "0px"
        }}
      ></span>
    );
  };

  return (
    <>
      <h2>Resultaten</h2>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p style={{ marginRight: "10px" }}>
          {renderCircle("1", "1", "1")}: juist gestemd
        </p>
        <p style={{ marginRight: "10px" }}>
          {renderCircle("1", "2", "1")}: wedstrijdresultaat
        </p>
        <p>
          {renderCircle("1", "2", "2")}: jouw stem
        </p>
      </div>

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
          {state.speeldag.wedstrijden ? (
            state.speeldag.wedstrijden.map((match) => (
              <tr key={match._id}>
                <td>
                  <span>
                    {match.thuis} - {match.uit}
                  </span>
                </td>
                <td>{renderCircle(match.resultaat, state.selectedOptions.find((item) => item.wedstrijd === match._id)?.vote, "1")}</td>
                <td>{renderCircle(match.resultaat, state.selectedOptions.find((item) => item.wedstrijd === match._id)?.vote,"X")}</td>
                <td>{renderCircle(match.resultaat, state.selectedOptions.find((item) => item.wedstrijd === match._id)?.vote,"2")}</td>
              </tr>
              
            ))
            
          ) : (
            <tr>
              <td colSpan="4">Je kan niet stemmen wat je hebt nog niet betaald.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};