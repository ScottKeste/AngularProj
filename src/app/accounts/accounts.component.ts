import { Component, OnInit } from '@angular/core';
import { AccountsResp, AccountsService } from './accounts.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  providers: [AccountsService],
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

    accountsResp : AccountsResp;
    data : Observable<any>;
    baseUrl : String;
  constructor(private accountsService: AccountsService, private http: HttpClient) { }

    
  ngOnInit() {
        var getUrl = window.location;
        this.baseUrl = getUrl .protocol + "//" + getUrl.host;
        console.log(this.baseUrl);
  }

    getAccounts(){
        //this.accountsService.getAccounts()
        //    .subscribe( accountsResp => this.accountsResp = accountsResp);
            
    }

    getData(){
        this.data = this.http.get(this.baseUrl + '/accounts');
    }

}
