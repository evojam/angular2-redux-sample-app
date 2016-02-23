import { Directive, HostBinding, HostListener, Input } from 'angular2/core';

@Directive({selector: '[inp-alerter]'})
export class InpAlerter {

    @Input('inp-alerter') inpAlerter: string; // bind elem attr to directive member

    @HostBinding() placeholder = 'Write something here'; // bind value to host property

    @HostListener('keyup.enter', ['$event.target.value']) // listen to host element event
    onInput(val: string): void {
        console.log('InpAlerter :: @HostBinding() placeholder: string;', this.placeholder);
        console.log('InpAlerter :: onInput(val: string): void => val', val);
        console.log('InpAlerter :: @Input("inp-alerter"") inpAlerter: string;', this.inpAlerter);
    }

}
