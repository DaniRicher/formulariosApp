import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent { 

  get favoritosArray(){
    return this.miFormulario.get('favoritos')as FormArray
  }

  nuevoFavorito:FormControl=this.formBuilder.control("",Validators.required);

  constructor(private formBuilder:FormBuilder) { }

  miFormulario:FormGroup=this.formBuilder.group({
    nombre:["", [Validators.required, Validators.minLength(3)]],
    favoritos:this.formBuilder.array([
    ['Metal Gear',Validators.required],
    ['Death Stranding', Validators.required]
    ],Validators.required)
  })

  

  campoEsValido(campo:string){

    return this.miFormulario.controls[campo].errors
           && this.miFormulario.controls[campo].touched
    
  }

  guardarFavorito(){
    if(this.nuevoFavorito.invalid){return;}
    //this.favoritosArray.push(new FormControl(this.nuevoFavorito.value,Validators.required));
    this.favoritosArray.push(this.formBuilder.control(this.nuevoFavorito.value,Validators.required));
    this.nuevoFavorito.reset();
  }
  borrar(index:number){
      this.favoritosArray.removeAt(index);
    }
  
  guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

}
