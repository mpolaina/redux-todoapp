import { createReducer, on } from '@ngrx/store';
import { crear } from './todo.actions';
import { Todo } from './models/todo.model';


export const initialState: Todo[] = [
    new Todo('Comerme un poco de Kefir'),
    new Todo('Lavarme los dientes'),
    new Todo('A dormir!!!'),
];

const _todoReducer = createReducer(
  initialState,
  on(crear, (state, { texto  }) => [...state, new Todo( texto )])

);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}

// [...state, new Todo(texto)] extrae cada items independiente y añade uno nuevo
