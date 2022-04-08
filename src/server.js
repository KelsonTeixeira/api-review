const app = require("./app");


const PORT = 3333;

app.listen(PORT, () => {
  console.log("server is running...");
  console.log(`url: http://localhost:${PORT}`);
});