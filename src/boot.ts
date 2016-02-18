import { provide } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import { applyMiddleware, compose, createStore, IStoreEnhancer } from 'redux';

import { getInitialState, IAppState, logger, rootReducer, TodoActions, store } from '../todo-lib/redux/core';

import { App } from './app';

bootstrap(App, [
    provide('AppStore', {useValue: store}),
    TodoActions
]);
