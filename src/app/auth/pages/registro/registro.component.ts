import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/validator/validaciones';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: []
})
export class RegistroComponent implements OnInit {

  miFormulario:FormGroup=this.formBuilder.group({
    nombre:['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email:['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)],[this.emailValidator]],
    username:['', [Validators.required, this.validatorService.noPuedeSerStrider]],
    password:['', [Validators.required, Validators.minLength(6) ]],
    password2:['', [Validators.required, ]],
  },{
    validators:[this.validatorService.camposIguales('password', 'password2')]
  });



  get emailErrorMsg():string{
    const errors=this.miFormulario.get(['email'])?.errors;
    if(errors?.['required']){
      return 'El email es obligatorio'
    }else if(errors?.['pattern']){
      return 'Ingrese un formato valido'
    }else if(errors?.['emailTomado']){
      return 'El correo electronico ya está en uso'
    }
    return '';
  }

  constructor(private formBuilder:FormBuilder,
              private validatorService:ValidatorService,
              private emailValidator:EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre:'Daniel Alvarado',
      email:'test1@test.com',
      username:'dani_richer',
      password:'123456',
      password2:'123456',
    })
  }

  campoNoValido(campo:string){
    return this.miFormulario.get(campo)?.invalid
        && this.miFormulario.get(campo)?.touched
    // return this.miFormulario.controls[campo].errors
    //     && this.miFormulario.controls[campo].touched
  }

  submitFormulario(){
    console.log(this.miFormulario.value)
     this.miFormulario.markAllAsTouched();
  }

}
