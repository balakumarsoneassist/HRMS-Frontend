import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { TreeModule } from 'primeng/tree';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { TreeDragDropService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

type BackendNode = {
  label: string;
  data: {
    userId: string;
    roleId: string;
    name: string;
    rolename: string;
    access: string[]; // effective access (role.access + membership parents)
    photo?: string;
  };
  expanded?: boolean;
  children?: BackendNode[];
  draggable?: boolean;
  droppable?: boolean;
};

@Component({
  selector: 'app-access',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    TreeModule,
    OrganizationChartModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss'],
  providers: [TreeDragDropService]
})
export class AccessComponent implements OnInit {
  // Data for PrimeNG components (now provided by backend)
  orgData: BackendNode[] = [];
  treeData: BackendNode[] = [];
  selectedNode: BackendNode | null = null;

  // Dashboard/Profile flags & data your template references
  isAdminOrSuperAdmin = false;
  totalEmployees = 0;
  activeEmployees = 0;
  inactiveEmployees = 0;
  presentToday = 0;
  absentToday = 0;

  profileStats: any = {};
  profile: any;
  checkstatus = false;
  loading = false;

  // Endpoints
  private readonly GET_HIERARCHY_URL = 'http://localhost:8080/api/access/hierarchy';
  private readonly ASSIGN_MEMBER_URL = 'http://localhost:8080/api/access/assignMember';
  private readonly UPDATE_ROLE_ACCESS_URL = 'http://localhost:8080/api/access/updateRoleAccess';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadHierarchy();
  }

  // ===== utils =====

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  /** Pull user id from your JWT. Adjust claim names if needed. */
  private getViewerId(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const [, payload] = token.split('.');
      const p = JSON.parse(atob(payload));
      return String(p.sub || p._id || p.id || p.userId || '');
    } catch {
      return null;
    }
  }

  /** A node is root if its effective access is self-only. */
  private isRootData(d: any): boolean {
    return Array.isArray(d?.access) &&
           d.access.length === 1 &&
           String(d.access[0]) === String(d.roleId);
  }

  /** DFS to find a node by a predicate. */
  private findNode(
    nodes: BackendNode[],
    pred: (n: BackendNode) => boolean
  ): BackendNode | null {
    for (const n of nodes) {
      if (pred(n)) return n;
      if (n.children?.length) {
        const hit = this.findNode(n.children, pred);
        if (hit) return hit;
      }
    }
    return null;
  }

  // ===== data load (now server built) =====

  loadHierarchy(): void {
    const viewerId = this.getViewerId();
    const url = viewerId ? `${this.GET_HIERARCHY_URL}?viewerId=${viewerId}` : this.GET_HIERARCHY_URL;

    this.http.get<{ orgData: BackendNode[]; treeData: BackendNode[] }>(url).subscribe({
      next: ({ orgData, treeData }) => {
        this.orgData = orgData || [];
        this.treeData = treeData || [];

        // Set flags for your dashboard/profile view
        if (viewerId) {
          const me = this.findNode(this.orgData, n => n.data?.userId === viewerId);
          if (me) {
            this.isAdminOrSuperAdmin =
              this.isRootData(me.data) || (me.data.rolename || '').toLowerCase().includes('admin');
          }
        }

        // Simple totals (adjust if you have a stats endpoint)
        let employees = 0;
        const countEmployees = (nodes: BackendNode[]) => {
          for (const n of nodes) {
            if (n.data?.rolename === 'Employee') employees++;
            if (n.children?.length) countEmployees(n.children);
          }
        };
        countEmployees(this.orgData);
        this.totalEmployees = employees;
      },
      error: (err) => {
        console.error('Failed to load hierarchy:', err);
        this.orgData = [];
        this.treeData = [];
      }
    });
  }

  refreshTree(): void {
    this.loadHierarchy();
  }

  // ===== drag & drop =====

  /** Enforce rules and persist to backend. */
  handleDrop(event: any): void {
    const dragged = event?.dragNode?.data as BackendNode['data'] | undefined;
    const droppedOn = event?.dropNode?.data as BackendNode['data'] | undefined;
    if (!dragged || !droppedOn) return;

    // ❌ never allow dropping onto Employee
    if (droppedOn.rolename === 'Employee') {
      console.warn('❌ Cannot drop under Employee.');
      this.loadHierarchy();
      return;
    }

    // ❌ block Employee → ROOT (self-only)
    if (dragged.rolename === 'Employee' && this.isRootData(droppedOn)) {
      console.warn('❌ Cannot place Employee directly under a root node.');
      this.loadHierarchy();
      return;
    }

    // ❌ (optional) prevent moving root users entirely
    if (this.isRootData(dragged)) {
      console.warn('❌ Root nodes cannot be moved.');
      this.loadHierarchy();
      return;
    }

    // ---- Persist ----
    if (dragged.rolename === 'Employee') {
      // Option B: write into access.members of the parent role
      const body = { userId: dragged.userId, parentRoleId: droppedOn.roleId };
      this.http.post(this.ASSIGN_MEMBER_URL, body, { headers: this.getAuthHeaders() })
        .subscribe({
          next: () => this.loadHierarchy(),
          error: () => this.loadHierarchy()
        });
    } else {
      // Move ROLE under a new parent ROLE (Admin under Lead, etc.)
      const body = { roleId: dragged.roleId, newParentRoleId: droppedOn.roleId };
      this.http.post(this.UPDATE_ROLE_ACCESS_URL, body, { headers: this.getAuthHeaders() })
        .subscribe({
          next: () => this.loadHierarchy(),
          error: () => this.loadHierarchy()
        });
    }
  }

  // ===== stubs for cards you showed (wire to your own APIs later) =====
  login(): void { /* TODO: call attendance check-in; update flags */ }
  logout(): void { /* TODO: call attendance check-out; update flags */ }

  getAvatarUrl(name?: string, photo?: string): string {
  if (photo) {
    return photo;
  }
  const safeName = encodeURIComponent(name || 'Unknown User');
  return `https://ui-avatars.com/api/?name=${safeName}&background=random&size=64&bold=true`;
}

}
