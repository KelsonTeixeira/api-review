const express = require("express");
const {v4: uuidV4 } = require("uuid");
const swaggerUI = require("swagger-ui-express");

const swaggerFile = require("./swagger.json");

const app = express();

app.use(express.json());

const clients = [];

app.use("/api-documentation", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.get("/", (request, response) => {
  return response.status(200).json(clients);
});

app.post("/", (request, response) => {
  const { name, city } = request.body;

  const client = {
    name, 
    city, 
    id: uuidV4()
  };

  clients.push(client);

  return response.status(201).json(client);
});

app.patch("/:id", (request, response) => {
  const { id } = request.params;
  const { name } = request.body;

  const client = clients.find(client => client.id === id);

  if(!client) return response.status(404).json({ error: "client not found"});

  client.name = name;

  return response.status(200).json(client);
});

app.delete("/:id", (request, response) => {
  const { id } = request.params;

  const clientIndex = clients.findIndex(client => client.id === id);

  if(clientIndex < 0) return response.status(404).json({ error: "id not found"});

  clients.splice(clientIndex, 1);

  return response.status(204).send();
});

module.exports = app;