import { ChangeDetectionStrategy, Component, Input } from 'angular2/core';

import { ITodoList } from '../../todo-lib/dto';

import { TodosFilter } from '../pipes/todos-filter';

import { TodoList } from './todo-list';
import { AddItem } from './add-item';

interface IEditableListProps {
    todoList: ITodoList;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [AddItem, TodoList],
    selector: 'editable-list',
    templateUrl: '/src/components/editable-list.html'
})
export class EditableList implements IEditableListProps {
    @Input() todoList: ITodoList;
}