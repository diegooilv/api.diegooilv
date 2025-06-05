import express from "express";
import cors from "cors";
import helmet from "helmet"; // Helmet para cabeçalhos de segurança
import rateLimit from "express-rate-limit"; // Rate Limiting
import routes from "./routes/index.js";
import { logRequests } from "./middlewares/logRequests.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// Helmet para proteger a aplicação com cabeçalhos HTTP de segurança
app.use(helmet());

// Rate Limiting para evitar ataques de força bruta
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutos
  max: 50, // Limite de 10 requisições por IP
  message:
    "Muitas requisições feitas de seu IP. Tente novamente depois de 5 minutos.",
});
app.use(limiter);

app.use(cors());

// Middleware para tratar os logs de requisições
app.use(express.json()); // Necessário para lidar com o corpo das requisições JSON
app.use(logRequests); // Log de todas as requisições

// Adicionando as rotas da aplicação
app.use(routes); // Prefixo das rotas

// Middleware para lidar com rotas não encontradas (404)
app.use(notFound);

// Middleware para tratamento de erros
app.use(errorHandler);

export default app;
