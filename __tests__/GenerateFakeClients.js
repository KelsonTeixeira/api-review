const { faker } = require("@faker-js/faker");

class GenerateFakeClients {
  execute() {
    const client = {
      name: faker.name.findName(),
      city: faker.address.cityName()
    };

    return client;
  }
}

module.exports = GenerateFakeClients;