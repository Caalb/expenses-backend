import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";

console.log(path.join(__dirname, "routes/*.ts"));
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Expenses Control",
      version: "1.0.0",
    },
  },
  apis: [path.join(__dirname, "routes/*.ts")],
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export { setupSwagger };
