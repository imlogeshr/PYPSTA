import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    projectData=[{"id":1,
"name":"project1"},{"id":2,
"name":"project2"}]
taskData=[{
"id":1,
"project":"project1",
"name":"Test1",
"assignedTo":"developer",
"status":"start"},
{
"id":2,
"project":"project2",
"name":"TestTask2",
"assignedTo":"developer",
"status":"complete"}
]
userData=[{"id":1,
"name":"admin",
"userType":"admin"},{"id":2,
"name":"manager",
"userType":"manager"},{"id":3,
"name":"developer",
"userType":"developer"}
]


    constructor(
        private formBuilder: FormBuilder,
        private router: Router

    ) { }


    ngOnInit() {
       localStorage.setItem('projectData', JSON.stringify(this.projectData))
       localStorage.setItem('taskData', JSON.stringify(this.taskData))
       localStorage.setItem('userData', JSON.stringify(this.userData))
      console.log(localStorage.getItem('verifiedUser'))
      if(localStorage.getItem('verifiedUser')=='true'){
  this.router.navigate(['/secure/dashboard']);
      }
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        this.submitted = true;

        if(this.loginForm.valid){
          this.loading==true;
          if(this.loginForm.value.username=="admin"&&this.loginForm.value.password=="pass"){
            localStorage.setItem('role', "ADMIN")
            localStorage.setItem('verifiedUser', "true")
             this.router.navigate(['/secure/dashboard']);

          }else if(this.loginForm.value.username=="manager"&&this.loginForm.value.password=="pass"){
            localStorage.setItem('role', "MANAGER")
          localStorage.setItem('verifiedUser', "true")
             this.router.navigate(['/secure/dashboard']);
          }else if(this.loginForm.value.username=="developer"&&this.loginForm.value.password=="pass"){
            localStorage.setItem('role', "DEVELOPER")
          localStorage.setItem('verifiedUser', "true")
             this.router.navigate(['/secure/dashboard']);
          }
          else{
             this.loading==true;
          }
        }


        }
}
