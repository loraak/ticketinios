import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';

import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { HasPermissionDirective } from '../../directives/has-permission.directive';
import { UsuarioService } from '../../services/usuario.service';

export interface GestionarUsuarios {
    id: string;
    nombreCompleto: string;
    email: string;
    permisos: string[];
    activo: boolean;
}

export interface PermisoLegible {
    permiso: string;
    label: string;
    grupo: string;
}

export const PERMISOS_LEGIBLES: PermisoLegible[] = [
    { permiso: 'perfil:editar',           label: 'Editar perfil',                grupo: 'Perfil'           },
    { permiso: 'perfil:baja',             label: 'Dar de baja perfil',           grupo: 'Perfil'           },
    { permiso: 'groups:admin',            label: 'Administrar grupos',           grupo: 'Grupos'           },
    { permiso: 'groups:ver',              label: 'Ver grupos',                   grupo: 'Grupos'           },
    { permiso: 'groups:crear',            label: 'Crear grupos',                 grupo: 'Grupos'           },
    { permiso: 'groups:editar',           label: 'Editar grupos',                grupo: 'Grupos'           },
    { permiso: 'groups:baja',             label: 'Dar de baja grupos',           grupo: 'Grupos'           },
    { permiso: 'groups:verespecifico',    label: 'Ver grupo específico',         grupo: 'Grupos — Detalle' },
    { permiso: 'ticket:crear',            label: 'Agregar miembros al grupo',    grupo: 'Grupos — Detalle' },
    { permiso: 'ticket:editar',           label: 'Editar miembros del grupo',    grupo: 'Grupos — Detalle' },
    { permiso: 'ticket:baja',             label: 'Eliminar miembros del grupo',  grupo: 'Grupos — Detalle' },
    { permiso: 'groups:mistickets',       label: 'Ver mis tickets del grupo',    grupo: 'Grupos — Detalle' },
    { permiso: 'usuarios:ver',            label: 'Ver usuarios',                 grupo: 'Usuarios'         },
    { permiso: 'usuarios:crear',          label: 'Crear usuarios',               grupo: 'Usuarios'         },
    { permiso: 'usuarios:editar',         label: 'Editar usuarios',              grupo: 'Usuarios'         },
    { permiso: 'usuarios:baja',           label: 'Dar de baja usuarios',         grupo: 'Usuarios'         },
    { permiso: 'tickets:ver',             label: 'Ver tickets',                  grupo: 'Tickets'          },
    { permiso: 'tickets:agregar',         label: 'Crear tickets',                grupo: 'Tickets'          },
    { permiso: 'tickets:admin',           label: 'Administrar tickets',          grupo: 'Tickets'          },
    { permiso: 'tickets:editar',          label: 'Editar tickets',               grupo: 'Tickets'          },
    { permiso: 'tickets:eliminar',        label: 'Eliminar tickets',             grupo: 'Tickets'          },
    { permiso: 'tickets:detalle',         label: 'Ver detalle de tickets',       grupo: 'Tickets'          }
];

@Component({
    selector: 'app-gestionUsuarios',
    standalone: true,
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        TableModule, CardModule, ButtonModule, DialogModule,
        InputTextModule, TagModule, ToastModule, ConfirmDialogModule,
        FloatLabelModule, PasswordModule, CheckboxModule,
        DividerModule, TooltipModule, HasPermissionDirective
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './gestionar-usuarios.html',
    styleUrl: './gestionar-usuarios.css'
})

export class GestionarUsuarios {
    protected PERMISOS_LEGIBLES = PERMISOS_LEGIBLES;

    private usuarioSvc = inject(UsuarioService);


    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
    }

    get gruposPermisos(): string[] {
        return [...new Set(PERMISOS_LEGIBLES.map(p => p.grupo))];
    }

    permisosPorGrupo(grupo: string): PermisoLegible[] {
        return PERMISOS_LEGIBLES.filter(p => p.grupo === grupo);
    }
}