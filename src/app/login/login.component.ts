import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm = new FormGroup({
    USERNAME:new FormControl(''),
    PASSWORD:new FormControl('')
  });

  constructor(private router: Router) {
    if(sessionStorage.getItem('user') !== null){
      this.router.navigate(['dashboard']);
    }
   }

  ngOnInit(): void {
  }

  loginUser(){
    fetch('http://localhost:8080/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(this.LoginForm.value)
    }).then(response => response.json()).then(data => {
      if(data.message === undefined || data.message === null){
        sessionStorage.setItem('user',JSON.stringify(data));
        this.router.navigate(['dashboard']);
        console.log('Login Successful');
    
      }

    }).catch(error => {
      console.log(error);
    });
  }

}
