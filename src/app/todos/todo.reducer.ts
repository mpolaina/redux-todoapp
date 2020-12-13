import { createReducer, on } from '@ngrx/store';
import * as action from './todo.actions';
import { Todo } from './models/todo.model';


export const initialState: Todo[] = [
    new Todo('Comerme un poco de Kefir'),
    new Todo('Lavarme los dientes'),
    new Todo('A dormir!!!'),
];

const _todoReducer = createReducer( initialState,

  on( action.crear, (state, { texto }) => [...state, new Todo( texto )]),
  on( action.borrar, (state, { id }) => {
      return state.filter( todo => todo.id !== id)
  }),
  on( action.borrarCompletadas, state => {
      return state.filter( todo => !todo.completado )
  }),
  on( action.toggleAll, ( state, { completado} ) => state.map( todo => {
      return { ...todo, completado: completado }
  })),
  on( action.toggle, (state, { id }) => {
      return state.map( todo => {
          if ( todo.id === id ) { return { ...todo, completado: !todo.completado }
          } else {  return todo }
      })
  }),
  on( action.editar, (state, {id, texto}) => {
      return state.map( todo => {
         if ( todo.id === id ) { return { ...todo, texto: texto }
         } else { return todo }
      })
  })

);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}

// [...state, new Todo(texto)] extrae cada items independiente y añade uno nuevo
