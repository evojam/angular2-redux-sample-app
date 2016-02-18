import { Component, Inject, OnDestroy, OnInit } from 'angular2/core';
import { Store, IUnsubscribe } from 'redux';

import { AddItem, FilterLink, TodoList, TodoListHeader } from './directives/index';
import { syncStorage, IAppState } from '../todo-lib/redux/core';
import { ITodoList } from '../todo-lib/dto';
import { FilterType } from '../todo-lib/filters';

@Component({
    directives: [AddItem, FilterLink, TodoList, TodoListHeader],
    selector: 'my-app',
    templateUrl: '/src/app.html'
})
export class App implements OnInit, OnDestroy {

    constructor(
        @Inject('AppStore') private appStore: Store<IAppState>
    ) {}

    private get lists(): ITodoList[] {
        return this.appStore.getState().todoLists;
    }

    private get filter(): FilterType {
        return this.appStore.getState().currentFilter;
    }

    private get currentId(): string {
        return this.appStore.getState().currentListId;
    }

    private unsubscribe: IUnsubscribe;

    public ngOnInit(): void {
        this.unsubscribe = this.appStore.subscribe(() => syncStorage(this.appStore.getState()));
    }

    public ngOnDestroy(): void {
        this.unsubscribe();
    }

}
