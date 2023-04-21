import mongoose from "mongoose";
const connection = async () => {
  mongoose.set('strictQuery', false)
  const URL = `mongodb://localhost:27017/blogdata`;
  try {
    await mongoose.connect(URL);
    console.log(`Database connected succesfully`);
  } catch (e) {
    console.log("error while connecting database", e);
  }
};
export default connection;
