import mongoose from "mongoose";
const username = process.env.dbUname;
const password = process.env.dbPass;
const dbName = process.env.dbName;

export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
    `mongodb+srv://${username}:${password}@clusterdeployment.k87fsfx.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Clusterdeployment`
    );
    console.log("Database connected. ");
  } catch (error) {
    console.log(error);
  }
};
