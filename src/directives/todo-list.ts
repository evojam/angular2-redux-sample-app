import { Component, Input } from 'angular2/core';

import { ITodo } from '../../todo-lib/dto';
import { Todo } from './todo';
import { TodosFilter } from '../pipes/todos-filter';
import { FilterType } from '../../todo-lib/filters';

@Component({
    directives: [Todo],
    pipes: [TodosFilter],
    selector: 'todo-list',
    templateUrl: '/src/directives/todo-list.html'
})
export class TodoList {
    @Input() private todos: ITodo[];
    @Input() private filter: FilterType;
}