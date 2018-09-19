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
      .post((req: Request, res: Response) => {
        if (!req.body.title) {
          res.status(400).send({ error: "Please Enter a title" });
        } else if (!req.body.description) {
          res.status(400).send({ error: "Please Enter a title" });
        } else {

    let title = req.body.title;
    let description = req.body.description;
    let id = uuid();
    let done = false;  
    let values = [id,title,description,done];
    pool.connect((err,db,done)=>{
        if(err){
            return res.status(404).send(err);
        }
        else{           
            db.query('INSERT INTO todo(id,title,description,done) VALUES($1,$2,$3,$4)',[...values],(err,table) =>{
                done();
                if(err){
                    return res.status(404).send(err);
                }
                else {
                    console.log('insert into db');
                    res.status(200).send({message:'Data inserted!'});
                }
            })            
        }
    })
        }
      });

     }
}
