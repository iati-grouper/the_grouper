import express, { Request, Response } from 'express';
import path from 'path';

const indexHtml: string = path.resolve(__dirname, '../index.html');

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    const router = express.Router();
    router.get('/', (req: Request, res: Response) => {
      res.sendFile(indexHtml);
    });
    this.express.use('/', router);
    this.express.use('/dist', express.static('dist'));
  }
}

export default new App().express;
