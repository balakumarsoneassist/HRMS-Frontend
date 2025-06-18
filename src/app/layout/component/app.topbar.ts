import { LoginService } from './../../pages/donar-app/services/login.service';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';  // Already used, probably imported.
import { FormsModule } from '@angular/forms';   // Needed for ngModel

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [DialogModule,CalendarModule,TieredMenuModule,ButtonModule,FormsModule,RouterModule, CommonModule, StyleClassModule, AppConfigurator],
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo" routerLink="/home">
            <!-- <img viewBox="0 0 54 40" src='logo.png'/> -->
              <span>OneAssist</span>\
            </a>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button>
                <div class="relative">
                    <button
                        class="layout-topbar-action layout-topbar-action-highlight"
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <app-configurator />
                </div>
            </div>

            <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
    <div class="layout-topbar-menu-content">
        <!-- Calendar Button -->
        <button type="button" class="layout-topbar-action" (click)="showCalendar = true">
            <i class="pi pi-calendar"></i>
            <span>Calendar</span>
        </button>

        <!-- Messages Button (kept static for now) -->
        <button type="button" class="layout-topbar-action">
            <i class="pi pi-inbox"></i>
            <span>Messages</span>
        </button>

        <!-- Profile Button with menu -->
        <p-tieredMenu #profileMenu [model]="profileItems" [popup]="true"></p-tieredMenu>
        <button type="button" class="layout-topbar-action" (click)="profileMenu.toggle($event)">
            <i class="pi pi-user"></i>
            <span>Profile</span>
        </button>
    </div>
</div>

<!-- Calendar Dialog -->
<p-dialog header="Calendar" [(visible)]="showCalendar" [modal]="true" [style]="{ width: '50vw' }">
    <p-calendar [(ngModel)]="selectedDate" [inline]="true"></p-calendar>
</p-dialog>

        </div>
    </div>`
})
export class AppTopbar {
    items!: MenuItem[];

    constructor(public layoutService: LayoutService,private loginServices: LoginService,private router: Router) {}

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
    showCalendar = false;
    selectedDate: Date | null = null;

    profileItems: MenuItem[] = [
        {
            label: 'Settings',
            icon: 'pi pi-cog',
            command: () => {
            }
        },
        {
            separator: true
        },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
                 localStorage.removeItem('oneAssistTokenStorage')
                 this.router.navigate([''], { replaceUrl: true})

            }
        }
    ];

}
