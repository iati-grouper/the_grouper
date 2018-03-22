import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import path from 'path';

import StudentRoutes from './routes/Students';
import GroupForm from './routes/GroupForm';

const indexHtml: string = path.resolve(__dirname, '../index.html');

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    const router = express.Router();
    this.express.use(bodyParser.json());
    router.get('/', (req: Request, res: Response) => {
      res.sendFile(indexHtml);
    });
    this.express.use('/', router);
    this.express.use('/students', StudentRoutes);
    this.express.use('/group_form', GroupForm);
    this.express.use('/dist', express.static('dist'));
    this.express.use('/assets', express.static('assets'));
  }
}

export default new App().express;
