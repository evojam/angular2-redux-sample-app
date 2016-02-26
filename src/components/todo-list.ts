import { ChangeDetectionStrategy, Component, Input } from 'angular2/core';

import { ITodo } from '../../todo-lib/dto';
import { Todo } from './todo';
import { TodosFilter } from '../pipes/todos-filter';
import { FilterType } from '../../todo-lib/filters';

interface ITodoListProps {
    todoList: ITodo[];
    filter: FilterType;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [Todo],
    host: {'class':'todo-list'},
    pipes: [TodosFilter],
    selector: '[todoList]',
    templateUrl: '/src/components/todo-list.html'
})
export class TodoList implements ITodoListProps {
    @Input() todoList: ITodo[];
    @Input() filter: FilterType;
}