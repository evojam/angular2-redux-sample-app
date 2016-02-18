import { Pipe, PipeTransform } from 'angular2/core';
import { ITodo } from '../../todo-lib/dto';
import { FilterType, todosFilter } from '../../todo-lib/filters';


@Pipe({name: 'todosFilter'})
export class TodosFilter implements PipeTransform {
    transform(todos: ITodo[], [type]: [FilterType]) {
        return todosFilter(todos, type);
    };
}