import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-registration',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  form!: FormGroup;
  
  constructor(public fb: FormBuilder) { }

  get f(): any { return this.form.controls; }

  ngOnInit(): void {
    this.validation();
  }

  private  validation(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('senha', 'confirmeSenha')
    };

    this.form = this.fb.group({
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmeSenha: ['', Validators.required],
    }, formOptions);
  }
}
