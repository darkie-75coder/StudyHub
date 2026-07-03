const app = require("./src/app");
const config = require("./src/Config/config");
const connectDB = require("./src/db/db");

const PORT = 3000 || config.PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
