import { Routes } from '@angular/router';
import { authGuard, permisoGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '',        redirectTo: 'login', pathMatch: 'full' },
    { path: 'login',   loadComponent: () => import('./pages/auth/login/login').then(m => m.Login) },
    { path: 'register',loadComponent: () => import('./pages/auth/register/register').then(m => m.Register) },
    {
        path: 'app',
        loadComponent: () => import('./pages/layout/layout').then(m => m.Layout),
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' }, 
            { path: 'home',   canActivate: [permisoGuard('grupos:ver')],loadComponent: () => import('./pages/grupos/grupos').then(m => m.Grupos) },
            { path: 'perfil', canActivate: [permisoGuard('perfil:ver')], loadComponent: () => import('./pages/perfil/perfil').then(m => m.Perfil) },
            { path: 'gestionarGrupos', canActivate: [permisoGuard('gestionarGrupos:ver')],loadComponent: () => import('./pages/gestionar-grupos/gestionar-grupos').then(m => m.GestionarGrupos) },
            { path: 'groupDetails',   canActivate: [permisoGuard('grupos:verespecifico')],   loadComponent: () => import('./pages/group-detail/group-detail').then(m => m.GroupDetail) },
            { path: 'superadmin', canActivate: [permisoGuard('usuarios:ver')], loadComponent: () => import('./pages/gestionar-usuarios/gestionar-usuarios').then(m => m.GestionarUsuarios)},
        ]
    },
    { path: '**', redirectTo: 'landing' } 
];