import http from 'http';
import app from './app.js';
import { conectarMongoDB, conectarPostgreSQL } from './config/db.js';
import dotenv from 'dotenv';
import { setupWebSocket } from './sockets/setupSockets.js';

dotenv.config();

const startServer = async () => {
  try {
    await conectarMongoDB();
    conectarPostgreSQL();
    console.log('Banco de dados conectado com sucesso!');

    const port = process.env.PORT || 3000;
    const server = http.createServer(app);

    setupWebSocket(server); 

    server.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1);
  }
};

startServer();
