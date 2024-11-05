const BASE_URL = (function () {
	const url = process.env.API_URL;
	if (!url) {
		throw new Error("env variable API_URL must be set");
	}
	// URL constructor in request() requires base to have a trailing slash
	// otherwise it ignores segments
	return url.endsWith("/") ? url : url + "/";
})();

const get = (extraUrl) => request("GET", extraUrl);

const post = (extraUrl, bodyObj) => {
	assert(bodyObj != null);
	return request("POST", extraUrl, bodyObj);
};

const patch = (extraUrl, bodyObj) => {
	assert(bodyObj != null);
	return request("PATCH", extraUrl, bodyObj);
};

const put = (extraUrl, bodyObj) => {
	assert(bodyObj != null);
	return request("PUT", extraUrl, bodyObj);
};

const delete_ = (extraUrl) => request("DELETE", extraUrl);

const assert = (cond) => {
	if (!cond) {
		throw new Error("assertion failed");
	}
};

/**
 * @param {"GET" | "POST" | "PUT" | "PATCH" | "DELETE"} method
 * @param {string} extraUrl
 * @param {object | undefined} bodyObj
 * @param {object | undefined} extraFetchOpts
 */
const request = (method, extraUrl, bodyObj, extraFetchOpts) => {
	if (extraUrl[0] === "/") extraUrl = extraUrl.slice(1);
	const url = new URL(extraUrl, BASE_URL).toString();

	const opts = {
		method,
		headers: new Headers({ "Content-Type": "application/json" }),
		body: bodyObj != undefined ? JSON.stringify(bodyObj) : null,
		...extraFetchOpts,
	};

	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(url, opts);
			if (response.ok) {
				const data = await response.json();
				return resolve(data);
			}

			let errorMessage = `Request to ${url} failed with code ${response.status}: `;

			// if the response is json, try to extract the "message" key, sometimes the api returns this, sometimes it doesnt
			if (response.headers.get("Content-Type")?.includes("application/json")) {
				// FIXME: is this _always_ safe to call?
				const error = await response.json();
				errorMessage += error.message ?? error;
			} else {
				errorMessage += response.statusText;
			}

			reject(new Error(errorMessage));
		} catch (error) {
			reject(
				new Error(`Failed to reach api(${url}): ${error.message}`, {
					cause: error,
				})
			);
		}
	});
};

export const getSpeeldagen = async () => {
	const [season] = await get("/seizoenen");
	const speeldagen = season.speeldagen;
	speeldagen.seizoenID = season._id;
	return speeldagen;
};

export const getSpeeldagenBySeizoenId = (seasonId) =>
	get(`/seizoenen/${seasonId}/speeldagen`);

export const updateSpeeldagIsOnline = (speeldagId, isOnline) =>
	put(`/speeldagen/${speeldagId}/isOnline`, { isOnline });

export const getSpeeldag = (id) => get(`/speeldagen/${id}`);

export const getSeizoenen = () => get("/seizoenen");

/**
 * Season returned from the api.
 * @typedef Season
 * @prop {string} name
 * @prop {boolean} bevriesKlassement
 * (ids)
 * @prop {string[]} klassement
 * (ids)
 * @prop {string[]} speeldagen
 * @prop {Date} startDatum
 * @prop {boolean} seizoenBeeindigd
 * @prop {number} aantalJokers
 */

/**
 * Season input obtained from a form.
 * @typedef SeasonInput
 * @prop {string} name
 * @prop {Date} startDatum
 * @prop {boolean} seizoenBeeindigd
 * @prop {number} aantalJokers
 */

/**
 * @param {SeasonInput} season
 * @returns {Promise<Season>}
 */
export const createSeizoen = (season) => post("/seizoenen", season);

export const getKlassementSpeeldag = (id) =>
	get(`/speeldagen/${id}/klassement`);

export const getKlassementSeizoen = (seasonId) =>
	get(`/seizoenen/${seasonId}/klassement`);

export const getUser = (id) => get(`/users/${id}`);

export const getAllUsers = () => get("/users");

export const updateUserBetaald = (userId, betaald) =>
	patch(`/users/${userId}`, { betaald });

export const postSpeeldagJokerAndSchiftingsAntwoord = (
	jokerGebruikt,
	schiftingsAntwoord,
	speeldagId
) => {
	const data = {
		user: localStorage.getItem("userID"),
		jokerGebruikt,
		SchiftingsvraagAntwoord: schiftingsAntwoord,
		wedstrijdVotes: [],
	};
	return post(`/speeldagVotes/${speeldagId}`, data);
};

export const putSpeeldagVote = (data, speeldagId) => {
	data.user = localStorage.getItem("userID");
	return put(`/speeldagVotes/${speeldagId}`, data);
};

export const postWedstrijd = (date, thuis, uit, speeldagId) => {
	const data = { datum: date, thuis, uit };
	return post(`/speeldagen/${speeldagId}/wedstrijden`, data);
};

export const patchWedstrijd = async (
	date,
	thuis,
	uit,
	resultaat,
	wedstrijdId,
	seizoenId
) => {
	const data = { datum: date, resultaat, thuis, uit };

	try {
		await patch(`/wedstrijden/${wedstrijdId}`, data);
		console.log("patching wedstrijd with data:", data);

		await Promise.all(await updateKlassementen(seizoenId)); // TODO: KAPOT
	} catch (error) {
		return Promise.reject(
			new Error(
				`Failed to patch wedstrijd or update klassement: ${error.message}`
			)
		);
	}
};

// TODO: unused param seasonId
export const updateKlassementen = async (seasonId) => {
	const speeldagen = await getSpeeldagen();
	return speeldagen.map((speeldag) => updateSpeeldagKlassement(speeldag._id));
};

export const updateSpeeldagKlassement = (speeldagId) =>
	post(`/speeldagen/${speeldagId}/klassement`, {});

export const patchSpeeldag = async (
	schiftingsvraag,
	schiftingsantwoord,
	startDatum,
	eindDatum,
	speeldagId
) => {
	const data = {
		schiftingsantwoord: Number(schiftingsantwoord),
		schiftingsvraag: schiftingsvraag,
		startDatum: startDatum,
		eindDatum: eindDatum,
	};

	return patch(`/speeldagen/${speeldagId}`, data);
};

export const beeindigSeizoen = (seasonId) =>
	patch(`/seizoenen/${seasonId}`, { seizoenBeendigd: true });

export const postSpeeldag = (
	schiftingsvraag,
	schiftingsantwoord,
	startDatum,
	einddatum,
	seizoenId
) => {
	const data = {
		schiftingsantwoord: Number(schiftingsantwoord),
		schiftingsvraag: schiftingsvraag,
		wedstrijden: [],
		speeldagVotes: [],
		klassement: [],
		startDatum: startDatum,
		eindDatum: einddatum,
	};

	return post(`/seizoenen/${seizoenId}/speeldagen`, data);
};

export const deleteWedstrijd = (wedstrijdId) =>
	delete_(`/wedstrijden/${wedstrijdId}`);

export const patchSpeeldagVote = (obj, voteId) =>
	patch(`/speeldagVotes/update/${voteId}`, { obj });

export const getUserVotesBySpeeldagId = (speeldagId) => {
	const loggedInUser = localStorage.getItem("userID");
	return get(`/speeldagVotes/${speeldagId}/${loggedInUser}/votes`);
};

/**
 * @returns {Promise<boolean>}
 */
export const getAdminStatus = async () => {
	const data = await request("GET", "/auth/status", undefined, {
		credentials: "include",
	});
	return data.isAdmin;
};
