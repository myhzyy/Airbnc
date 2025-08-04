process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

const app = require("./app.js");

const PORT = process.env.PORT || 9090;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
