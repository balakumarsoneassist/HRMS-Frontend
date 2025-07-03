import { Injectable } from '@angular/core';
import { Api } from '../api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {
  private SaveLocationDetailsUrl = Api.SaveLocationDetailsUrl;
  private GetLocationListUrl = Api.GetLocationListUrl;
  private GetLocationByIdUrl = Api.GetLocationByIdUrl;

  private locationSubject = new BehaviorSubject<any>(null);
  locationObservable = this.locationSubject.asObservable();

  private locationRefreshSubject = new BehaviorSubject<any>(null);
  locationRefreshObservable = this.locationRefreshSubject.asObservable();

  constructor(private objApi: Api) {}

  SaveLocationDetails(locationDetails: any) {
    return this.objApi.callPost(this.SaveLocationDetailsUrl, locationDetails);
  }

  GetLocationList() {
    return this.objApi.callPost(this.GetLocationListUrl);
  }

  GetLocationById(locationDetails: any) {
    return this.objApi.callPost(this.GetLocationByIdUrl, locationDetails);
  }

  locationEdit(locationDetail: any) {
    this.locationSubject.next(locationDetail);
  }

  locationListRefresh() {
    this.locationRefreshSubject.next(null);
  }
}
