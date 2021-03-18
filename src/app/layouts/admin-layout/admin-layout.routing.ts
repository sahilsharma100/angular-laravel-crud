import { Routes } from '@angular/router';
import { AuthGuard } from './../../auth.guard';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { EditComponent } from '../../pages/edit/edit.component';
import { CreateComponent } from '../../pages/create/create.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent,canActivate: 
    [AuthGuard] },
    { path: 'user-profile',   component: UserProfileComponent ,canActivate: 
    [AuthGuard]},
    { path: 'users',         component: TablesComponent ,canActivate: 
    [AuthGuard],data: {
        role: 'admin'
         }
    },
    { path: 'edit/:id',         component: EditComponent ,canActivate: 
    [AuthGuard],data: {
        role: 'admin'
        }
    },
    { path: 'create',         component: CreateComponent ,canActivate: 
    [AuthGuard],data: {
        role: 'admin'
        }
    },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent }
];
