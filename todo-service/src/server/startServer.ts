import express, { NextFunction, Request, Response } from "express";
import setupRoutes from "./routes"
import cors from "cors"

const PORT = 3300

const startServer = () => {
    const app = express();

    app.use( express.json() )

    app.use(
        cors({
          credentials: true,
          origin: process.env.CLIENT_URL
        })
    );
    setupRoutes(app);
    
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        return res.status(500).json({message: err.message});
    })

    app.listen(PORT, "0.0.0.0", () => {
        console.log("App listening on ", PORT);
    })
}
export default startServer