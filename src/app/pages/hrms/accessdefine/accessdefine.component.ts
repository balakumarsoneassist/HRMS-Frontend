import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { forkJoin } from 'rxjs';

import { DropdownModule } from 'primeng/dropdown';
import { PickListModule } from 'primeng/picklist';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

type RoleOption = { _id: string; role: string };
type Submenu = { submenuName: string };
type Menu = { menuName: string; children: Submenu[] };

@Component({
  selector: 'app-accessdefine',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    DropdownModule,
    PickListModule,
    InputTextModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './accessdefine.component.html',
  styleUrls: ['./accessdefine.component.scss'],
  providers: [MessageService]
})
export class AccessdefineComponent implements OnInit {
  // APIs
  private accessBase = 'http://localhost:8080/api/access';
  private stdMenuBase = 'http://localhost:8080/api/standardmenu';

  // Roles dropdown
  roles: RoleOption[] = [];
  selectedRoleId: string | null = null;

  // Menus picklists
  menusSource: Menu[] = [];
  menusTarget: Menu[] = []; // current role's "main"

  // Children picklists bound to selected target menu
  selectedMenuIndex: number | null = null;
  childSource: Submenu[] = [];
  childTarget: Submenu[] = [];

  // Quick add inputs
  newMenuName = '';
  newChildName = '';

  // Standard catalog fetched from /standardmenu?role=...
  private stdMenuCatalog: Menu[] = [];

  constructor(private http: HttpClient, private toast: MessageService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  // === Load roles into dropdown
  loadRoles() {
    const token = localStorage.getItem('authToken');
    this.http.get<RoleOption[]>(`${this.accessBase}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res) => this.roles = res || [],
      error: () => this.toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load roles' })
    });
  }

  // === When a role is chosen, fetch current main + standard menu (Admin/Employee/Intern)
  onRoleChange() {
    this.selectedMenuIndex = null;
    this.childSource = [];
    this.childTarget = [];

    if (!this.selectedRoleId) {
      this.menusSource = [];
      this.menusTarget = [];
      this.stdMenuCatalog = [];
      return;
    }

    const token = localStorage.getItem('authToken');

    // Figure out selected role name
    const roleName = this.roles.find(r => r._id === this.selectedRoleId)?.role || '';
    // Decide which standard role to load:
    // - If Employee or Intern => use the same
    // - Else => fall back to Admin standard menu
    const stdRole = (roleName === 'Employee' || roleName === 'Intern') ? roleName : 'Admin';

    const paramsMain = new HttpParams().set('roleId', this.selectedRoleId);
    const paramsStd  = new HttpParams().set('role', stdRole);

    const headers = { Authorization: `Bearer ${token}` };

    forkJoin({
      current: this.http.get<{ role: string; main: Menu[] }>(`${this.accessBase}/main`, { params: paramsMain, headers }),
      standard: this.http.get<{ role: string; main: Menu[] }>(`${this.stdMenuBase}`, { params: paramsStd, headers })
    }).subscribe({
      next: ({ current, standard }) => {
        const currentMain = Array.isArray(current?.main) ? current.main : [];
        const stdMain = Array.isArray(standard?.main) ? standard.main : [];

        // keep the fetched catalog for child picklists
        this.stdMenuCatalog = this.deepClone(stdMain);

        // Right side = existing main
        this.menusTarget = this.deepClone(currentMain);

        // Left side = standard minus existing (by menuName)
        const currentNames = new Set(currentMain.map(m => m.menuName));
        this.menusSource = this.deepClone(
          stdMain.filter(m => !currentNames.has(m.menuName))
        );

        // Auto-select first target menu (if any)
        this.selectedMenuIndex = this.menusTarget.length ? 0 : null;
        this.refreshChildLists();
      },
      error: () => this.toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load role menu' })
    });
  }

  // === Find full child catalog for a menu from std catalog + current lists
  private findCatalogForMenu(menuName: string): Submenu[] {
    const fromStd     = this.stdMenuCatalog.find(m => m.menuName === menuName)?.children || [];
    const fromSource  = this.menusSource.find(m => m.menuName === menuName)?.children || [];
    const fromTarget  = this.menusTarget.find(m => m.menuName === menuName)?.children || [];
    const all         = [...fromStd, ...fromSource, ...fromTarget];
    const uniq        = new Set(all.map(x => x.submenuName));
    return Array.from(uniq).map(x => ({ submenuName: x }));
  }

  // === Deep clone helper
  private deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  // === Click on a target menu to manage its children
  onTargetMenuClick(index: number) {
    this.selectedMenuIndex = index;
    this.refreshChildLists();
  }

  private refreshChildLists() {
    if (this.selectedMenuIndex == null || this.selectedMenuIndex < 0 || this.selectedMenuIndex >= this.menusTarget.length) {
      this.childSource = [];
      this.childTarget = [];
      return;
    }
    const selMenu = this.menusTarget[this.selectedMenuIndex];
    const catalogForMenu = this.findCatalogForMenu(selMenu.menuName);
    const existingNames = new Set((selMenu.children || []).map(c => c.submenuName));
    this.childTarget = this.deepClone(selMenu.children || []);
    this.childSource = this.deepClone(catalogForMenu.filter(c => !existingNames.has(c.submenuName)));
  }

  // === Handle menu moves
  onMenusMove(_event: { items: Menu[] }) {
    if (this.selectedMenuIndex != null && this.selectedMenuIndex >= this.menusTarget.length) {
      this.selectedMenuIndex = this.menusTarget.length ? this.menusTarget.length - 1 : null;
    }
    this.refreshChildLists();
  }

  // === Handle child moves
  onChildrenMove() {
    if (this.selectedMenuIndex == null) return;
    this.menusTarget[this.selectedMenuIndex].children = this.deepClone(this.childTarget);
  }

  // === Add a brand-new menu to Target
  addMenu() {
    const name = (this.newMenuName || '').trim();
    if (!name) return;
    if (this.menusTarget.some(m => m.menuName.toLowerCase() === name.toLowerCase())) {
      this.toast.add({ severity: 'warn', summary: 'Exists', detail: 'Menu already in selection' });
      return;
    }
    this.menusSource = this.menusSource.filter(m => m.menuName.toLowerCase() !== name.toLowerCase());
    this.menusTarget.push({ menuName: name, children: [] });
    this.newMenuName = '';
    this.onTargetMenuClick(this.menusTarget.length - 1);
  }

  // === Add a new child into the selected target menu
  addChild() {
    if (this.selectedMenuIndex == null) return;
    const name = (this.newChildName || '').trim();
    if (!name) return;
    const tgt = this.menusTarget[this.selectedMenuIndex];
    if (tgt.children.some(c => c.submenuName.toLowerCase() === name.toLowerCase())) {
      this.toast.add({ severity: 'warn', summary: 'Exists', detail: 'Submenu already in selection' });
      return;
    }
    this.childSource = this.childSource.filter(c => c.submenuName.toLowerCase() !== name.toLowerCase());
    this.childTarget = [...this.childTarget, { submenuName: name }];
    this.newChildName = '';
    this.onChildrenMove();
  }

  // === Save (same as before)
  saveMain() {
    if (!this.selectedRoleId) return;
    const cleanMain: Menu[] = this.menusTarget.map(m => ({
      menuName: m.menuName,
      children: (m.children || []).map(c => ({ submenuName: c.submenuName }))
    }));
    const body = { roleId: this.selectedRoleId, main: cleanMain };
    const token = localStorage.getItem('authToken');

    this.http.post(`${this.accessBase}/main`, body, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => this.toast.add({ severity: 'success', summary: 'Saved', detail: 'Role main updated' }),
      error: () => this.toast.add({ severity: 'error', summary: 'Error', detail: 'Save failed' })
    });
  }

  // === Optional label helper
  roleLabelById(id: string | null): string {
    if (!id) return '';
    const r = this.roles.find(x => x._id === id);
    return r ? r.role : id;
  }
}
