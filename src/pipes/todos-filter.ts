import { Pipe, PipeTransform } from 'angular2/core';
import { ITodo } from '../../todo-lib/dto';
import { FilterType, todosFilter } from '../../todo-lib/filters';


@Pipe({name: 'todosFilter'})
export class TodosFilter implements PipeTransform {
    transform = todosFilter;
}