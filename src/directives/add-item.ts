import { Component, Input } from 'angular2/core';
import { Store } from 'redux';

import { TodoActions } from '../../todo-lib/redux/core';
import { AddItemType } from '../../todo-lib/redux/actions';

@Component({
    selector: 'add-item',
    templateUrl: '/src/directives/add-item.html'
})
export class AddItem {

    constructor(
        public todoActions: TodoActions
    ) {}

    private _itemType: string;

    @Input()
    private set itemType(type: string) {
        this._itemType = type;
    }

    private get itemType(): string {
        return this._itemType.replace(/([a-z])([A-Z])/g, '$1 $2');
    }

    private addItem(input: HTMLInputElement): void {
        if (input.value) {
            this.todoActions.addItem(AddItemType[this._itemType], input.value);
            input.value = ''; // FIXME: SideEffect - maybe move to store ?
        }
    }

}
