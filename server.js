const dotenv = require("dotenv");

dotenv.config({
  path: "./.env",
});

const app = require("./app");
const pool = require("./db/postgreSql");

const conncectDb = async () => {
  try {
    await pool.connect();
    console.log("CONNECTED TO POSTGRESS SUCCESSFUL");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

conncectDb();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
