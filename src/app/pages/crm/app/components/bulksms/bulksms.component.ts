import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SmssService } from '../../services/sms/smss.service';
import { BSms, Nsms } from '../../model/sms/bulksms';
import { TagInputModule } from 'ngx-chips';
@Component({
    standalone: true,
      imports:[CommonModule,FormsModule,TagInputModule],
  selector: 'app-bulksms',
  templateUrl: './bulksms.component.html',
  styleUrls: ['./bulksms.component.css']
})
export class BulksmsComponent implements OnInit {

  model!:BSms;
  model1!:Nsms;
  resp!:string;
  newMnos:any;
  constructor(private smsservice: SmssService) {

   }

  ngOnInit(): void {
    this.model = new BSms();
    this.model1 = new Nsms();
  }

  SendSms(){
   // console.log(this.model);
   // console.log(this.model1);
   // console.log(this.model.mobileNos)
   // console.log(this.model.mobileNos[0])
    this.newMnos = this.model.mobileNos;
  //  console.log(this.newMnos.length)
    var nm = "";
    for(var i=0; i< this.newMnos.length; i++){
      if(nm == "") {
        nm = this.newMnos[i].value;
      }
      else {
        nm = nm + "," + this.newMnos[i].value;
      }
    }
    this.model1.mobileNos = nm;
    console.log(nm);
    this.smsservice.sendBulkSms(this.model1).subscribe(
      response => {
        this.resp = response;
        console.log(this.resp);
        if (this.resp) {
          alert("Message Sent...!");
        } else {
          alert(this.resp);
        }

      },
      error => alert('InternalServer Error')
    )
  }

}
