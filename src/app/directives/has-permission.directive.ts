import { Directive, effect, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionsService } from '../services/permissions.service';

export type PermisoConfig = string | string[] | { permisos: string[], esGrupo: boolean };

@Directive({
    selector: '[ifHasPermission]',
    standalone: true
})
export class HasPermissionDirective implements OnInit {
    @Input('ifHasPermission') config: PermisoConfig = '';

    constructor(
        private permissionsSvc: PermissionsService,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) {
        effect(() => {
            this.actualizarVista();
        });
    }

    ngOnInit() {
        this.actualizarVista();
    }

    private actualizarVista() {
        let permisosArray: string[];
        let esDeGrupo = false;

        if (typeof this.config === 'object' && !Array.isArray(this.config)) {
            permisosArray = (this.config as { permisos: string[], esGrupo: boolean }).permisos;
            esDeGrupo = true;
        } else {
            permisosArray = Array.isArray(this.config) ? this.config : [this.config];
        }

        const tiene = esDeGrupo
            ? this.permissionsSvc.hasAnyGroupPermission(permisosArray)
            : this.permissionsSvc.hasAnyPermission(permisosArray);

        this.viewContainer.clear();
        if (tiene) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}