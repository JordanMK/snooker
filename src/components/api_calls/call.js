import { get } from "http";
const base_url = "http://localhost";
const port = 3001;
const speeldagenUrl = `${base_url}:${port}/api/speeldagen`;
const klassementUrl = `${base_url}:${port}/api/speeldagen/`;
const usersUrl = `${base_url}:${port}/api/users/`;
const seizoenenUrl = `${base_url}:${port}/api/seizoenen`;

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

export function getUserName(id){
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
