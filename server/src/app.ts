import express  from "express";
import cors from "cors";
import helmet from "helmet"
import { env } from "./config/env";
import { authRouter } from "./modules/users";
import cookieParser from "cookie-parser";
import { competitorRouter } from "./modules/competitors";
import { signalMonitorRouter } from "./modules/signal-monitor";
import { errorMiddleware } from "./shared/middlewares/error.middleware";

const app = express();


// Middlewares
app.use(express.json());

app.use(cookieParser());

app.use(helmet());

const normalizeOrigin = (value: string) => value.replace(/\/+$/, "");

const allowedOrigins = Array.from(new Set([
  "http://localhost:5173",
  normalizeOrigin(env.FRONTEND_URL),
]));

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(normalizeOrigin(origin))) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

// Routes
app.get("/", (_, res) => {
    res.json({message: "Welcome to the ScoutVeil AI server!"});
});

// Module routers method
app.use("/auth", authRouter );
app.use("/competitors", competitorRouter);
app.use("/signals", signalMonitorRouter);


app.use(errorMiddleware);

export default app;