import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

import { AdminGuard } from '../guards/admin.guard';


const childRoutes: Routes = [
                  { path:'', component: DashboardComponent, data:{ titulo: 'Dashboard'} },
                  { path:'account-settings', component: AccountSettingsComponent, data:{ titulo: 'Temas'}   },
                  { path:'busqueda/:termino', component: BusquedaComponent, data:{ titulo: 'Búsquedas'}   },
                  { path:'dashboard', component: DashboardComponent, data:{ titulo: 'Dashboard'} },
                  { path:'grafica1', component: Grafica1Component, data:{ titulo: 'Gráfica #1'}   },
                  { path:'perfil', component: PerfilComponent, data:{ titulo: 'Perfil Usuario'}   },
                  { path:'promesas', component: PromesasComponent, data:{ titulo: 'Promesas'}   },
                  { path:'progress', component: ProgressComponent, data:{ titulo: 'Progreso'}   },
                  { path:'rxjs', component: RxjsComponent, data:{ titulo: 'RxJs'}   },

                  // mantenimientos
                  { path:'hospitales', component: HospitalesComponent, data:{ titulo: 'Mantenimiento - Hospitales'}   },
                  { path:'medicos', component: MedicosComponent, data:{ titulo: 'Mantenimiento - Medicos'}   },
                  { path:'medico/:id', component: MedicoComponent, data:{ titulo: 'Médico'}   },

                  // paginas de admin
                  { path:'usuarios', canActivate:[ AdminGuard], component: UsuariosComponent, data:{ titulo: 'Mantenimiento - Usuarios'}   },
                  ]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild( childRoutes ) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
