import { Routes } from '@angular/router';
import { FileListComponent } from './components/file-list/file-list.component';

export const routes: Routes = [

    {
        path: `files`,
        component: FileListComponent
    },

    {
        path: `**`,
        redirectTo: `/files`,
        pathMatch: `full`
    }
];
