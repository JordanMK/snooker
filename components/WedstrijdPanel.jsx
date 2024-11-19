import React, { useState, useEffect } from "react";
import "./components.css";
import {
  getSpeeldag,
  patchSpeeldagVote,
  putSpeeldagVote,
  getUserVotesBySpeeldagId,
  getUser,
} from "@/src/api_calls";
import { useImmer } from "use-immer";
import "../src/typedefs"
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";

/**
 * @typedef PanelState
 * @property {Speeldag} speeldag
 * @property {boolean} loading
 * @property {string|null} error
 * @property {any[]} selectedOptions
 * @property {boolean} jokerChecked
 * @property {string} schiftingsAntwoord
 * @property {string} speeldagVoteID
 */

/** @type {PanelState} */
const initialState = {
  speeldag: null,
  loading: true,
  error: null,
  selectedOptions: [],
  jokerChecked: false,
  schiftingsAntwoord: "",
  speeldagVoteID: "",
}

export default function WedstrijdPanel({ speeldagId }) {
  /** @type {[PanelState, import("use-immer").Updater<PanelState>]} */
  const [state, updateState] = useImmer(initialState)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const speeldag = await getSpeeldag(speeldagId);
        await fetchUserVotes();

        updateState(draft => {
          draft.speeldag = speeldag
          draft.loading = false
          draft.error = null
        })
      } catch (error) {
        console.error(error);

        updateState(draft => {
          draft.loading = false
          draft.error = "Error fetching data"
        })
      }
    };

    fetchData();
  }, [speeldagId]);

  const fetchUserVotes = async () => {
    try {
      const speeldagVotes = await getUserVotesBySpeeldagId(speeldagId);
      updateState(draft => {
        draft.speeldagVoteID = speeldagVotes._id
        draft.jokerChecked = speeldagVotes.jokerGebruikt
        draft.schiftingsAntwoord = speeldagVotes.SchiftingsvraagAntwoord
      })

      speeldagVotes.wedstrijdVotes?.forEach(vote => {
        // TODO: wedstrijden can be removed and this vote still refers to a non-existent
        // wedstrijd, are we supposed to handle this?
        if (vote.wedstrijd == null) {
          console.warn(`vote ${vote._id} refers to non-existent wedstrijd`);
          return;
        }
        handleOptionChange(vote.wedstrijd._id, vote.vote, vote._id);
      })
    } catch (error) {
      console.error(error);
      updateState(draft => {
        draft.loading = false
        draft.error = "Error fetching data"
      })
    }
  }

  const handleOptionChange = (matchId, option, wedstrijdId) => updateState(draft => {
    const existingOptionIdx = draft.selectedOptions.findIndex(item => item.wedstrijd === matchId)
    if (existingOptionIdx !== -1) {
      draft.selectedOptions[existingOptionIdx].vote = option
    } else {
      draft.selectedOptions.push({ _id: wedstrijdId, vote: option, wedstrijd: matchId })
    }
  })

  /** @param {Event} event */
  const handleJokerChange = (event) => updateState(draft => {
    draft.jokerChecked = event.target.checked
  })

  /** @param {Event} event */
  const handleSchiftingsvraagChange = (event) => updateState(draft => {
    draft.schiftingsAntwoord = event.target.value
  })

  /** @param {string} dateStr */
  const isBeforeToday = (dateStr) => new Date(dateStr) < new Date()

  return (
    <>
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
                <VotePanel
                  state={state}
                  handleOptionChange={handleOptionChange}
                  onJokerChange={handleJokerChange}
                  onSchiftingsVraagChange={handleSchiftingsvraagChange}
                />
              ) : (
                <VoteResultPanel state={state} />
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

/**
 * @param {object} props
 * @param {PanelState} props.state
 */
const VotePanel = ({
  state,
  handleOptionChange,
  onJokerChange,
  onSchiftingsVraagChange,
}) => {
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
        console.error("Failed to get user:", error);
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
      if (state.speeldagVoteID) {
        await patchSpeeldagVote(data, state.speeldagVoteID);
      } else {
        await putSpeeldagVote(data, state.speeldag._id);
      }

      setSubmitting(false);
      setSubmissionSuccess(true);
    } catch (error) {
      console.error("Failed to post speeldag:", error);
      setSubmitting(false);
      setSubmissionError(error.message);
    }
  };

  function isBetweenStartAndEndDate(startDate, endDate) {
    const vandaag = new Date();
    return new Date(startDate) <= vandaag && vandaag <= new Date(endDate);
  }

  const startDatum = new Date(state.speeldag.startDatum);
  const formattedDate = `${startDatum.getDate()}/${startDatum.getMonth() + 1}/${startDatum.getFullYear()}` 

  if(hasUserPaid && !isBetweenStartAndEndDate(state.speeldag.startDatum, state.speeldag.eindDatum)) {
    return <p style={{textAlign: "center"}}>Deze speeldag is nog niet gestart: <b>{formattedDate}</b></p>
  }

  return (
    <>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Match</th>
            <th>Ploeg 1 wint</th>
            <th>Gelijkspel</th>
            <th>Ploeg 2 wint</th>
          </tr>
        </thead>
        <tbody>
          {
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
                    value="3"
                    checked={
                      state.selectedOptions.find(
                        (item) => item.wedstrijd === match._id
                      )?.vote === "3" || false
                    }
                    onChange={() => handleOptionChange(match._id, "3")}
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
            ))
          }
        </tbody>
      </table>

      {hasUserPaid && (
        <>
          <JokerEnSchiftingsvraagPanel
            state={state}
            onJokerChange={onJokerChange}
            onSchiftingsVraagChange={onSchiftingsVraagChange}
            onSubmit={handleSubmit}
          />
        </>
      )}

      {submitting && <p>Submitting...</p>}
      {submissionError && <p>Error: {submissionError}</p>}
      {submissionSuccess && <p>Successvol verzonden!</p>}
    </>
  );
};

/**
 * @param {object} props
 * @param {PanelState} props.state
 */
const JokerEnSchiftingsvraagPanel = ({
  state,
  onJokerChange,
  onSchiftingsVraagChange,
  onSubmit,
  inputsDisabled = false,
}) => {
  const router = useRouter()

  const submit = () => {
    onSubmit()
    setTimeout(router.back, 500)
  }

  return (
    <>
      <Form action={submit}>
        <Form.Group className="mb-3" controlId="question">
          <Form.Label>Schiftingsvraag: {state.speeldag.schiftingsvraag}</Form.Label>
          <Form.Control type="number" min="0" max="10000" required
            onChange={onSchiftingsVraagChange} placeholder="Antwoord" disabled={inputsDisabled} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="joker">
          <Form.Check type="checkbox" checked={state.jokerChecked ?? false} onChange={onJokerChange}
            label="Joker inzetten?" disabled={inputsDisabled} />
        </Form.Group>

        <Button type="submit" variant="secondary">Verzenden</Button>
      </Form>
      {/*
      <form action={submit}>
        <h5>Schiftingsvraag:</h5>
        <label htmlFor="question">{state.speeldag.schiftingsvraag}</label>
        <input type="number" id="question" required min={0} max={10000} onChange={onSchiftingsVraagChange} disabled={inputsDisabled} />

        <div className="jokerContainer">
          <label htmlFor="joker">Gebruik joker?</label>
          <input type="checkbox" id="joker" checked={state.jokerChecked ?? false} onChange={onJokerChange} disabled={inputsDisabled} />
        </div>

      </form>
      */}
    </>
  );
};

/**
 * @param {object} props
 * @param {PanelState} props.state 
 */
const VoteResultPanel = ({ state }) => {
  // Function to generate circle span element
  const renderCircle = (matchResult, selectedVote, voteSign) => {
    let backgroundColor = "gray"; // Not selected but correct
    if (
      matchResult === (selectedVote?.toString() || "") &&
      matchResult === voteSign
    ) {
      backgroundColor = "lime"; // Correct vote
    } else if (
      matchResult !== (selectedVote?.toString() || "") &&
      (selectedVote?.toString() || "") === voteSign
    ) {
      backgroundColor = "blue"; // Incorrect vote
    } else if (
      matchResult !== (selectedVote?.toString() || "") &&
      matchResult === voteSign
    ) {
      backgroundColor = "red"; // Not selected and not correct
    }

    return (
      <span
        style={{
          backgroundColor,
          borderRadius: "50%",
          display: "inline-block",
          width: "15px",
          height: "15px",
          marginLeft: "0px",
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
        <p>{renderCircle("1", "2", "2")}: jouw stem</p>
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
                <td>
                  {renderCircle(
                    match.resultaat,
                    state.selectedOptions.find(
                      (item) => item.wedstrijd === match._id
                    )?.vote,
                    "1"
                  )}
                </td>
                <td>
                  {renderCircle(
                    match.resultaat,
                    state.selectedOptions.find(
                      (item) => item.wedstrijd === match._id
                    )?.vote,
                    "3"
                  )}
                </td>
                <td>
                  {renderCircle(
                    match.resultaat,
                    state.selectedOptions.find(
                      (item) => item.wedstrijd === match._id
                    )?.vote,
                    "2"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">
                Je kan niet stemmen wat je hebt nog niet betaald.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <JokerEnSchiftingsvraagPanel
        state={state}
        onJokerChange={() => { }}
        onSchiftingsVraagChange={() => { }}
        inputsDisabled={true}
      />
    </>
  );
};
