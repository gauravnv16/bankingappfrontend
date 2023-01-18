import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MydetailsService {

  constructor(
    private http:HttpClient
  ) { }

  user = this.fecthUser();

  fecthUser(){
    let user = sessionStorage.getItem('user');
    if(user !== null){
      return JSON.parse(user);
    }
    return "";
  }

  
  getData(){
    return this.http.post('http://localhost:8080/accounts',this.fecthUser().ID);
  }

  getTransactions(){
    return this.http.get('http://localhost:8080/transactions');
  }

  // getTransaction(){
  //   return this.http.post('http://localhost:8080/transactions',this.fecthUser().ID);
  // }
}
