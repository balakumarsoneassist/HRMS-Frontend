import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Api } from '../api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  private RefreshTokenUrl:string=Api.RefreshTokenUrl;
  private GetTokenUrl:string=Api.GetTokenUrl;
  public LoginValidation(loginCredential){
    var userData = "username="+loginCredential.UserId+"&password="+ loginCredential.PassWord+"&grant_type=password&proj=crm";
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      //'No-Auth':'True',
    });
    return this.http.post(this.GetTokenUrl,userData);
  }

  public RefreshToken()
  {
    let tokens : any = localStorage.getItem('oneAssistTokenStorage')
    var token = JSON.parse(tokens);
    var user = {
      grant_type: 'refresh_token',
      refresh_token: token.refresh_token
  }
  var data = "grant_type=refresh_token&refresh_token=" + token.refresh_token + "&client_id=";
  var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded','No-Auth':'True' });
  return this.http.post(this.RefreshTokenUrl, data, {headers: reqHeader})
  }
}
