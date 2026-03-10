import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService, PERMISOS } from '../../services/auth.service';
import { Divider } from 'primeng/divider';

export type EstadoTicket   = 'abierto' | 'cerrado';
export type PrioridadTicket = 'baja' | 'media' | 'alta';

export interface Ticket {
    id: string;
    titulo: string;
    descripcion: string;
    estado: EstadoTicket;
    prioridad: PrioridadTicket;
    asignadoA: string | null;
}

@Component({
    selector: 'app-tickets',
    standalone: true,
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        TableModule, CardModule, ButtonModule, DialogModule,
        InputTextModule, TextareaModule, TagModule, ToastModule,
        ConfirmDialogModule, FloatLabelModule, SelectModule, Divider
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './tickets.html',
    styleUrl: './tickets.css'
})
export class Tickets {
    protected authService = inject(AuthService);
    protected PERMISOS = PERMISOS;

    tickets: Ticket[] = [
        { id: '1', titulo: 'Error en login',       descripcion: 'No redirige al home.',          estado: 'abierto', prioridad: 'alta',  asignadoA: 'César Admin'   },
        { id: '2', titulo: 'Diseño del sidebar',   descripcion: 'Los links no tienen hover.',    estado: 'abierto', prioridad: 'baja',  asignadoA: null            },
        { id: '3', titulo: 'Validación de fechas', descripcion: 'Acepta fechas inválidas.',      estado: 'cerrado', prioridad: 'media', asignadoA: 'César Usuario' },
    ];

    usuarios = ['César Admin', 'César Usuario', 'Juan Prueba'];

    prioridades = [
        { label: 'Baja',  value: 'baja'  },
        { label: 'Media', value: 'media' },
        { label: 'Alta',  value: 'alta'  },
    ];

    modalEditarVisible = false;
    modalDetalleVisible = false;
    ticketSeleccionado: Ticket | null = null;
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.form = this.fb.group({
            titulo:      ['', Validators.required],
            descripcion: ['', Validators.required],
            prioridad:   ['baja', Validators.required],
            asignadoA:   [null],
        });
    }

    verDetalle(ticket: Ticket) {
        this.ticketSeleccionado = ticket;
        this.modalDetalleVisible = true;
    }

    abrirEditar(ticket: Ticket) {
        this.ticketSeleccionado = ticket;
        this.form.patchValue(ticket);
        this.modalEditarVisible = true;
    }

    guardar() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const idx = this.tickets.findIndex(t => t.id === this.ticketSeleccionado!.id);
        this.tickets[idx] = { ...this.ticketSeleccionado!, ...this.form.value };
        this.tickets = [...this.tickets];
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Ticket actualizado.' });
        this.modalEditarVisible = false;
    }

    confirmarCierre(ticket: Ticket) {
        this.confirmationService.confirm({
            message: `¿Cerrar el ticket "${ticket.titulo}"?`,
            header: 'Confirmar Cierre',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, cerrar',
            rejectLabel: 'Cancelar',
            acceptButtonProps: { severity: 'danger' },
            rejectButtonProps: { severity: 'secondary', text: true },
            accept: () => {
                const idx = this.tickets.findIndex(t => t.id === ticket.id);
                this.tickets[idx] = { ...this.tickets[idx], estado: 'cerrado' };
                this.tickets = [...this.tickets];
                this.messageService.add({ severity: 'warn', summary: 'Cerrado', detail: `Ticket "${ticket.titulo}" cerrado.` });
            }
        });
    }

    severidadPrioridad(prioridad: PrioridadTicket): string {
        return { baja: 'info', media: 'warn', alta: 'danger' }[prioridad];
    }

    severidadEstado(estado: EstadoTicket): string {
        return estado === 'abierto' ? 'success' : 'secondary';
    }
}