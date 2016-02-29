import { ChangeDetectionStrategy, Component, Input } from 'angular2/core';

import { FilterType } from '../../todo-lib/filters';
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
    @Input() filter: FilterType;
    @Input() currentId: string;
    private isCurrent(list: ITodoList): boolean {
        return this.currentId === list.id;
    }
    private _byId = (list: ITodoList) => list.id;
}