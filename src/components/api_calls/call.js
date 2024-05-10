import { get } from "http";
import { request } from 'http';
const base_url = "http://localhost";
const port = 3001;
const klassementUrl = `${base_url}:${port}/api/speeldagen/`;
const usersUrl = `${base_url}:${port}/api/users/`;
const seizoenenUrl = `${base_url}:${port}/api/seizoenen`;
const speeldagVotesUrl = `${base_url}:${port}/api/speeldagVotes/`
const speeldagenUrl = `${base_url}:${port}/api/speeldagen/`

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

export function getSpeeldag(id){
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
    const request = get(`${seizoenenUrl}/`);
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

export function getUser(id){
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
      port: port,
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
        if (res.statusCode === 200) {
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
          reject(new Error(`Failed to post joker and schiftingsantwoord. Status code: ${res.statusCode}`));
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

export function putSpeeldagVote(obj, speeldagId){
  return new Promise((resolve, reject) => {
    const options = {
      path: `${speeldagVotesUrl}${speeldagId}`,
      method: 'PUT',
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
      port: port,
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

export function patchWedstrijd(date, thuis, uit, resultaat, wedstrijdId, seizoenId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: port,
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

      res.on('end', () => {
        if (res.statusCode === 201) {
          resolve(JSON.parse(responseData));
          updateKlassementen(seizoenId);
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

export function patchSpeeldag(schiftingsvraag,schiftingsantwoord, startDatum, eindDatum, speeldagId) {
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

export function postSpeeldag(schiftingsvraag, schiftingsantwoord, startDatum, einddatum, seizoenId ) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: port,
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
      port: port,
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

export function getUserVotesBySpeeldagId(speeldagId){
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

export function updateKlassementen(seizoenId){
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

      res.on('end', () => {
        if (res.statusCode === 200) {
          getSpeeldagen().then((seizoenen) => {
            console.log(seizoenen)
            seizoenen[0] &&  seizoenen.forEach(speeldag => {
              console.log("Updating klassement for speeldag: " + speeldag._id);
              updateSpeeldagKlassement(speeldag._id)
            });
          })
        } else {
          reject(new Error(`Failed to Post speeldag vote. Status code: ${res.statusCode}`));
        }
      });
    });

    req.end();
  })
}


function updateSpeeldagKlassement(speeldagId){
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
        } else {
          reject(new Error(`Failed to Post speeldag vote. Status code: ${res.statusCode}`));
        }
      });
    });

    req.end();
  })
}
