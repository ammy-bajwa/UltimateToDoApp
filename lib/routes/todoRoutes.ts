import { Request, Response } from "express";
import * as uuid from 'uuid/v4'
let pg = require('pg');

let pool = new pg.Pool({
  port: 5432,
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  database: 'react_postgresql_todo',
  max: 10,
});

export class Routes {
  public routes(app): void {
    app
      .route("/api/todos")
      .get((req: Request, res: Response) => {
        pool.connect((err,db,done)=>{
          if(err){
              return res.status(404).send(err);
          }
          else{           
              db.query('select* from todo',(err,table) =>{
                  done();
                  if(err){
                      return res.status(404).send(err);
                  }
                  else {         
                      res.status(200).send(table.rows);
                  }
              })            
          }
      })
      })
      
  }
}
