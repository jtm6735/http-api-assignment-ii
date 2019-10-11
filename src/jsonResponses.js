const users = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};


const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};


const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);
const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);


const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name,location, and an image link are all required.',
  };

  if (!body.name || !body.location || !body.image) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
  }

  users[body.name].name = body.name;
  users[body.name].location = body.location;
  users[body.name].image = body.image;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    responseJSON.image = body.image;  
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  respondJSON(request, response, 404, responseJSON);
};


// public exports
module.exports = {
  getUsers,
  addUser,
  notFound,
  getUsersMeta,
  notFoundMeta,
};
