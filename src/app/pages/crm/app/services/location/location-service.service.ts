import { Injectable } from '@angular/core';
import { Api } from '../api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {

  constructor(private objApi:Api) { }
  private SaveLocationDetailsUrl:string=Api.SaveLocationDetailsUrl;
  private GetLocationListUrl=Api.GetLocationListUrl;
  private GetLocationByIdUrl=Api.GetLocationByIdUrl;
  SaveLocationDetails(LocationDetails){
      return this.objApi.callPost(this.SaveLocationDetailsUrl,LocationDetails)
  }
 GetLocationList(){
    return this.objApi.callPost(this.GetLocationListUrl)
}
GetLocationById(locationDetails){
  return this.objApi.callPost(this.GetLocationByIdUrl,locationDetails)
}

private locationSubject = new Subject<any>();
  locationObservable = this.locationSubject.asObservable();

  locationEdit(locationDetail) {
    this.locationSubject.next(locationDetail);
  }

}
