    import  express, {   Application } from "express";
    import mongoose from "mongoose";
    import dotenv from "dotenv";
    import cors from "cors";

    const todoItemRoute = require("./routes/todoRoutes")    ;


    dotenv.config();

    const app: Application = express();

    app.use(express.json());

    const PORT : number | string = process.env.PORT || 5000;

    app.use(cors());



    const connectToDatabase = async (): Promise<void> => {
        try {
          await mongoose.connect(process.env.MONGODB_CONNECT!);
          console.log("Database Connected");
        } catch (err) {
          console.error(err);
        }
      };
      
      connectToDatabase().catch((err ) => console.error(err));




    app.use("/", todoItemRoute);

    app.listen(PORT,()=>{
        console.log(`Server is running at: http://localhost:${PORT}`);
    })
