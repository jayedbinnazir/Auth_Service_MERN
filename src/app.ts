import express from "express";

const app = express();

app.get("/", (req, res) => {
   res.send("auth-service");
});

export default app;
