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
        // 1. get the students by calling the students endpoint (db server)
        //  http://localhost:3004/students?_embed=studentHistory
        const query: IGrouperQuery = req.body.groupQuery;
        const studentMappings = {};
        http.get({
            agent: false,  // create a new agent just for this one request
            hostname: 'localhost',
            path: '/students?_embed=studentHistory',
            port: 3004,
        }, (response: any) => {
            response.on('data', (chunk: any) => {
                const students = JSON.parse(chunk.toString());
                res.send(chunk.toString());
                students.map( (student: IStudent) => {
                    studentMappings[student.id] = {
                        "name": student.name,
                        "gender": student.gender,
                        "level": student.level,
                        "peers": []
                    };
                });
                console.log("students", students);
            });
        });
      // 2. reduce the history to a count attribute on students
      // 3. pass the aggregated data to the python app server
      // const requestOptions: http.RequestOptions = {
      //   host: 'localhost',
      //   method: 'POST',
      //   path: '/grouper',
      //   port: 5000,
      // };
      //
      // const request: http.ClientRequest = http.request(requestOptions, (response: http.ClientResponse) => {
      //   response.on('data', (chunk: any) => {
      //       // 4. return the result to the caller (ui server)
      //     res.send(chunk.toString());
      //   });
      // });
      //
      // request.write(JSON.stringify(query));
      // request.end();
    });
  }
}

export default new GroupFormRoute().express;
