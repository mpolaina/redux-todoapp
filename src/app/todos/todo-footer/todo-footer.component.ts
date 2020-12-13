 import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../../filtro/filtro.actions';
import { borrarCompletadas } from '../todo.actions';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: actions.filtrosValidos = 'todas'
  filtros: actions.filtrosValidos[] = ['todas', 'activas', 'completadas']

  pendientes: number = 0
  totalTodos: number

  todo: Todo

  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {

      // this.store.select('filtro')
      //   .subscribe( filtro => this.filtroActual = filtro )
      // state --> ({ todos, filtro })
      this.store.subscribe( ({ todos, filtro }) => {

          this.filtroActual = filtro
          this.pendientes   = todos.filter( todo => !todo.completado ).length
          this.totalTodos   = todos.length

      })
  }

  cambiarFiltro( filtro: actions.filtrosValidos ) {
      this.store.dispatch( actions.setFiltro( { filtro } ) )
  }

  eliminarCompletadas(){
      this.store.dispatch( borrarCompletadas())
  }

}
