/// <reference path="../grouper.d.ts" />
import express, { Request, Response } from 'express';
import http from 'http';

class GroupFormRoute {
  public express: express.Router;

  constructor() {
    this.express = express();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.express.post('', (req: Request, res: Response) => {
      const query: IGrouperQuery = req.body.groupQuery;
      // 1. get the students by calling the students endpoint (db server)
      //  http://localhost:3004/students?_embed=studentHistory
        const students = [];
      // 2. reduce the history to a count attribute on students
      const studentMappings = {};
        students.map((student: IStudent) => {
        studentMappings[student.id] = [];
      });
      // 3. pass the aggregated data to the python app server
      // 4. return the result to the caller (ui server)
      const requestOptions: http.RequestOptions = {
        host: 'localhost',
        method: 'POST',
        path: '/grouper',
        port: 5000,
      };

      const request: http.ClientRequest = http.request(requestOptions, (response: http.ClientResponse) => {
        response.on('data', (chunk: any) => {
          res.send(chunk.toString());
        });
      });

      request.write(JSON.stringify(query));
      request.end();
    });
  }
}

export default new GroupFormRoute().express;
