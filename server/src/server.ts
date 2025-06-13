import app from "./app";
import connectDB from "./config/database";
import db from "./models/index";

const PORT = process.env.PORT || 8000;
const URI = process.env.MONGODB_URI;

const start = async () => {
  try {
    connectDB(URI!);
    initial();
    app.listen(PORT, () => {
      console.log("Server running on port:", PORT);
    });
  } catch (error) {
    console.log("Error connecting to database");
  }
};

start();

function initial() {
  db.Role.estimatedDocumentCount()
    .then((count) => {
      if (count === 0) {
        return Promise.all([
          new db.Role({ name: "user" }).save(),
          new db.Role({ name: "admin" }).save(),
          new db.Role({ name: "moderator" }).save(),
        ]);
      }
    })
    .then((roles) => {
      if (roles) {
        console.log(
          "Added 'user', 'admin', and 'moderator' to roles collection."
        );
      }
    })
    .catch((err) => {
      console.error("Error initializing roles:", err);
    });
}
