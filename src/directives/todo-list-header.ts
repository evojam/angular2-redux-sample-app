import { Component, Input } from 'angular2/core';

import { ITodoList } from '../../todo-lib/dto';
import { TodoActions } from '../../todo-lib/redux/core';

@Component({
    host: {'class': 'todo-list-item-header'},
    selector: '[todo-list-header]',
    templateUrl: '/src/directives/todo-list-header.html'
})
export class TodoListHeader {

    constructor(private todoActions: TodoActions) {}

    @Input('todo-list-header') private todoList: ITodoList;

}
