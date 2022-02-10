import mongoose from "mongoose";

const dbConnection = () => {
  try {
    mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection with mongoDB ok");
  } catch (error) {
    console.log("Error connecting to mongoDb\n", error);
  }
};
export default { dbConnection };
