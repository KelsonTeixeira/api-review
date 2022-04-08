/* eslint-disable no-undef */
const request = require("supertest");
const { validate } = require("uuid");

const app = require("../src/app");
const GenerateFakeClients = require("./GenerateFakeClients");

const generateFakeClients = new GenerateFakeClients();

describe("Clients", () => {
  it("should be able to add a new client", async () => {
    const client = generateFakeClients.execute();

    const clientResponse = await request(app)
      .post("/")
      .send(client);

    expect(clientResponse.status).toBe(201);
    expect(validate(clientResponse.body.id)).toBeTruthy();
    expect(clientResponse.body).toMatchObject({
      ...client,
    });

  });

  it("sholud be able to list all clients", async () => {
    const client1 = generateFakeClients.execute();
    const client2 = generateFakeClients.execute();

    const client1Response = await request(app)
      .post("/")
      .send(client1)
      .expect(201);

    const client2Response =  await request(app)
      .post("/")
      .send(client2)
      .expect(201);

    const clientConsult = await request(app)
      .get("/");

    expect(clientConsult.status).toBe(200);
    expect(clientConsult.body).toContainEqual(client1Response.body);
    expect(clientConsult.body).toContainEqual(client2Response.body);

  });

  it("sholud be able to delete a client by id", async() => {
    const client = generateFakeClients.execute();

    const clientCreated = await request(app)
      .post("/")
      .send(client)
      .expect(201);

    await request(app)
      .delete(`/${clientCreated.body.id}`)
      .expect(204);

    const clientResponse = await request(app)
      .get("/");

    expect(clientResponse.body).not.toContainEqual(clientCreated.body);
  });

  it("should not be able to delete a client by a non existin id", async() => {
    const client = generateFakeClients.execute();

    const clientCreated = await request(app)
      .post("/")
      .send(client)
      .expect(201);
    
    await request(app)
      .delete(`/${clientCreated.body.id}non-existing-id`)
      .expect(404);

  });

  it("should be able to update a client name by id", async() => {
    const client = generateFakeClients.execute();

    const clientCreated = await request(app)
      .post("/")
      .send(client)
      .expect(201);

    const updatedClient = await request(app)
      .patch(`/${clientCreated.body.id}`)
      .send({ name: "New name"});

    expect(updatedClient.status).toBe(200);
    expect(updatedClient.body).toMatchObject({
      ...clientCreated.body,
      name: "New name"
    });

  });

  it("should not be able to update a client name by a non existin id", async() => {
    const client = generateFakeClients.execute();

    const clientCreated = await request(app)
      .post("/")
      .send(client)
      .expect(201);
    
    await request(app)
      .patch(`/${clientCreated.body.id}non-existing-id`)
      .send({ name: "New name"})
      .expect(404);

  });
});