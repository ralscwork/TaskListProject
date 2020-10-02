import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../model/task.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Task[]>{
    const url = environment.taskApiUrl + '/tasks';
    return this.http.get<Task[]>(url);
  }

  findAllPage(page: number, count: number): Observable<Task[]>{
    const url = environment.taskApiUrl + '/tasks/' + page + '/' + count;
    return this.http.get<Task[]>(url);
  }

  createOrUpdate(task: Task): Observable<Task>{
    const url = environment.taskApiUrl + '/tasks';

    if (task.id != null){
      return this.http.put<Task>(url + '/' + task.id, task);
    } else {
      return this.http.post<Task>(url, task);
    }
  }

  findById(id: number): Observable<Task>{
    const url = environment.taskApiUrl + '/tasks/' + id;
    return this.http.get<Task>(url);
  }

  delete(id: number): Observable<Task>{
    const url = environment.taskApiUrl + '/tasks/' + id;
    return this.http.delete<Task>(url);
  }

}
