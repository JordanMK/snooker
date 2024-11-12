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
					) : (
						<tr>
							<td colSpan="4">
								Je kan niet stemmen want je hebt nog niet betaald
							</td>
						</tr>
					)}
				</tbody>
			</table>

			{hasUserPaid && (
				<>
					<JokerEnSchiftingsvraagPanel
						state={state}
						onJokerChange={onJokerChange}
						onSchiftingsVraagChange={onSchiftingsVraagChange}
					/>
					<button onClick={handleSubmit}>Verzenden</button>
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
  inputsDisabled=false,
}) => {
  return (
		<>
      {/*<h2>Vul schiftingsvraag in</h2>*/}
			<div className="jokerContainer checkbox-wrapper-13">
				<label htmlFor="c1-13">Gebruik joker?</label>
				<input
					type="checkbox"
					id="c1-13"
					checked={state.jokerChecked ?? false} // Use checked instead of defaultChecked
					onChange={onJokerChange}
          disabled={inputsDisabled}
				/>
			</div>
      {/* TODO(arthur): make this a select */}
      {/* TODO: client side validation on this form, currently dumps js error in the users face */}
			<div className="schiftingsContainer">
				<h4>Schiftingsvraag:</h4>
				<label htmlFor="schiftingsvraag">
					{state.speeldag.schiftingsvraag}
				</label>
        {/*
        <select disabled={inputsDisabled}>
        </select>
        */}
				<input
					type="number"
          inputMode="numeric"
					min="0"
					max="10000"
					id="schiftingsAntwoord"
					defaultValue={state.schiftingsAntwoord}
					onChange={onSchiftingsVraagChange}
					required
          disabled={inputsDisabled}
				/>
			</div>
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
		let backgroundColor;
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
		} else {
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
				onJokerChange={() => {}}
				onSchiftingsVraagChange={() => {}}
        inputsDisabled={true}
			/>
		</>
	);
};
