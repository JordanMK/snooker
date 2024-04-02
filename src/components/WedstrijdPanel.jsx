import React, { useState, useEffect } from "react";
import "./components.css";
import { getSpeeldag,putSpeeldagVote,getUserVotesBySpeeldagId } from "./api_calls/call.js";

export default function WedstrijdPanel({ speeldag_id }) {
  const [speeldag, setSpeeldag] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [jokerChecked, setJokerChecked] = useState(false);
  const [schiftingsAntwoord, setSchiftingsAntwoord] = useState('');
  const [canUpdateJokerAndSchiftingAntwoord,setCanUpdateJokerAndSchiftingAntwoord] = useState(true);

  useEffect(() => {
    getSpeeldag(speeldag_id)
      .then((speeldag) => {
        setSpeeldag(speeldag);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError("Error fetching data");
      });
  }, [speeldag_id]);

  useEffect(() => {
    getUserVotesBySpeeldagId(speeldag_id)
    .then(speeldagVotes => {
      speeldagVotes.votes.forEach(vote => {
        console.log(vote)
        handleOptionChange(vote.wedstrijd,vote.vote)
        setJokerChecked(speeldagVotes.jokerGebruikt)
        setSchiftingsAntwoord(speeldagVotes.SchiftingsvraagAntwoord)
        setCanUpdateJokerAndSchiftingAntwoord(false)
      })
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
      setError("Error fetching data");
    });
  },[])

  const handleOptionChange = (matchId, option) => {
    console.log(matchId,option);
  // Check if the option already exists in selectedOptions
  const existingOptionIndex = selectedOptions.findIndex(item => item.wedstrijdId === matchId);

  if (existingOptionIndex !== -1) {
    // If the option already exists, update its vote
    const updatedOptions = [...selectedOptions];
    updatedOptions[existingOptionIndex] = { ...updatedOptions[existingOptionIndex], vote: option };
    setSelectedOptions(updatedOptions);
  } else {
    // If the option doesn't exist, add it to selectedOptions
    setSelectedOptions(prevOptions => [...prevOptions, { wedstrijdId: matchId, vote: option }]);
  }

    
    setSelectedOptions(prevState => {
      const updatedOptions = prevState.map(item => {
        if (item.wedstrijdId === matchId) {
          return { ...item, vote: option };
        }
        return item;
      });
      return updatedOptions;
    });
  };

  

  const handleJokerChange = (event) => {
    setJokerChecked(event.target.checked);
  };

  const handleSchiftingsvraagChange = (event) => {
    setSchiftingsAntwoord(event.target.value);
  };

  const handleSubmit = () => {

    let loggedinUserId = '65fd662229e6cb1a392fa77f'
    let obj = {
      "userID": loggedinUserId,
      "jokerGebruikt": jokerChecked,
      "user": loggedinUserId,
      "SchiftingsvraagAntwoord": schiftingsAntwoord,
      "wedstrijdVotes": selectedOptions
    }
    console.log('eindobj',obj);

    putSpeeldagVote(speeldag_id,obj)

  };

  return (
    <>
      <div>
        <p className="speeldagTitel">Speeldag</p>
        {loading && !speeldag ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            {speeldag.wedstrijden.length > 0 && (
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
                    {speeldag &&
                      speeldag.wedstrijden.map((match) => (
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
                              checked={selectedOptions.find(item => item.wedstrijdId === match._id)?.vote === '1' || false}
                              onChange={() => handleOptionChange(match._id, '1')}
                            />
                          </td>
                          <td>
                            <input
                              type="radio"
                              value="x"
                              checked={selectedOptions.find(item => item.wedstrijdId === match._id)?.vote === 'x' || false}
                              onChange={() => handleOptionChange(match._id, 'x')}
                            />
                          </td>
                          <td>
                            <input
                              type="radio"
                              value="2"
                              checked={selectedOptions.find(item => item.wedstrijdId === match._id)?.vote === '2' || false}
                              onChange={() => handleOptionChange(match._id, '2')}
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
                    checked={jokerChecked}
                    onChange={handleJokerChange}
                    disabled={!canUpdateJokerAndSchiftingAntwoord}
                  />
                </div>
                <div className="schiftingsContainer">
                  <h4>Schiftingsvraag:</h4>
                  <label htmlFor="schiftingsvraag">
                    {speeldag.schiftingsvraag}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10000"
                    id="schiftingsAntwoord"
                    value={schiftingsAntwoord}
                    onChange={handleSchiftingsvraagChange}
                    required
                    disabled={!canUpdateJokerAndSchiftingAntwoord}
                  />
                </div>
                {schiftingsAntwoord.length > 0 && (
                  <input type="button" value="submit" onClick={handleSubmit}/>
                )}
                {schiftingsAntwoord.length === 0 && (
                  <p>Schiftingsantwoord is verplicht</p>
                )}
              </>
            )}
            {speeldag.wedstrijden.length === 0 && (
                <p>Geen wedstrijden</p>
            )}
          </>
        )}
      </div>
    </>
  );
}
