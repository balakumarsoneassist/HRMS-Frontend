import { Component } from '@angular/core';
import { NotificationsWidget } from './components/notificationswidget';
import { StatsWidget } from './components/statswidget';
import { RecentSalesWidget } from './components/recentsaleswidget';
import { BestSellingWidget } from './components/bestsellingwidget';
import { RevenueStreamWidget } from './components/revenuestreamwidget';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget, TableModule,
        ButtonModule,
        TagModule,
        InputTextModule],
        // RecentSalesWidget, BestSellingWidget, RevenueStreamWidget, NotificationsWidget
    template: `
        <div class="grid grid-cols-12 gap-8">
            <app-stats-widget class="contents" />
            <!-- <div class="col-span-12 xl:col-span-6">
                <app-recent-sales-widget />
                <app-best-selling-widget />
            </div>
            <div class="col-span-12 xl:col-span-6">
                <app-revenue-stream-widget />
                <app-notifications-widget />
            </div> -->
        </div>
    `
})
export class Dashboard {

    members = [
        { sno: 1, regNo: 'MBR-365', name: 'ZaqFelxFUgMwWvK', email: 'kaelewilkin@gmail.com', mobile: '5876190262', regDate: 'Jan 21, 2023', fee: 'Un Paid' },
        { sno: 2, regNo: 'MBR-364', name: 'AbVRWhzfn', email: 'layupateluj46@gmail.com', mobile: '4938733328', regDate: 'Jan 21, 2023', fee: 'Paid' },
        { sno: 3, regNo: 'MBR-348', name: 'Achal Siddharth Yadav', email: 'jagobhartiye@gmail.com', mobile: '9792072100', regDate: 'Jan 21, 2023', fee: 'Un Paid' },
        { sno: 4, regNo: 'MBR-346', name: 'VeHeHHOAcam', email: 'yoltribal34@gmail.com', mobile: '4171361476', regDate: 'Jan 21, 2023', fee: 'Paid' },
        { sno: 5, regNo: 'MBR-345', name: 'Shrikant', email: 'shreekantkr03@gmail.com', mobile: '8765656668', regDate: 'Jan 21, 2023', fee: 'Paid' },
        { sno: 6, regNo: 'MBR-344', name: 'Arjun Maurya', email: 'arjunmaurya@cyber.com', mobile: '9026725217', regDate: 'Jan 21, 2023', fee: 'Un Paid' },
        { sno: 7, regNo: 'MBR-343', name: 'rushAYTjo', email: 'drobeictiaolvk1q@yahoo.com', mobile: '6599413365', regDate: 'Jan 21, 2023', fee: 'Paid' },
        { sno: 8, regNo: 'MBR-340', name: 'shivRQqEiLIZF', email: 'teirkpadilla@gmail.com', mobile: '2581093049', regDate: 'Jan 21, 2023', fee: 'Un Paid' },
        { sno: 9, regNo: 'MBR-338', name: 'wVJCUbkZfM', email: 'moogriffi50@gmail.com', mobile: '8886613957', regDate: 'Jan 21, 2023', fee: 'Paid' },
        { sno: 10, regNo: 'MBR-338', name: 'wVJCUbkZfM', email: 'moogriffi50@gmail.com', mobile: '8886613957', regDate: 'Jan 21, 2023', fee: 'Paid' }
      ];

      activeMembers = [
        {
          sno: 1,
          regNo: 'MBR-365',
          name: 'ZaqFelxFUgMwWvK',
          email: 'kaelewilkin@gmail.com',
          mobile: '5876190262'
        },
        {
          sno: 2,
          regNo: 'MBR-364',
          name: 'AbVRWhzfn',
          email: 'layupateluj46@gmail.com',
          mobile: '4938733328'
        },
        {
          sno: 3,
          regNo: 'MBR-348',
          name: 'Achal Siddharth Yadav',
          email: 'jagobhartiye@gmail.com',
          mobile: '9792072100'
        },
        {
          sno: 4,
          regNo: 'MBR-346',
          name: 'VeHEHHOAcam',
          email: 'yoltribal34@gmail.com',
          mobile: '4171361476'
        },
        {
          sno: 5,
          regNo: 'MBR-345',
          name: 'Shrikant',
          email: 'shreekantkr03@gmail.com',
          mobile: '8765656668'
        },
        {
          sno: 6,
          regNo: 'MBR-344',
          name: 'Arjun Maurya',
          email: 'arjunmaurya.cyber@gmail.com',
          mobile: '9026725217'
        },
        {
          sno: 7,
          regNo: 'MBR-342',
          name: 'rushAYTjo',
          email: 'drobeictiaolvk1q@yahoo.com',
          mobile: '6599413365'
        }
      ];


      totalMembers = [
        {
          sno: 1,
          regNo: 'MBR-365',
          name: 'ZaqFelxFUgMwWvK',
          email: 'kaelewilkin@gmail.com',
          mobile: '5876190262',
          activeDate: 'Jan 21, 2025'
        },
        {
          sno: 2,
          regNo: 'MBR-364',
          name: 'AbVRWhzfn',
          email: 'layupateluj46@gmail.com',
          mobile: '4938733328',
          activeDate: 'Jan 21, 2025'
        },
        {
          sno: 3,
          regNo: 'MBR-348',
          name: 'Achal Siddharth Yadav',
          email: 'jagobhartiye@gmail.com',
          mobile: '9792072100',
          activeDate: 'Jan 21, 2025'
        },
        {
          sno: 4,
          regNo: 'MBR-346',
          name: 'VeHEHHOAcam',
          email: 'yoltribal34@gmail.com',
          mobile: '4171361476',
          activeDate: 'Jan 21, 2025'
        },
        {
          sno: 5,
          regNo: 'MBR-345',
          name: 'Shrikant',
          email: 'shreekantkr03@gmail.com',
          mobile: '8765656668',
          activeDate: 'Jan 21, 2025'
        },
        {
          sno: 6,
          regNo: 'MBR-344',
          name: 'Arjun Maurya',
          email: 'arjunmaurya.cyber@gmail.com',
          mobile: '9026725217',
          activeDate: 'Jan 21, 2025'
        },
        {
          sno: 7,
          regNo: 'MBR-342',
          name: 'rushAYTjo',
          email: 'drobeictiaolvk1q@yahoo.com',
          mobile: '6599413365',
          activeDate: 'Jan 21, 2025'
        }
      ];


      inactiveMembers = [
        {
          sno: 1,
          regNo: 'MBR-365',
          name: 'ZaqFelxFUgMwWvK',
          email: 'kaelewilkin@gmail.com',
          mobile: '5876190262',
          activeDate: 'Jan 21, 2025'
        },
        {
          sno: 2,
          regNo: 'MBR-364',
          name: 'AbVRWhzfn',
          email: 'layupateluj46@gmail.com',
          mobile: '4938733328',
          activeDate: 'Jan 21, 2025'
        },
        {
          sno: 3,
          regNo: 'MBR-348',
          name: 'Achal Siddharth Yadav',
          email: 'jagobhartiye@gmail.com',
          mobile: '9792072100',
          activeDate: 'Jan 21, 2025'
        },
        {
          sno: 4,
          regNo: 'MBR-346',
          name: 'VeHEHHOAcam',
          email: 'yoltribal34@gmail.com',
          mobile: '4171361476',
          activeDate: 'Jan 21, 2025'
        },
        {
          sno: 5,
          regNo: 'MBR-345',
          name: 'Shrikant',
          email: 'shreekantkr03@gmail.com',
          mobile: '8765656668',
          activeDate: 'Jan 21, 2025'
        },
        {
          sno: 6,
          regNo: 'MBR-344',
          name: 'Arjun Maurya',
          email: 'arjunmaurya.cyber@gmail.com',
          mobile: '9026725217',
          activeDate: 'Jan 21, 2025'
        },
        {
          sno: 7,
          regNo: 'MBR-342',
          name: 'rushAYTjo',
          email: 'drobeictiaolvk1q@yahoo.com',
          mobile: '6599413365',
          activeDate: 'Jan 21, 2025'
        }
      ];
}
