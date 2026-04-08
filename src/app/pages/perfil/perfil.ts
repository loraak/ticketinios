import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TableModule } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';

import { AuthService } from '../../services/auth.service';
import { HasPermissionDirective } from '../../directives/has-permission.directive'; 

interface TicketResumen {
    id: number;
    titulo: string;
    estado: string;
    prioridad: string;
    grupo: string;
    descripcion?: string; 
    fechaLimite: Date;
}

@Component({
    selector: 'app-perfil',
    standalone: true,
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        AvatarModule, CardModule, TagModule, DividerModule,
        ButtonModule, DialogModule, InputTextModule, FloatLabelModule,
        ToastModule, ConfirmDialogModule, TooltipModule,
        InputMaskModule, KeyFilterModule, TableModule,
        HasPermissionDirective
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './perfil.html',
    styleUrl: './perfil.css'
})
export class Perfil {
    protected authService = inject(AuthService);

    modalVisible = false;

    usuario = {
        nombreCompleto: this.authService.usuario()?.nombreCompleto,
        usuario: this.authService.usuario()?.username,
        email: this.authService.usuario()?.email,
        direccion: this.authService.usuario()?.direccion,
        fechaNacimiento: this.authService.usuario()?.fechaNacimiento,
        telefono: this.authService.usuario()?.telefono,
        activo: this.authService.usuario()?.activo
    };

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.form = this.fb.group({
            nombreCompleto:  ['', Validators.required],
            usuario:         ['', Validators.required],
            email:           ['', [Validators.required, Validators.email]],
            direccion:       ['', Validators.required],
            fechaNacimiento: ['', Validators.required],
            telefono:        ['', Validators.required]
        });
    }

    get f() {
        return this.form.controls as { [key: string]: FormControl };
    }

    severidadEstado(estado: string): 'info' | 'warn' | 'success' | 'danger' | 'secondary' {
        const map: Record<string, 'info' | 'warn' | 'success' | 'danger' | 'secondary'> = {
            'Pendiente':   'info',
            'En Progreso': 'warn',
            'Hecho':       'success',
            'Bloqueado':   'danger',
        };
        return map[estado] ?? 'secondary';
    }

    severidadPrioridad(prioridad: string): 'success' | 'warn' | 'danger' {
        if (prioridad === 'Alta' || prioridad === 'Crítica') return 'danger';
        if (prioridad === 'Media') return 'warn';
        return 'success';
    }

    abrirEditar() {
        this.form.patchValue(this.usuario);
        this.modalVisible = true;
    }

    guardar() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.usuario = { ...this.usuario, ...this.form.value };
        this.modalVisible = false;
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Perfil actualizado.' });
    }

    confirmarBaja() {
        this.confirmationService.confirm({
            message: '¿Estás seguro de que deseas dar de baja tu perfil?',
            header: 'Confirmar Baja',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, dar de baja',
            rejectLabel: 'Cancelar',
            acceptButtonProps: { severity: 'danger' },
            rejectButtonProps: { severity: 'secondary', text: true },
            accept: () => {
                this.usuario.activo = false;
                this.messageService.add({ severity: 'warn', summary: 'Baja', detail: 'Tu perfil ha sido dado de baja.' });
            }
        });
    }
}