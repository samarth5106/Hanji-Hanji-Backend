import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js";
dotenv.config({path:"./.env"});

connectDB()
.then(() => {
    const server = app.listen(
        process.env.PORT || 8000,
        () => {
            console.log(
                `Server is running on port ${process.env.PORT || 8000}`
            );
        }
    );
    server.on("error", (error) => {
        console.log("Error while starting the server", error);
        throw error;
    });
})
.catch((error) => {
    console.log("MongoDB connection failed", error);
});

