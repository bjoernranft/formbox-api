import { Injectable } from 'injection-js';
import * as consign from 'consign';

@Injectable()
export class ConfigurationService {
  private config: any = {};

  constructor() {
    consign({ cwd: process.env.CONFIG }).include('.').into(this.config);
  }

  getFragment(name: string): string {
    return `assets/${this.config.fragments[ name ]}`;
  }

}