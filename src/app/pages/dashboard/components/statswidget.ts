import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule],
    template: `
<div class="col-span-12 flex justify-center mb-0">
    <h2 class="text-xl font-bold text-white bg-indigo-600 px-4 py-1 rounded-md inline-block">
        Member
    </h2>
</div>

<div class="col-span-12 lg:col-span-6 xl:col-span-3 mt-0">

          <div class="card mb-0">
            <div class="flex justify-between mb-1">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Total Members</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">124</div>
                </div>
                <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-users text-blue-500 !text-xl"></i>
                </div>
            </div>
            <span class="text-primary font-medium">Inactive</span>
        </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3 mt-0">
        <div class="card mb-0">
            <div class="flex justify-between mb-1 mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">New Membership</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">29</div>
                </div>
                <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-user-plus text-orange-500 !text-xl"></i>
                </div>
            </div>
            <span class="text-primary font-medium">Inactive</span>
        </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3 mt-0">
        <div class="card mb-0">
            <div class="flex justify-between mb-1 mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Active Members</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">12</div>
                </div>
                <div class="flex items-center justify-center bg-green-100 dark:bg-green-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-user text-green-500 !text-xl"></i>
                </div>
            </div>
            <span class="text-primary font-medium">All active</span>
        </div>
    </div>
    <div class="col-span-12 lg:col-span-6 xl:col-span-3 mt-0">
        <div class="card mb-0">
            <div class="flex justify-between mb-1 mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Blocked Members</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">4</div>
                </div>
                <div class="flex items-center justify-center bg-red-100 dark:bg-red-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-ban text-red-500 !text-xl"></i>
                </div>
            </div>
            <span class="text-primary font-medium">All blocked</span>
        </div>
    </div>
     <!-- Donations Section -->
     <div class="col-span-12 flex justify-center mb-0">
    <h2 class="text-xl font-bold text-white bg-indigo-600 px-4 py-1 rounded-md inline-block">
        Donation
    </h2>
</div>

    <!-- Membership Fee -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3 mt-0">
        <div class="card mb-0">
            <div class="flex justify-between mb-1 mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Membership Fee</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">₹1900.00</div>
                </div>
                <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-credit-card text-purple-500 !text-xl"></i>
                </div>
            </div>
            <span class="text-primary font-medium">Total Fee</span>
        </div>
    </div>

    <!-- Users Donation -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3 mt-0">
        <div class="card mb-0">
            <div class="flex justify-between mb-1 mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Users Donation</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">₹18,134.20</div>
                </div>
                <div class="flex items-center justify-center bg-teal-100 dark:bg-teal-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-gift text-teal-500 !text-xl"></i>
                </div>
            </div>
            <span class="text-primary font-medium">Active Members</span>
        </div>
    </div>

    <!-- Visitor Donation -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3 mt-0">
        <div class="card mb-0">
            <div class="flex justify-between mb-1 mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Visitor Donation</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">₹81,568.78</div>
                </div>
                <div class="flex items-center justify-center bg-yellow-100 dark:bg-yellow-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-chart-line text-yellow-500 !text-xl"></i>
                </div>
            </div>
            <span class="text-primary font-medium">Direct Users</span>
        </div>
    </div>

    <!-- Cash Donation -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3 mt-0">
        <div class="card mb-0">
            <div class="flex justify-between mb-1 mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Cash Donation</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">₹1000.00</div>
                </div>
                <div class="flex items-center justify-center bg-gray-100 dark:bg-gray-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-money-bill text-gray-500 !text-xl"></i>
                </div>
            </div>
            <span class="text-primary font-medium">Admin</span>
        </div>
    </div>

    <div class="col-span-12 flex justify-center mb-0">
    <h2 class="text-xl font-bold text-white bg-indigo-600 px-4 py-1 rounded-md inline-block">
        Reciept
    </h2>
</div>

    <!-- Membership Fee -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3 mt-0">
        <div class="card mb-0">
            <div class="flex justify-between mb-1 mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Membership Fee</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">₹1900.00</div>
                </div>
                <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-credit-card text-purple-500 !text-xl"></i>
                </div>
            </div>
            <span class="text-primary font-medium">Total Fee</span>
        </div>
    </div>

    <!-- Users Donation -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3 mt-0">
        <div class="card mb-0">
            <div class="flex justify-between mb-1 mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Users Donation</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">₹18,134.20</div>
                </div>
                <div class="flex items-center justify-center bg-teal-100 dark:bg-teal-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-gift text-teal-500 !text-xl"></i>
                </div>
            </div>
            <span class="text-primary font-medium">Active Members</span>
        </div>
    </div>

    <!-- Visitor Donation -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3 mt-0">
        <div class="card mb-0">
            <div class="flex justify-between mb-1 mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Visitor Donation</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">₹81,568.78</div>
                </div>
                <div class="flex items-center justify-center bg-yellow-100 dark:bg-yellow-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-chart-line text-yellow-500 !text-xl"></i>
                </div>
            </div>
            <span class="text-primary font-medium">Direct Users</span>
        </div>
    </div>

    <!-- Cash Donation -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3 mt-0">
        <div class="card mb-0">
            <div class="flex justify-between mb-1 mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Cash Donation</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">₹1000.00</div>
                </div>
                <div class="flex items-center justify-center bg-gray-100 dark:bg-gray-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-money-bill text-gray-500 !text-xl"></i>
                </div>
            </div>
            <span class="text-primary font-medium">Admin</span>
        </div>
    </div>

    <div class="col-span-12 flex justify-center mb-0">
    <h2 class="text-xl font-bold text-white bg-indigo-600 px-4 py-1 rounded-md inline-block">
        Managers
    </h2>
</div>

    <!-- Membership Fee -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3 mt-0">
        <div class="card mb-0">
            <div class="flex justify-between mb-1 mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Membership Fee</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">₹1900.00</div>
                </div>
                <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-credit-card text-purple-500 !text-xl"></i>
                </div>
            </div>
            <span class="text-primary font-medium">Total Fee</span>
        </div>
    </div>

    <!-- Users Donation -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3 mt-0">
        <div class="card mb-0">
            <div class="flex justify-between mb-1 mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Users Donation</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">₹18,134.20</div>
                </div>
                <div class="flex items-center justify-center bg-teal-100 dark:bg-teal-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-gift text-teal-500 !text-xl"></i>
                </div>
            </div>
            <span class="text-primary font-medium">Active Members</span>
        </div>
    </div>

    <!-- Visitor Donation -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3 mt-0">
        <div class="card mb-0">
            <div class="flex justify-between mb-1 mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Visitor Donation</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">₹81,568.78</div>
                </div>
                <div class="flex items-center justify-center bg-yellow-100 dark:bg-yellow-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-chart-line text-yellow-500 !text-xl"></i>
                </div>
            </div>
            <span class="text-primary font-medium">Direct Users</span>
        </div>
    </div>

    <!-- Cash Donation -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3 mt-0">
        <div class="card mb-0">
            <div class="flex justify-between mb-1 mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Cash Donation</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">₹1000.00</div>
                </div>
                <div class="flex items-center justify-center bg-gray-100 dark:bg-gray-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-money-bill text-gray-500 !text-xl"></i>
                </div>
            </div>
            <span class="text-primary font-medium">Admin</span>
        </div>
    </div>`
})
export class StatsWidget {}
