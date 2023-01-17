import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName} from '@angular/forms';
import { Router } from '@angular/router';
import * as UUID from 'uuid-int';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm = new FormGroup({
    USERNAME:new FormControl(''),
    EMAIL:new FormControl(''),
    PASSWORD:new FormControl(''),
    ACCOUNT_NUMBER:new FormControl(UUID(1).uuid())
  })

  registerUser(){
    fetch('http://localhost:8080/register', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(this.registerForm.value)
    }).then(response => response.json()).then(data => {
      if(data.message === "Registration Successful"){
        this.router.navigate(['login']);
        console.log('Login Successful');
      }
    }).catch(error => {
      console.log(error);
    })
    
  }


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
