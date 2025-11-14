const API_BASE = "/api/users";

/*
Handles response from the server and parses it as a JSON
*/
const handleResponse = async (response) => {
  try {
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to parse response JSON:", err);
    throw err;
  }
};

/*
Handles erorrs  that may happen during API calls
*/
const handleError = (err) => {
  console.error("API call failed:", err);
  throw err;
};

/*Create operation of CRUD
Sends a POST request to '/api/users' to create a new user with the provided user data.
*/
const create = async (user) => {
  try {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

/* 
GET response from the server to retrieve a list of all users.
*/
const list = async (signal) => {
  try {
    const response = await fetch(API_BASE, {
      method: "GET",
      signal,
    });
    return await handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

const read = async ({ userId }, { t }, signal) => {
  try {
    const response = await fetch(`${API_BASE}/${userId}`, {
      method: "GET",
      signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`,
      },
    });
    return await handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

const update = async ({ userId }, { t }, user) => {
  try {
    const response = await fetch(`${API_BASE}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`,
      },
      body: JSON.stringify(user),
    });
    return await handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

const remove = async ({ userId }, { t }) => {
  try {
    const response = await fetch(`${API_BASE}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`,
      },
    });
    return await handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

export { create, list, read, update, remove };
