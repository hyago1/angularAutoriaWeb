import { Routes } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component'
import { TableComponent } from './components/table/table.component';
import { ListAllComponent } from './components/list-all/list-all.component';
export const routes: Routes = [


    {
        path: "dashboard",
        component: TableComponent

    }
    ,
    {
        path: "listAll",
        component: ListAllComponent

    }
];
