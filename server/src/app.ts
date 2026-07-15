import express  from "express";
import cors from "cors";
import helmet from "helmet"

const app = express();


// Middlewares
app.use(express.json());

app.use(cors());
app.use(helmet());

// Routes
app.get("/", (_, res) => {
    res.json({message: "Welcome to the ScoutVeil AI server!"});
});

export default app;