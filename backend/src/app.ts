import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import createConnection from 'infra/typeorm';
import { costumerRoutes } from './routes/customer.routes';
import "./container";
import { AppError } from "errors/AppError";
import { typeRoutes } from "routes/type.routes";
import { serviceRoutes } from "routes/service.routes";
import { registerRoutes } from "routes/register.routes";

createConnection();
const app = express();

app.use(express.json());

app.use(cors({}));

app.use(costumerRoutes);
app.use(typeRoutes);
app.use(serviceRoutes);
app.use(registerRoutes);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: "error",
                message: err.message
            });
        }

        return response.status(500).json({
            status: "error",
            message: `Internal server error - ${err.message}`
        });
    })

export { app };