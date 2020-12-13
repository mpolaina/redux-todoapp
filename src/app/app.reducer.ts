
import { ActionReducerMap } from '@ngrx/store';

import { Todo } from './todos/models/todo.model';

import { filtroReducer } from './filtro/filtro.reducer';

import { todoReducer } from './todos/todo.reducer';
import { filtrosValidos } from './filtro/filtro.actions';

export interface AppState {
     todos: Todo[],
     filtro: filtrosValidos
};

export const appReducers: ActionReducerMap<AppState> = {

    todos: todoReducer,
    filtro: filtroReducer

}
