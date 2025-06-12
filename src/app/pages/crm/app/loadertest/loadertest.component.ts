import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoaderService } from "../services/loader/loader.service";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    imports:[CommonModule,FormsModule],
  selector: 'app-loadertest',
  templateUrl: './loadertest.component.html',
  styleUrls: ['./loadertest.component.css']
})
export class LoadertestComponent implements OnInit {

  response;

  constructor(private http: HttpClient, public loaderService: LoaderService) {}

  run() {
    const url = "https://jsonplaceholder.typicode.com/albums/1";
    this.http.get(url).subscribe(r => (this.response = r));
  }

  ngOnInit(): void {
  }

}
