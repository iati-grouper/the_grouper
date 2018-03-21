/// <reference path="../grouper.d.ts" />
import express, { Request, Response } from 'express';
import http from 'http';

const mock = require('../../db/db.json').students;

class GroupFormRoute {
  public express: express.Router;

  constructor() {
    this.express = express();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.express.post('', (req: Request, res: Response) => {
      const query: IGrouperQuery = req.body.groupQuery;

      const requestOptions: http.RequestOptions = {
        host: '169.254.174.142',
        method: 'POST',
        path: '/grouper',
        port: 5000,
      };

      const request: http.ClientRequest = http.request(requestOptions, (response: http.ClientResponse) => {
        response.on('data', (chunk: any) => {
          console.log('GroupForm chunk');
          console.log(chunk);
        });
      });

      request.write(JSON.stringify(query));
      request.end();
    });
  }
}

export default new GroupFormRoute().express;
