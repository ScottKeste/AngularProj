import { Component, OnInit } from '@angular/core';
import { AccountsResp, AccountsService } from './accounts.service';
import { Observable ,Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  providers: [AccountsService],
  styleUrls: ['./accounts.component.css']
})


export class AccountsComponent implements OnInit {

    testVar : String;
    accountsResp : AccountsResp;
    dataFromSF : Observable<any>
    data : String;
    baseUrl : String;
    editMode : boolean;

  constructor(private accountsService: AccountsService, private http: HttpClient) { }

  
  ngOnInit() {
        this.testVar = "ABCDEFG";
        this.editMode = false;
        var getUrl = window.location;
        this.baseUrl = getUrl .protocol + "//" + getUrl.host;
        console.log(this.baseUrl);
        this.getData();
  }
    toggleEditMode(){
        this.editMode = !this.editMode;
    }
    getAccounts(){
        //this.accountsService.getAccounts()
        //    .subscribe( accountsResp => this.accountsResp = accountsResp);
            
    }

    getData(){
        this.dataFromSF = this.http.get(this.baseUrl + '/accounts');
        this.dataFromSF.subscribe(val => this.data = val);
    }

    trackByIndex(index: number, obj: any): any {
      return index;
    }

    loadValueChange(event,index,field){
        console.log("Event is " + event + " " + index + " " + field);
    }
}
