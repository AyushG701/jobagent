import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Db Connected Succcefully ");
  } catch (error) {
    console.log("Db Error " + error);
  }
};
export default dbConnection;
