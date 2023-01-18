import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MydetailsService } from '../services/mydetails.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  
  user = this.fecthUser();
  details:any;
  details$:any;
  transactions:any;
  transactions$:any;

  showPopup_ADDFUNDS = false;
  showPopup_TRANSFER= false;

  showpopup_TRANSFER(){
    this.showPopup_TRANSFER = true;
  }
  closepopup_TRANSFER(){
    this.showPopup_TRANSFER = false;
  }

  showpopup_ADDFUNDS(){
    this.showPopup_ADDFUNDS = true;
  }
  closePopup_ADDFUNDS(){
    this.showPopup_ADDFUNDS = false;
  }

  fecthUser(){
    let user = sessionStorage.getItem('user');
    if(user !== null){
      return JSON.parse(user);
    }
    return "";
  }

  fetchDetails(){
    fetch('http://localhost:8080/accounts',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:this.fecthUser().ID
    }).then(response => response.json()).then(data => {
      // console.log(data[0]);
      this.details = data[0];
    }).catch(error => {
      console.log(error);
    });
    return {}
  }

  AddFund(){
    const amount = document.getElementById('amount') as HTMLInputElement;
    const id = document.getElementById('id') as HTMLInputElement;

    const AddFund = {
      ACCOUNT_NUMBER:id.value,
      AMOUNT:amount.value
    }
    console.log(AddFund);
    fetch('http://localhost:8080/addfunds',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(AddFund),
    }).then(response => response.json()).then(data => {
      window.location.reload();
    }
    ).catch(error => {
      console.log(error);
    }
    );

  }

  SendFund(){
    const amount = document.getElementById('trans_amount') as HTMLInputElement;
    const id = document.getElementById('trans_id') as HTMLInputElement;
    const to = document.getElementById('trans_accountnumber') as HTMLInputElement;

    const SendFund = {
      SENDER_ACCOUNT_NUMBER:id.value,
    	AMOUNT:amount.value,
    	RECEIVER_ACCOUNT_NUMBER:to.value
    }
    console.log(SendFund);
    fetch('http://localhost:8080/transferfunds',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(SendFund),
    }).then(response => response.json()).then(data => {
      window.location.reload();
    }
    ).catch(error => {
      console.log(error);
    }
    );
  }


  fetchTransactions(){
    fetch('http://localhost:8080/transactions',{
      method:'GET',
      headers:{
        'Content-Type':'application/json'
      },
    }).then(response => response.json()).then(data => {
      console.log(data);
      this.transactions = data;
    }).catch(error => {
      console.log(error);
    });
    return {}
  }

  logOut(){
    sessionStorage.removeItem('user');
    this.router.navigate(['login']);
  }
 
  constructor(
    private router: Router,
    private  mydetailsService: MydetailsService
  ) { }

  ngOnInit(): void {
    this.details = this.fetchDetails();
    this.transactions = this.fetchTransactions();
    // console.log(this.details);
  }
}
