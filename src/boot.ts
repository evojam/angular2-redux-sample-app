import { bootstrap } from 'angular2/platform/browser';
import { HTTP_PROVIDERS } from 'angular2/http';

import { App } from './app';
import { UserDao } from './services/user-dao';

bootstrap(App, [HTTP_PROVIDERS, UserDao]);
