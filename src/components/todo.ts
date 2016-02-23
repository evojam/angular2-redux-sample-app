import { ChangeDetectionStrategy, Component, HostBinding, Input } from 'angular2/core';
import { TodoActions } from '../../todo-lib/redux/core';
import { ITodo } from '../../todo-lib/dto';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {'class': 'todo'},
    selector: '[todo]',
    templateUrl: '/src/components/todo.html'
})
export class Todo {

    constructor(private todoActions: TodoActions) {}

    @Input() private todo: ITodo;

    @HostBinding('class.done')
    private get isCompleted() {
        return this.todo.completed;
    }

}