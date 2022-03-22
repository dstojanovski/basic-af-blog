import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  confirmUser = false;
  didFail = false;
  isLoading = false;
  @ViewChild('usrForm') form: NgForm;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.authIsLoading.subscribe(
      (isLoading: boolean) => this.isLoading = isLoading
    );
    this.authService.authDidFail.subscribe(
      (didFail: boolean) => this.didFail = didFail
    );
  }

  onSubmit() {
    const usrName = this.form.value.username;
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.authService.signUp(usrName, email, password);
  }

  onDoConfirm() {
    this.confirmUser = true;
  }

  onConfirm(formValue: { usrName: string, validationCode: string }) {
    this.authService.confirmUser(formValue.usrName, formValue.validationCode);
  }
}
