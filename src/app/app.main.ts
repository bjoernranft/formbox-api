import { Injectable, Inject } from 'injection-js';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Router } from 'express-serve-static-core';
import { Logger } from 'ts-log-debug';

@Injectable()
export class AppMain {
  private app: express.Application;
  private log: Logger;

  constructor( @Inject('Logger') log: Logger,
    @Inject('Application') app: express.Application,
    @Inject('DatabaseApi') db: Router) {
    this.log = log;
    this.log.debug('AppMain init.');
    this.app = app;
    this.startServer(db);

  }

  startServer(db: Router) {
    this.log.debug('Starte Server.');

    this.app.set('port', 4201);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use('/db', db);

    this.app.listen(this.app.get('port'), () => {
      this.log.info(('App is running at http://localhost:%d.'), this.app.get('port'));
    });
  }
}

