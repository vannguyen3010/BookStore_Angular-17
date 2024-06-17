import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export default class RegisterComponent implements OnInit {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  registerForm !: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: confirmPasswordValidator('password','confirmPassword')
      //trả về một hàm validator để kiểm tra giá trị của password và confirmPassword.
    }
    );
  }

  register(){
    this.authService.registerService(this.registerForm.value)
    .subscribe({
      next:(res)=>{
        alert("User Created!");
        this.registerForm.reset();
        this.router.navigate(['login'])
      },
      error:(err)=>{
        console.log(err);

      }
    })

  }
}
