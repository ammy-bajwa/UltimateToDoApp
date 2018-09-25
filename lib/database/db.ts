import * as uuid from 'uuid/v4';
let pg = require('pg');

let pool = new pg.Pool({
  port: 5432,
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  database: 'react_postgresql_todo',
  max: 10,
});



export class DB {
  //getTodo
  public getAll = async () => {
    let result = await pool.connect()
      .then((db) => {
        return db.query('select* from todo').then(table => {
            //console.log('get from db');
          return table.rows;
        }).catch(err => {
          return err;
        })
      })
      .catch(err => {
        return err;
      });
     return result;
  };

  //postTodo
  public save = async body => {
    let title = body.title;
    let description =body.description;
    let id = uuid();
    let done = false;  
    let values = [id,title,description,done];
    let result = await pool.connect()
    .then((db) => {
      return db.query('INSERT INTO todo(id,title,description,done) VALUES($1,$2,$3,$4)',[...values]).then(table => {
          return ({message:'Data inserted!'});
      }).catch(err => {
        return err;
      })
    })
    .catch(err => {
      return err;
    });
   return result;
};

  //updateTodo
  public update = async (body, _id) => {
    let title = body.title;
    let description = body.description;
    var id = _id;
    let done = true;  
    let values = [id,title,description,done];   
    let result = await pool.connect()
    .then((db) => {
      return db.query('UPDATE todo SET title=($2),description=($3),done=($4) WHERE id=($1)',[...values]).then(table => {
          return ({message: 'update success record'});
      }).catch(err => {
        return err;
      })
    })
    .catch(err => {
      return err;
    });
   return result;
  };

  //deleteTodo
  public remove = async _id => {
    let result = await pool.connect()
    .then((db) => {
      return db.query('DELETE FROM todo WHERE id=$1',[_id]).then(table => {
          return ({message: 'success in deleting record'});
      }).catch(err => {
        return err;
      })
    })
    .catch(err => {
      return err;
    });
   return result;
  };
}
