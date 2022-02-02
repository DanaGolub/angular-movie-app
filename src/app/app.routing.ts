import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { AppComponent }          from './app.component';
import { AboutComponent } from './app.about';


const appRoutes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'about', component: AboutComponent },
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
//   { path: '**', component: PageDefault }
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
