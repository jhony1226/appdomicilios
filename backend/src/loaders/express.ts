import express from 'express';
import cors from 'cors';
import routes from '../api';
import config from '../config';
import path from  "path";
//var path = require('path');

export default ({ app }: { app: express.Application }) => {
  app.get('/status', (req, res) => {
    res.json({ peticion: 'exitosa' }).status(200).end();
  });

  app.head('/status', (req, res) => {
    res.json({ peticion: 'exitosa' }).status(200).end();
  });

  app.enable('trust proxy');
  app.use(cors());
<<<<<<< HEAD
  app.use(express.json()); 
=======
  app.use(express.json());
  app.use(express.static('public'));
  app.get("*",(req,res)=>{ 
  res.sendFile(path.resolve(__dirname,'../../public/index.html'));
  })

>>>>>>> fa051f50b4e13bc3fdbbfd2996dd76abe9520df4
  app.use(config.api.prefix, routes());
  app.use(express.static('public'));
  app.get("*",(req,res)=>{  
    res.sendFile(path.resolve(__dirname,'../../public/index.html'));
   }) 

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  }); 

  

   
};
 

