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
    console.log(this.details);
  }
}
