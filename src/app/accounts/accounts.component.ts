import { Component, OnInit } from '@angular/core';
import { AccountsResp, AccountsService } from './accounts.service';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  providers: [AccountsService],
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

    accountsResp : AccountsResp;

  constructor(private accountsService: AccountsService) { }

  ngOnInit() {
  }

    getAccounts(){
        //this.accountsService.getAccounts()
        //    .subscribe( accountsResp => this.accountsResp = accountsResp);
            
    }

}
