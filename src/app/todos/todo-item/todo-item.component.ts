import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as action from '../todo.actions';
import { AppState } from 'src/app/app.reducer';

import { Todo } from '../models/todo.model';
import { borrar } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

      @Input() todo: Todo
      @ViewChild('inputFisico', {static: true}) txtInputFisico: ElementRef

      checkCompletado: FormControl
      txtInput: FormControl

      editando: boolean = false

      constructor( private store: Store<AppState> ) { }

      ngOnInit(): void {

          this.checkCompletado = new FormControl( this.todo.completado)
          this.txtInput = new FormControl( this.todo.texto, Validators.required )

          // cambio estado tarea completada
          this.checkCompletado.valueChanges.subscribe( valor => {
             this.store.dispatch( action.toggle( { id:  this.todo.id } ) )
          })

      }

      editar() {

          this.editando = true
          this.txtInput.setValue( this.todo.texto ) // evita input vacio si se ha borrado
          setTimeout( () => {
            this.txtInputFisico.nativeElement.select()
          }, 1)

      }

      terminarEdicion() {
        this.editando = false

        if ( this.txtInput.invalid ) { return } // si se borra toda la tarea
        if ( this.txtInput.value === this.todo.texto ) { return } // si no hay cambios
        this.store.dispatch ( action.editar({
          id: this.todo.id,
          texto: this.txtInput.value
        }) )
      }

      borrar() {
        this.store.dispatch( action.borrar( { id: this.todo.id } ))
      }

}
