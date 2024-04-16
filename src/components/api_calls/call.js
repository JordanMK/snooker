import { get } from "http";
import { request } from 'http';
const base_url = "http://localhost";
const port = 3001;
const speeldagenUrl = `${base_url}:${port}/api/speeldagen/`;
const klassementUrl = `${base_url}:${port}/api/speeldagen/`;
const usersUrl = `${base_url}:${port}/api/users/`;
const seizoenenUrl = `${base_url}:${port}/api/seizoenen`;
const speeldagVotesUrl = `${base_url}:${port}/api/speeldagVotes/`

export function getSpeeldagen() {
  return new Promise((resolve, reject) => {
    const request = get(speeldagenUrl);
    request.on('response', (response) => {
      if (response.statusCode === 200) {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          const speeldagen = JSON.parse(data);
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
    const request = get(`${speeldagenUrl}${id}`);
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

export function getKlassement(id) {
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
    // Define the PATCH request options
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: `/api/users/${userId}`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // Define the data to be sent in the request body
    const data = JSON.stringify({ betaald: newBetaaldValue });

    // Create the PATCH request
    const req = request(options, (res) => {
      let responseData = '';

      // Concatenate response data chunks
      res.on('data', (chunk) => {
        responseData += chunk;
      });

      // Resolve or reject the promise based on response status
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

export function postSpeeldagVote(obj, speeldagId){
  return new Promise((resolve, reject) => {
    const options = {
      path: `${speeldagVotesUrl}${speeldagId}`,
      method: 'POST',
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
          resolve(JSON.parse([]));
        }
      });
    });

    req.write(data);
    req.end();
  })

  
}

export function patchSpeeldagVote(speeldagVoteId, obj) {
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
          resolve(JSON.parse([]));
        }
      });
    });

    req.write(data);
    req.end();
  });
}

export function getUserVotesBySpeeldagId(speeldagId){
  const loggedInUser = '65fd662229e6cb1a392fa77f'
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

