import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo
  @ViewChild('inputFisico', {static: false}) txtInputFisico: ElementRef

  checkCompletado: FormControl
  txtInput: FormControl

  editando: boolean = false

  constructor( ) { }

  ngOnInit(): void {

    this.checkCompletado = new FormControl( this.todo.completado)
    this.txtInput = new FormControl( this.todo.texto, Validators.required )

  }

  editar() {

    this.editando = true

    setTimeout( () => {
      this.txtInputFisico.nativeElement.select()
    }, 1)

  }

  terminarEdicion() {
    this.editando = false
  }

}
