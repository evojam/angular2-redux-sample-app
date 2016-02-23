import { Component, Input } from 'angular2/core';

import { TodoActions } from '../../todo-lib/redux/core';
import { FilterType } from '../../todo-lib/filters/todos-filter';

@Component({
    selector: 'filter-link',
    templateUrl: '/src/components/filter-link.html'
})
export class FilterLink {

    @Input('filter')
    private filterType: string;
    
    constructor(
        private todoActions: TodoActions
    ) {}

    private applyFilter(filterType: string) {
        this.todoActions.setFilter(FilterType[filterType]);
    }
    
}
