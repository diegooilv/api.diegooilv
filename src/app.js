import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { logRequests } from "./middlewares/logRequests.js";
import { validKey } from "./middlewares/validKey.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(logRequests);

app.use(routes); // prefixo das suas rotas

app.use(notFound);
app.use(errorHandler);

export default app;
