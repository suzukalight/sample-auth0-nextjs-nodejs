import express, { Express } from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';

import { applyLoggerMiddleware } from './middleware/logger-winston';

dotenv.config();

export const createExpressApp = (): Express => {
  // Create Express app instance
  const app = express();

  // Configure Express App
  app.use(cors());
  applyLoggerMiddleware(app);

  return app;
};

export const createHttpServer = (app: Express): http.Server => {
  // Create HTTP Server
  const httpServer = http.createServer(app);

  return httpServer;
};

export const runHttpServer = (httpServer: http.Server) => {
  // Run server and listen http request
  const port = process.env.PORT;
  httpServer.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}/graphql`);
  });
};
