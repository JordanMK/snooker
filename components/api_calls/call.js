import { get, request } from "http";

// when placing env variables in a .env.local, prefixed with a NEXT_PUBLIC_, nextjs
// will inline those variables in the build, removing the possiblility to obtain them
// at runtime, TODO: make these non inlined

const BASE_URL = function() {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL
  const port = process.env.NEXT_PUBLIC_API_PORT
  if (!url || !port) {
    throw new Error("env variables NEXT_PUBLIC_API_BASE_URL and NEXT_PUBLIC_API_PORT must be set")
  }

  return `${url}:${port}/api`
}()

const klassementUrl = `${BASE_URL}/speeldagen/`;
const usersUrl = `${BASE_URL}/users/`;
const seizoenenUrl = `${BASE_URL}/seizoenen`;
const speeldagVotesUrl = `${BASE_URL}/speeldagVotes/`
const speeldagenUrl = `${BASE_URL}/speeldagen/`
const loginUrl = `${BASE_URL}/auth/login`

export function getSpeeldagen() {
  return new Promise((resolve, reject) => {
    const request = get(`${seizoenenUrl}/`);
    request.on('response', (response) => {
      if (response.statusCode === 200) {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          const seizoenen = JSON.parse(data);
          const speeldagen = seizoenen[0].speeldagen;
          speeldagen.seizoenID = seizoenen[0]._id;
          resolve(speeldagen);
        });
      } else {
        reject(new Error('Failed to retrieve speeldagen'));
      }
    });
    request.on('error', (error) => {
      reject(error);
    });
  });
}

export function getSpeeldag(id) {
  return new Promise((resolve, reject) => {
    const request = get(`${klassementUrl}${id}`);
    request.on('response', (response) => {
      if (response.statusCode === 200) {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          const speeldag = JSON.parse(data);
          resolve(speeldag);
        });
      } else {
        reject(new Error(`Failed to retrieve speeldag with id ${id}`));
      }
    });
    request.on('error', (error) => {
      reject(error);
    });
  });
}

export function getSeizoenen() {
  return new Promise((resolve, reject) => {
    const request = get(seizoenenUrl);
    request.on('response', (response) => {
      if (response.statusCode === 200) {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          const seizoenen = JSON.parse(data);
          resolve(seizoenen);
        });
      } else {
        reject(new Error('Failed to retrieve speeldagen'));
      }
    });
    request.on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Season returned from the api.
 * @typedef Season
 * @prop {string} name
 * @prop {boolean} bevriesKlassement
 * @prop {string[]} klassement // ids
 * @prop {string[]} speeldagen // ids
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

// TODO: create a post() and get() abstraction

/**
 * @param {SeasonInput} season
 * @returns {Promise<Season>}
 */
export function createSeizoen(season) {
  console.warn(JSON.stringify(season))
  const apiUrl = `${BASE_URL}/seizoenen`
  const opts = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(season),
  }

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(apiUrl, opts)
      if (response.ok) {
        const season = await response.json()
        return resolve(season)
      }

      let errorMessage = `Request to ${apiUrl} failed with ${response.status}`

      // if the response is json, try to extract the "message" key
      if (response.headers.get("Content-Type")?.includes("application/json")) {
        // FIXME: is this _always_ safe to call?
        const error = await response.json()
        errorMessage += `: ${error.message ?? error}`
      } else {
        errorMessage += ` ${response.statusText}`
      }

      reject(new Error(errorMessage))
    } catch (error) {
      reject(new Error(`Creating season failed with error ${error.message}`))
    }
  })
}

export function getKlassementSpeeldag(id) {
  return new Promise((resolve, reject) => {
    const request = get(`${klassementUrl}${id}/klassement`);
    request.on('response', (response) => {
      if (response.statusCode === 200) {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          const klassement = JSON.parse(data);
          resolve(klassement);
          console.log("speeldagklassement is: " + JSON.stringify(klassement));
        });
      } else {
        reject(new Error(`Failed to retrieve klassement for speeldagen with id ${id}`));
      }
    });
    request.on('error', (error) => {
      reject(error);
    });
  });
}

export function getKlassementSeizoen(seizoenID) {
  console.log("id is in getklassmentespeeldag: " + seizoenID)
  return new Promise((resolve, reject) => {
    const request = get(`${seizoenenUrl}/${seizoenID}/klassement`);
    request.on('response', (response) => {
      if (response.statusCode === 200) {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          const klassement = JSON.parse(data);
          resolve(klassement);
          console.log("Klassement is: " + klassement);
        });
      } else {
        reject(new Error(`Failed to retrieve klassement for seizoen with id`));
      }
    });
    request.on('error', (error) => {
      reject(error);
    });
  });
}

export function getUser(id) {
  return new Promise((resolve, reject) => {
    const request = get(`${usersUrl}${id}`);
    request.on('response', (response) => {
      if (response.statusCode === 200) {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          const user = JSON.parse(data);
          resolve(user);
        });
      } else {
        reject(new Error(`Failed to retrieve user with id ${id}`));
      }
    });
    request.on('error', (error) => {
      reject(error);
    });
  });
}

export function getAllUsers() {
  return new Promise((resolve, reject) => {
    const request = get(usersUrl);
    request.on('response', (response) => {
      if (response.statusCode === 200) {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          const users = JSON.parse(data);
          resolve(users);
        });
      } else {
        reject(new Error('Failed to retrieve users'));
      }
    });
    request.on('error', (error) => {
      reject(error);
    });
  });
}

export function updateUserBetaald(userId, newBetaaldValue) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      path: `/api/users/${userId}`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const data = JSON.stringify({ betaald: newBetaaldValue });
    const req = request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 201) {
          resolve(JSON.parse(responseData));
        } else {
          reject(new Error(`Failed to update user ${userId}. Status code: ${res.statusCode}`));
        }
      });
    });

    // Handle errors
    req.on('error', (error) => {
      reject(error);
    });

    // Send the request body
    req.write(data);
    req.end();
  });
}

export function postSpeeldagJokerAndSchiftingsAntwoord(jokerGebruikt, schiftingsAntwoord, speeldagId) {
  return new Promise((resolve, reject) => {
    const options = {
      path: `${speeldagVotesUrl}${speeldagId}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const data = new {
      user: localStorage.getItem('userID'),
      jokerGebruikt: jokerGebruikt,
      SchiftingsvraagAntwoord: schiftingsAntwoord,
      wedstrijdVotes: []
    }
    const req = request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 201) {
          resolve(JSON.parse(responseData));
        } else {
          reject(new Error(`Failed to post joker and schiftingsantwoord. Status code: ${res.statusCode} ${responseData}`));
        }
      });
    });
    req.on('error', (error) => {
      reject(error);
    });
    req.write(data);
    req.end();
  });

}

export function putSpeeldagVote(obj, speeldagId) {
  return new Promise((resolve, reject) => {
    const options = {
      path: `${speeldagVotesUrl}${speeldagId}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    obj.user = localStorage.getItem('userID');
    const data = JSON.stringify(obj);

    const req = request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 201) {
          resolve(JSON.parse(responseData));
        } else {
          reject(new Error(`Failed to Post speeldag vote. Status code: ${res.statusCode}`));
        }
      });
    });

    req.write(data);
    req.end();
  })
}

export function postWedstrijd(date, thuis, uit, speeldagId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      path: `/api/speeldagen/${speeldagId}/wedstrijden`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const wedstrijdData = {
      datum: date,
      thuis: thuis,
      uit: uit
    };
    const data = JSON.stringify(wedstrijdData);

    const req = request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 201) {
          resolve(JSON.parse(responseData));
        } else {
          reject(new Error(`Failed to post wedstrijd. Status code: ${res.statusCode}`));
          resolve([]);
        }
      });
    });
    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}


export async function patchWedstrijd(date, thuis, uit, resultaat, wedstrijdId, seizoenId) {
  console.log("patching wedstrijd");
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      path: `/api/wedstrijden/${wedstrijdId}`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const wedstrijdData = {
      datum: date,
      resultaat: resultaat,
      thuis: thuis,
      uit: uit
    };
    const data = JSON.stringify(wedstrijdData);

    const req = request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', async () => { // Made this function async

        if (res.statusCode === 201) {
          console.log("Wedstrijd patched:", JSON.parse(responseData));
          try {
            await updateKlassementen(seizoenId);
            resolve(); // Resolve the promise after updating klassementen
          } catch (error) {
            console.error('Failed to update klassement:', error);
            reject(new Error('Failed to update klassement'));
          }
        } else {
          console.error("Failed to patch wedstrijd:", new Error(`Failed to patch wedstrijd. Status code: ${res.statusCode}`));
          reject(new Error(`Failed to patch wedstrijd. Status code: ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error("Failed to send request:", error);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

// TODO: unused param seizoenId
export function updateKlassementen(seizoenId) {
  return new Promise((resolve, reject) => {
    const options = {
      path: `${seizoenenUrl}/klassement`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const req = request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', async () => { // Using async for better handling
        if (res.statusCode === 200) {
          try {
            const seizoenen = await getSpeeldagen();
            if (seizoenen[0]) {
              await Promise.all(seizoenen.map(speeldag => updateSpeeldagKlassement(speeldag._id)));
              resolve(true);
            } else {
              resolve(false);
            }
          } catch (error) {
            console.error("Error processing speeldagen:", error);
            reject(new Error('Error processing speeldagen'));
          }
        } else {
          reject(new Error(`Failed to post klassement. Status code: ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('Request error:', error);
      reject(error);
    });

    req.end();
  });
}

function updateSpeeldagKlassement(speeldagId) {
  return new Promise((resolve, reject) => {
    const options = {
      path: `${speeldagenUrl}${speeldagId}/klassement`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const req = request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(true);
        } else {
          reject(new Error(`Failed to update speeldag klassement. Status code: ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('Request error:', error);
      reject(error);
    });

    req.end();
  });
}


export function patchSpeeldag(schiftingsvraag, schiftingsantwoord, startDatum, eindDatum, speeldagId) {
  return new Promise((resolve, reject) => {
    const options = {
      path: `${speeldagenUrl}${speeldagId}`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const speeldagData = {
      schiftingsantwoord: Number(schiftingsantwoord),
      schiftingsvraag: schiftingsvraag,
      startDatum: startDatum,
      eindDatum: eindDatum
    };
    const data = JSON.stringify(speeldagData);

    const req = request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 201) {
          resolve(JSON.parse(responseData));
        } else {
          reject(new Error(`Failed to post wedstrijd. Status code: ${res.statusCode}`));
          resolve([]);
        }
      });
    });
    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

export function beeindigSeizoen(seizoenId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      path: `/api/seizoenen/${seizoenId}`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const seizoenData = {
      seizoenBeeindigd: true
    };
    const data = JSON.stringify(seizoenData);

    const req = request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 201) {
          resolve(JSON.parse(responseData));
        } else {
          reject(new Error(`Failed to patch seizoen: ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}


export function postSpeeldag(schiftingsvraag, schiftingsantwoord, startDatum, einddatum, seizoenId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      path: `/api/seizoenen/${seizoenId}/speeldagen`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const speeldagData = {
      schiftingsantwoord: Number(schiftingsantwoord),
      schiftingsvraag: schiftingsvraag,
      wedstrijden: [],
      speeldagVotes: [],
      klassement: [],
      startDatum: startDatum,
      eindDatum: einddatum
    };
    console.log(speeldagData);
    const data = JSON.stringify(speeldagData);

    const req = request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 201) {
          resolve(JSON.parse(responseData));
        } else {
          reject(new Error(`Failed to post speeldag. Status code: ${res.statusCode}`));
          resolve([]);
        }
      });
    });
    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

export function deleteWedstrijd(wedstrijdId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      path: `/api/wedstrijden/${wedstrijdId}`,
      method: 'DELETE',
    };

    const req = request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 204) {
          resolve(); // Successfully deleted
        } else {
          reject(new Error(`Failed to delete wedstrijd. Status code: ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

export function patchSpeeldagVote(obj, speeldagVoteId) {
  return new Promise((resolve, reject) => {
    const options = {
      path: `${speeldagVotesUrl}update/${speeldagVoteId}`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const data = JSON.stringify(obj);

    const req = request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 201) {
          resolve(JSON.parse(responseData));
        } else {
          reject(new Error(`Failed to put speeldag vote. Status code: ${res.statusCode}`));
        }
      });
    });

    req.write(data);
    req.end();
  });
}

export function getUserVotesBySpeeldagId(speeldagId) {
  const loggedInUser = localStorage.getItem('userID');
  return new Promise((resolve, reject) => {
    const request = get(`${speeldagVotesUrl}${speeldagId}/${loggedInUser}/votes`);
    request.on('response', (response) => {
      if (response.statusCode === 200) {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          const votes = JSON.parse(data);
          resolve(votes);
        });
      } else {
        reject(new Error('Failed to retrieve votes'));
      }
    });
    request.on('error', (error) => {
      reject(error);
    });
  });

}

// TODO: use
// TODO: eventually convert user._id to user.id

/**
 * @typedef User
 * @prop {number} _id
 * @prop {string} email
 * @prop {boolean} admin
 */

/**
 * @returns {Promise<User>}
 * @param {string} email
 * @param {string} password
 */
export async function login(email, password) {
  const opts = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({ email: email.toLowerCase(), password }),
  }

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(loginUrl, opts)
      if (!response.ok) {
        return reject(new Error(`Request to ${loginUrl} failed with ${response.status} ${response.statusText}`))
      }

      const user = await response.json()
      resolve(user)
    } catch (e) {
      reject(new Error(`Login failed with error ${e.message}`))
    }
  })
}
