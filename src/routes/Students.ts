import express, { Request, Response } from 'express';
import http from 'http';

class StudentRoutes {
  public express: express.Router;

  constructor() {
    this.express = express();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.express.get('', (req: Request, res: Response) => {

      http.get({
        agent: false,  // create a new agent just for this one request
        hostname: 'localhost',
        path: '/students',
        port: 3004,
      }, (response: any) => {
        response.on('data', (chunk: any) => {
          res.send(chunk.toString());
        });
      });
    });
  }
}

export default new StudentRoutes().express;
