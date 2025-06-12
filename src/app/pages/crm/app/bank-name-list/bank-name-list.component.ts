import { Component, OnInit } from '@angular/core';
import { BankService } from '../services/bank/bank.service';
import { Bank } from '../model/bank/bank';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../pipe/filtering.pipe';

@Component({
     standalone: true,
      imports:[CommonModule,FormsModule,FilterPipe],
  selector: 'app-bank-name-list',
  templateUrl: './bank-name-list.component.html',
  styleUrls: ['./bank-name-list.component.css']
})
export class BankNameListComponent implements OnInit {
  BankListFilter: any;
  BankList!: Bank[];
  model!: Bank;
  totalRec: any;
  constructor(private _objBankService: BankService, private router: Router) { }


  ngOnInit(): void {
    this.GetBankNameList();
  }
  GetBankNameList() {
    this._objBankService.GetBankList().subscribe(
      response => {
        this.BankList = response

      },
      error => alert('InternalServer Error')
    )
  }
  // editBank(Id) {
  //   this.router.navigate(['/home/addbank'], { queryParams: { id: Id } });
  // }

  editBank(bankdetail) {
    this._objBankService.bankEdit({bankdetail});
  }

}
