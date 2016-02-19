import { AfterViewInit, Component, ElementRef, Input, ViewChild } from 'angular2/core';
import { Store } from 'redux';
import { IO, Maybe, Some } from 'monet';

import { TodoActions } from '../../todo-lib/redux/core';
import { AddItemType } from '../../todo-lib/redux/actions';

@Component({
    selector: 'add-item',
    templateUrl: '/src/directives/add-item.html'
})
export class AddItem implements AfterViewInit {

    constructor(
        public todoActions: TodoActions
    ) {}

    private _itemType: string;

    @Input()
    private set itemType(type: string) {
        this._itemType = type;
    }

    @ViewChild('item')
    private _itemControl: ElementRef;

    private get itemControl(): Maybe<HTMLInputElement> {
        return Maybe.fromNull(this._itemControl).flatMap(el => Maybe.fromNull(<HTMLInputElement>el.nativeElement));
    }

    public ngAfterViewInit(): void {
        this.itemControl.filter(() => this._itemType === 'Todo').map(input => IO(() => {
            input.focus();
        })).orJust(IO(() => {})).run();
    }

    private get itemType(): string {
        return this._itemType.replace(/([a-z])([A-Z])/g, '$1 $2');
    }

    private addItem(input: HTMLInputElement): void {
        Some(input).filter(input => Boolean(input.value)).map(input => IO(() => {
            this.todoActions.addItem(AddItemType[this._itemType], input.value);
            input.value = ''; // FIXME: SideEffect - maybe move to store ?
        })).orJust(IO(() => {
        })).run();
    }

}
