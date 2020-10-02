import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../model/task.model';
import { ResponseApi } from '../../model/response-api';
import { TaskService } from '../../services/task.service';
import { DialogService } from '../../dialog.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  @ViewChild(MessageComponent) messageComponent: MessageComponent;

  public tasks: Task[];

  page: number = 0;
  count: number = 5;
  pages: Array<number>;

  constructor(
    private taskService: TaskService,
    private dialogService: DialogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllPage(this.page, this.count);
  }

  findAll1(): void{
    this.taskService.findAll().subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      },
      () => {
        this.messageComponent.showMessage({
          type: 'error',
          text: 'Falha ao buscar lista de tarefas!'
        });
      }
    );
  }

  findAllPage(page: number, count: number): void{
    this.taskService.findAllPage(page, count).subscribe(
      (response: any) => {
        this.tasks = response.content;
        this.pages = new Array(response.totalPages);
      },
      () => {
        this.messageComponent.showMessage({
          type: 'error',
          text: 'Falha ao buscar lista de tarefas!'
        });
      }
    );
  }

  edit(id: number): void {
    console.log('editar');
    this.router.navigate(['/new-task', id]);
  }

  delete(id: number): void {
    this.dialogService.confirm('Deseja excluir a Tarefa?')
    .then((confirmado: boolean) => {

      if (confirmado){
        this.taskService.delete(id).subscribe((task: any) => {
          this.messageComponent.showMessage({
            type: 'success',
            text: 'Registro removido com sucesso!'
          });
          this.findAllPage(this.page, this.count);
        }, err => {
          this.messageComponent.showMessage({
            type: 'error',
            text: 'Falha ao executar o processo!'
          });
        })
      }
    });
  }

  setNextPage(event: any): void {
    event.preventDefault();
    if(this.page + 1 < this.pages.length){
      this.page = this.page + 1;
      this.findAllPage(this.page, this.count);
    }
  }

  setPreviousPage(event: any): void {
    event.preventDefault();
    if(this.page > 0 ){
      this.page = this.page - 1;
      this.findAllPage(this.page, this.count);
    }
  }

  setPage(pos, event: any): void {
    event.preventDefault();
    this.page = pos;
    this.findAllPage(this.page, this.count);
  }

}
