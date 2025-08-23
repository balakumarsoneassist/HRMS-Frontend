import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Notfound } from './app/pages/notfound/notfound';
import { AuthGuard } from './app/pages/hrms/services/auth/auth.guard';
import { AdminpanelComponent } from './app/pages/hrms/adminpanel/adminpanel.component';
import { CreateUsersComponent } from './app/pages/hrms/create-users/create-users.component';
import { ViewUsersComponent } from './app/pages/hrms/view-users/view-users.component';
import { DailyreportComponent } from './app/pages/hrms/dailyreport/dailyreport.component';
import { LeaveRequestComponent } from './app/pages/hrms/leave-request/leave-request.component';
import { AttendanceManagemntComponent } from './app/pages/hrms/attendance-managemnt/attendance-managemnt.component';
import { MonthlyreportComponent } from './app/pages/hrms/monthlyreport/monthlyreport.component';
import { PetrolReimbursmentComponent } from './app/pages/hrms/petrolreimbursment/petrolreimbursment.component';
import { AttendanceReportComponent } from './app/pages/hrms/attendance-report/attendance-report.component';
import { EmployeeleaveApprovalComponent } from './app/pages/hrms/employeeleave-approval/employeeleave-approval.component';
import { PetrolApprovalComponent } from './app/pages/hrms/petrol-approval/petrol-approval.component';
import { AccessComponent } from './app/pages/hrms/access/access.component';
import { AccessdefineComponent } from './app/pages/hrms/accessdefine/accessdefine.component';
import { LeavePolicyAdminComponent } from './app/pages/hrms/leave-policy-admin/leave-policy-admin.component';
import { HolidayPlannerComponent } from './app/pages/hrms/holiday-planner/holiday-planner.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminpanelComponent, canActivate: [AuthGuard], data: { permission: 'Dashboard' } },
      { path: 'home/adduser', component: CreateUsersComponent, canActivate: [AuthGuard], data: { permission: 'Add User' } },
      { path: 'home/viewuser', component: ViewUsersComponent, canActivate: [AuthGuard], data: { permission: 'View Users' } },
      { path: 'home/petrolreimbursment', component: PetrolReimbursmentComponent, canActivate: [AuthGuard], data: { permission: 'Petrol Reimbursment' } },
      { path: 'home/dailyreport', component: DailyreportComponent, canActivate: [AuthGuard], data: { permission: 'Daily Report' } },
      { path: 'home/monthlyreport', component: MonthlyreportComponent, canActivate: [AuthGuard], data: { permission: 'Monthly Report' } },
      { path: 'home/attendance', component: AttendanceReportComponent, canActivate: [AuthGuard], data: { permission: 'Attendance' } },
      { path: 'home/leaverequest', component: AttendanceManagemntComponent, canActivate: [AuthGuard], data: { permission: 'Leave Request' } },
      { path: 'home/leaveapproval', component: EmployeeleaveApprovalComponent, canActivate: [AuthGuard], data: { permission: 'Employee Leave Approval' } },
      { path: 'home/petrolapproval', component: PetrolApprovalComponent, canActivate: [AuthGuard], data: { permission: 'Employee Petrol Approval' } },
      { path: 'home/access', component: AccessComponent, canActivate: [AuthGuard], data: { permission: 'Access' } },
      { path: 'home/accessdefine', component: AccessdefineComponent, canActivate: [AuthGuard], data: { permission: 'Access Define' } },
      { path: 'home/yearlyleavyplocy', component: LeavePolicyAdminComponent, canActivate: [AuthGuard], data: { permission: 'Yearly Leave Policy' } },
      { path: 'home/holidayplanning', component: HolidayPlannerComponent, canActivate: [AuthGuard], data: { permission: 'Holiday Planning' } },

      { path: 'notfound', component: Notfound }
    ]
  },
  { path: 'login', loadChildren: () => import('./app/pages/hrms/login/login-routing.module') },
];

