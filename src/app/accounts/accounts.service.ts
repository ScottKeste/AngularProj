import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AccountsResp{
    command: string;
    rowCount: string;
    old: string;
    rows: string;

}

@Injectable()
export class AccountsService {
  constructor(private http: HttpClient) { }

   

  getAccounts() {
    return this.http.get('http://localhost:8080/accounts'); 
   
    }

}