import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users:any = this.fetchUsers();
  transactions:any = this.fetchTransactions();

  fetchTransactions() {
    fetch('http://localhost:8080/transactions').then(response => response.json
    ()).then(data => {
      this.transactions = data;
    }
    ).catch(error => {
      console.log(error);
    });
  }
  fetchUsers() {
    fetch('http://localhost:8080/users').then(response => response.json
    ()).then(data => {
      this.users = data;
    }
    ).catch(error => {
      console.log(error);
    });
  }


  constructor() { }

  ngOnInit(): void {
  }

}
