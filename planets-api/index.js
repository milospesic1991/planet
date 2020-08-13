const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const planetRoutes = require("./routes/planets");
const { getPlanets, reloadPlanets } = require("./data/planetsRepository");
const { deleteImages } = require("./storage-api/storageApi");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

app.use("/api/planets", planetRoutes.router);

let server = null;

server = app.listen(port, () => {
  reloadPlanets(() => {
    console.log("Data initialized");
  });
  console.log("listening on port %s...", server.address().port);
});

//#region CLEANUP
process.on("SIGTERM", () => {
  shutdown();
});

process.on("SIGINT", () => {
  shutdown();
});

const shutdown = async () => {
  console.log("Shutown signal received. Cleanup started.");
  await deleteImages(getPlanets().map((p) => p.imageName));
  server.close(() => {
    console.log("Server shutting down");
    process.exit(0);
  });
};

//#endregion
