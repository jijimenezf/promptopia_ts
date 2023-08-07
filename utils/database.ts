import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log("--> MongoDB is already connected <--");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI  || '', {
      dbName: "share_prompt",
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Database connection is active");
  } catch (error) {
    console.error("An error occurred connecting to database, --> ", error);
  }
};

