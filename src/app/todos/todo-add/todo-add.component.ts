import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions  from '../todo.actions';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  txtInput: FormControl
  todos: Todo[]

  constructor( private store: Store<AppState> ) {

      this.txtInput = new FormControl( '', Validators.required )
  }

  ngOnInit(): void {

    this.store.subscribe( ({ todos }) => this.todos = todos )

  }

  agregar(){

    if ( this.txtInput.invalid ) { return }
    this.store.dispatch( actions.crear( {texto: this.txtInput.value} ) )
    this.txtInput.reset()
    // localStorage.setItem('todos', JSON.stringify(this.todos))

  }

}
