import mongoose from "mongoose";

const connectDatabase = async () => {
  return await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@assistgo.iups8.mongodb.net/AssistGo?retryWrites=true&w=majority`,
    (error: any) => {
      if (error) throw error;
      console.log(`Connected to MongoDB Database!`);
    },
  );
};

export default connectDatabase;
