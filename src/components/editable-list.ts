import { ChangeDetectionStrategy, Component, Input } from 'angular2/core';

import { FilterType } from '../../todo-lib/filters';
import { ITodoList } from '../../todo-lib/dto';

import { TodosFilter } from '../pipes/todos-filter';

import { AddItem } from './add-item';
import { FilterLink } from './filter-link';
import { TodoList } from './todo-list';

interface IEditableListProps {
    todoList: ITodoList;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [AddItem, TodoList, FilterLink],
    selector: 'editable-list',
    templateUrl: '/src/components/editable-list.html'
})
export class EditableList implements IEditableListProps {
    @Input() filter: FilterType;
    @Input() todoList: ITodoList;
}