import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../../model/task.model';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @ViewChild(MessageComponent) messageComponent: MessageComponent;

  public tituloTela = 'Cadastrar Nova Tarefa';
  public edit: boolean = false;

  task = new Task(null, null, null, null, null, null);

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    let id: number = this.route.snapshot.params['id'];
    if (id !== undefined){
      this.findById(id);
      this.edit = true;
      this.tituloTela = 'Alterar Tarefa';
    }
  }

  findById(id: number): void {
    this.taskService.findById(id).subscribe((task: any) => {
      console.log(task);
      this.task = task;
    }, err => {
      this.messageComponent.showMessage({
        type: 'error',
        text: 'Falha ao buscar Tarefa!'
      });
    })
  }

  save(): void {
    console.log('entrou register');
    console.log(this.task);
    console.log(this.task.titulo);
    this.taskService.createOrUpdate(this.task).subscribe((retorno: any) => {
      let taskSav: Task = retorno;
      this.form.resetForm();
      this.edit = false;
      this.messageComponent.showMessage({
        type: 'success',
        text: 'Registro ' + taskSav.titulo + ' salvo com sucesso!'
      });
    }, err => {
      this.messageComponent.showMessage({
        type: 'error',
        text: 'Falha durante o processo!'
      });
    })
  }

  getFromGroupClass(isInvalid: boolean, isDirty): {} {
    return {
      'form-group' : true,
      'has-error' : isInvalid && isDirty
    };
  }
}
