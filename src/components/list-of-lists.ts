import { ChangeDetectionStrategy, Component, Input } from 'angular2/core';

import { ITodoList } from '../../todo-lib/dto';

import { EditableList } from './editable-list';
import { TodoListHeader } from './todo-list-header';

interface IListOfListsProps {
    currentId: string;
    lists: ITodoList[];
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [EditableList, TodoListHeader],
    selector: '[list-of-lists]',
    templateUrl: '/src/components/list-of-lists.html'
})
export class ListOfLists implements IListOfListsProps {
    @Input('list-of-lists') lists: ITodoList[];
    @Input() currentId: string;
    private _byId = (list: ITodoList) => list.id;
}