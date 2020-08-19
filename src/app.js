const express = require('express');
const cors = require('cors');
const { uuid } = require('uuidv4');
const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// list repositories
app.get("/repositories", (request, response) => {
    return response.send(repositories);
});

//Create repository
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = { id: uuid(), title, url, techs, likes: 0 };
  
  repositories.push(repository);

  return response.json(repository);
});

//Update repository
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const existRep = repositories.find(existRep => existRep.id === id);
    
    if (!existRep) {
    return response.status(400).send('Bad Request');
  }

  existRep.title = title;
  existRep.url = url;
  existRep.techs = techs;

  return response.json(existRep);
  
});

//Delete repository
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const existRepIndex = repositories.findIndex(
  existRep => existRep.id === id
);

  if (existRepIndex < 0) {
  return response.status(400).send('Repository not found');
}

  repositories.splice(existRepIndex, 1);

  return response.status(204).send();
});

//Give a like to the repository 
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const existRep = repositories.find(existRep => existRep.id === id);

  if (!existRep) {
    return response.status(400).send('Bad Request')
  }

  existRep.likes++;
  return response.json(existRep)
});

module.exports = app;
