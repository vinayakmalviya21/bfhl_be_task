const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const bfhlRoutes = require("./routes/bfhl");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: 'https://bfhl-fe-task.vercel.app', 
    methods: ['POST', 'GET', 'PUT', 'DELETE']
  }));

app.use("/bfhl", bfhlRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
