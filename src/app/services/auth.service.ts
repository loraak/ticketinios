import { Injectable, signal, computed } from '@angular/core';

export const PERMISOS = {
    PERFIL_EDITAR:  'perfil:editar',
    PERFIL_BAJA:    'perfil:baja',
    GROUPS_VER:     'groups:ver',
    GROUPS_ADMIN:   'groups:admin',
    CRUD_VER:       'crud:ver',
    CRUD_CREAR:     'crud:crear',
    CRUD_EDITAR:    'crud:editar',
    USUARIOS_ADMIN: 'usuarios:admin',
    USUARIOS_VER:    'usuarios:ver',      
    USUARIOS_CREAR:  'usuarios:crear',    
    USUARIOS_EDITAR: 'usuarios:editar',   
    USUARIOS_BAJA:   'usuarios:baja',  
    TICKETS_ADMIN:   'tickets:admin',
} as const;

export type Permiso = typeof PERMISOS[keyof typeof PERMISOS];

export interface Usuario {
    id: string;
    nombreCompleto: string;
    email: string;
    password: string;
    permisos: Permiso[];
}

const USUARIOS_MOCK: Usuario[] = [
    {
        id: '1',
        nombreCompleto: 'César Admin',
        email: 'admin@app.com',
        password: '123',
        permisos: [
            PERMISOS.PERFIL_EDITAR,
            PERMISOS.PERFIL_BAJA,
            PERMISOS.GROUPS_VER,
            PERMISOS.GROUPS_ADMIN,
            PERMISOS.CRUD_VER,
            PERMISOS.CRUD_CREAR,
            PERMISOS.CRUD_EDITAR,
            PERMISOS.USUARIOS_ADMIN,
            PERMISOS.TICKETS_ADMIN,
            PERMISOS.USUARIOS_VER,
            PERMISOS.USUARIOS_CREAR,
            PERMISOS.USUARIOS_EDITAR,
            PERMISOS.USUARIOS_BAJA,
        ],
    },
    {
        id: '2',
        nombreCompleto: 'César Usuario',
        email: 'usuario@app.com',
        password: '123',
        permisos: [
            PERMISOS.PERFIL_EDITAR,
            PERMISOS.GROUPS_VER,
            PERMISOS.CRUD_VER,
        ],
    },
];

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _usuario = signal<Usuario | null>(null);

    readonly usuario      = this._usuario.asReadonly();
    readonly estaLogueado = computed(() => this._usuario() !== null);
    readonly permisos     = computed(() => this._usuario()?.permisos ?? []);

    tienePermiso(permiso: Permiso): boolean {
        return this.permisos().includes(permiso);
    }

    tieneAlgunPermiso(lista: Permiso[]): boolean {
        return lista.some(p => this.tienePermiso(p));
    }

    login(email: string, password: string): boolean {
        const usuario = USUARIOS_MOCK.find(
            u => u.email === email && u.password === password
        );
        if (!usuario) return false;
        this._usuario.set(usuario);
        return true;
    }

    logout(): void {
        this._usuario.set(null);
    }
}