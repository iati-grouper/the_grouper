import express, {Request, Response} from 'express';
import Axios from 'axios';

class StudentRoutes {
  public express: express.Router;

  constructor() {
    this.express = express();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.express.get('', async (req: Request, res: Response) => {

      try {
        const result = await Axios.get<{ data: IStudent[] }>('http://localhost:3004/students');
        res
          .status(200)
          .send(result.data);
      } catch (error: any) {
        res
          .status(500)
          .send({message: 'Could not retrieve data from db', error});
      }
    });
  }

}

export default new StudentRoutes().express;
