import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, ViewChild } from 'angular2/core';
import { IO, Maybe, Some } from 'monet';

import { TodoActions } from '../../todo-lib/redux/core';
import { AddItemType } from '../../todo-lib/redux/actions';

import { InpAlerter } from "../directives/inp-alerter";

function ioNoop() {
    return IO(() => {});
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [InpAlerter],
    selector: 'add-item',
    templateUrl: '/src/components/add-item.html'
})
export class AddItem implements AfterViewInit {

    constructor(
        public todoActions: TodoActions
    ) {
        console.log('new AddItem(todoActions)');
    }

    @Input()
    private itemType: string;

    private get itemTypeText(): string {
        return this.itemType.replace(/([a-z])([A-Z])/g, '$1 $2');
    }

    @HostBinding('class')
    private get itemTypeClass(): string {
        return `add-item add-${this.itemTypeText.toLowerCase().replace(' ', '-')}`;
    }

    @ViewChild('item')
    private _itemControl: ElementRef;

    private get itemControl(): Maybe<HTMLInputElement> {
        return Maybe.fromNull(this._itemControl).flatMap(el => Maybe.fromNull(<HTMLInputElement>el.nativeElement));
    }

    public ngAfterViewInit(): void {
        this.itemControl.filter(() => this.itemType === 'Todo').map(input => IO(() => {
            input.focus();
        })).orJust(ioNoop()).run();
    }

    private addItem(input: HTMLInputElement): void {
        Some(input).filter(input => Boolean(input.value)).map(input => IO(() => {
            this.todoActions.addItem(AddItemType[this.itemType], input.value);
            input.value = ''; // FIXME: SideEffect - maybe move to store ?
        })).orJust(ioNoop()).run();
    }

}
