import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
import { MultiSelectModule } from 'primeng/multiselect';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService, ConfirmationService } from 'primeng/api';

import { PermissionsService } from '../../services/permissions.service'; 
import { HasPermissionDirective } from '../../directives/has-permission.directive';

export interface GestionarGrupos {
    id: string;
    nombreCompleto: string;
    email: string;
    password: string;
    grupos: number[];
    activo: boolean;
}

export interface GrupoOpcion {
    id: number;
    nombre: string;
}

@Component({
    selector: 'app-gestionGrupos',
    standalone: true,
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        TableModule, CardModule, ButtonModule, DialogModule,
        InputTextModule, TagModule, ToastModule, ConfirmDialogModule,
        FloatLabelModule, PasswordModule, MultiSelectModule, DividerModule,
        TooltipModule, HasPermissionDirective 
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './gestionar-grupos.html',
    styleUrl: './gestionar-grupos.css'
})

export class GestionarGrupos {
    protected permissionsSvc = inject(PermissionsService);

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}
}