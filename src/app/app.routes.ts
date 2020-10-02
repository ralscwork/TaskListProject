import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './components/home/home.component'
import { ModuleWithProviders } from '@angular/core'
import { NewTaskComponent } from './components/new-task/new-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';


export const ROUTES: Routes = [
    { path : '', component: HomeComponent},
    { path : 'new-task', component: NewTaskComponent},
    { path : 'new-task/:id', component: NewTaskComponent},
    { path : 'edit-task', component: EditTaskComponent}
]

export const routes: ModuleWithProviders<RouterModule> = RouterModule.forRoot(ROUTES);