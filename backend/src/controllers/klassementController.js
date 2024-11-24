const seizoenKlassementEntry = require("../models/klassementEntries/seizoenKlassementEntry");
const speeldagKlassementEntry = require("../models/klassementEntries/speeldagKlassementEntry");
const { UserModel } = require("../models/user");
const { speeldagenModel } = require("../models/speeldag");
const { seizoenModel } = require("../models/seizoen");

const genereerSeizoenKlassement = async (seasonId) => {
	try {
		const newSeizoenKlassementEntries = [];

		// Haal het seizoen op met het meegegeven seasonId
		const seizoen = await seizoenModel.findById(seasonId);
		if (!seizoen) {
			throw new Error("Seizoen not found.");
		}

		// Populate alle benodigde data
		const currentSeizoen = await seizoen.populate({
			path: "speeldagen",
			populate: [
				{ path: "klassement" },
				{
					path: "speeldagVotes",
					populate: {
						path: "wedstrijdVotes",
						populate: {
							path: "wedstrijd",
						},
					},
				},
			],
		});

		const speeldagen = currentSeizoen.speeldagen;
		const users = await UserModel.find();

		currentSeizoen.klassement = [];
		let somSchiftingsVraagAntwoord = 0;

		for (const speeldag of speeldagen) {
			somSchiftingsVraagAntwoord += speeldag.schiftingsantwoord;

			for (const vote of speeldag.speeldagVotes) {
				const user = users.find(
					(u) => u._id.toString() === vote.user.toString()
				);
				let scoreOfUser = 0;
				let SchiftingsvraagAntwoord = vote.SchiftingsvraagAntwoord;
				let heefJokerGebruikt = vote.jokerGebruikt;

				for (const wedstrijdVote of vote.wedstrijdVotes) {
					const wedstrijdResult = wedstrijdVote.wedstrijd.resultaat;
					if (wedstrijdVote.vote === wedstrijdResult) {
						scoreOfUser += heefJokerGebruikt ? 2 : 1;
					}
				}

				const existingEntryIndex = newSeizoenKlassementEntries.findIndex(
					(entry) => entry.user.toString() === user?._id.toString()
				);

				if (existingEntryIndex !== -1) {
					newSeizoenKlassementEntries[existingEntryIndex].score += scoreOfUser;
					newSeizoenKlassementEntries[
						existingEntryIndex
					].SchiftingsvraagAntwoord += SchiftingsvraagAntwoord || 0;
				} else if (user && user._id) {
					newSeizoenKlassementEntries.push({
						user: user._id,
						score: scoreOfUser,
						jokerGebruikt: heefJokerGebruikt,
						SchiftingsvraagAntwoord: SchiftingsvraagAntwoord || 0,
						plaats: 0,
					});
				}
			}
		}

		// Sorteer de entries op score
		newSeizoenKlassementEntries.sort((a, b) => {
			const diffa = Math.abs(
				somSchiftingsVraagAntwoord - a.SchiftingsvraagAntwoord
			);
			const diffb = Math.abs(
				somSchiftingsVraagAntwoord - b.SchiftingsvraagAntwoord
			);
			return b.score === a.score ? diffa - diffb : b.score - a.score;
		});

		let i = 0;
		for (const klassementEntry of newSeizoenKlassementEntries) {
			klassementEntry.plaats = i + 1;
			const createdEntry = await seizoenKlassementEntry.create(klassementEntry);
			currentSeizoen.klassement.push(createdEntry._id);
			i++;
		}

		await currentSeizoen.save();
	} catch (error) {
		console.error("Fout bij het genereren van seizoen klassement:", error);
		throw error;
	}
};

const genereerWeekKlassement = async (speeldagId) => {
	try {
		let speeldag = await speeldagenModel.findById(speeldagId).populate({
			path: "speeldagVotes",
			populate: {
				path: "wedstrijdVotes",
				populate: {
					path: "wedstrijd",
				},
			},
		});

		//loop over all user calculate score for each user
		const speeldagVotes = speeldag.speeldagVotes;

		//delete all klassementEntries
		const speeldagKlassement = speeldag.klassement;
		speeldagKlassement.forEach(async (klassementEntry) => {
			await speeldagKlassementEntry.findByIdAndDelete(klassementEntry._id);
		});

		speeldag.klassement = [];
		await speeldag.save();

		let klassementEntries = await getUpdatedKlassementEntries(speeldagVotes);

		//sort klassementEntries by score
		klassementEntries.sort((a, b) => {
			let diffa = Math.abs(
				speeldag.schiftingsantwoord - a.SchiftingsvraagAntwoord
			);
			let diffb = Math.abs(
				speeldag.schiftingsantwoord - b.SchiftingsvraagAntwoord
			);
			if (b.score == a.score) {
				return diffa - diffb;
			}
			return b.score - a.score;
		});

		klassementEntries.forEach(async (klassementEntry, i) => {
			klassementEntry.plaats = i + 1;
			await klassementEntry.save();
			i++;
		});
		//push klassementEntries to speeldagklassement
		speeldag = await speeldag.save();
		speeldag.klassement.push(...klassementEntries);
		await speeldag.save();

		//console.log("Klassement regenerated successfully.");
	} catch (error) {
		throw error;
	}
};

/* ------------------------------------------
   speeldagen voor seizoen afhalen,
  ✅ seizoen ophalen, === hoe tf gaan we dit doen :> solved it:) actief seizoen ophalen
  ✅ per speeldag alle klassementVotes ophalen,
  ⬛ loop over alle klassementVotes,
  ⬛ scores per user optellen
  ⬛ als joker gebruikt score verdubbelen
  ⬛ klassementEntry updaten
*/

const getUpdatedKlassementEntries = async (speeldagVotes) => {
	let klassementEntries = [];

	const users = await UserModel.find();

	speeldagVotes.forEach((vote) => {
		const user = users.find(
			(user) => user._id.toString() === vote.user.toString()
		);

		let scoreOfUser = 0;
		let heefJokerGebruikt = vote.jokerGebruikt;
		let SchiftingsvraagAntwoord = vote.SchiftingsvraagAntwoord;

		vote.wedstrijdVotes.forEach((wedstrijdVote) => {
			const wedstrijdResult = wedstrijdVote.wedstrijd.resultaat;
			if (wedstrijdVote.vote === wedstrijdResult) {
				scoreOfUser += 1;
			}
			if (heefJokerGebruikt) {
				scoreOfUser = scoreOfUser * 2;
			}
		});
		if (user && user._id) {
			const newSpeeldagKlassementEntry = new speeldagKlassementEntry({
				user: user._id,
				score: scoreOfUser,
				plaats: 0,
				SchiftingsvraagAntwoord: SchiftingsvraagAntwoord,
				jokerGebruikt: heefJokerGebruikt,
			});

			klassementEntries.push(newSpeeldagKlassementEntry);
		}
	});
	return klassementEntries;
};

module.exports = {
	genereerSeizoenKlassement,
	genereerWeekKlassement,
};
