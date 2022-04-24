import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  @ViewChild('miFormulario')miFormulario!:NgForm;

  initForm={
    producto:'RTX 3080ti',
    precio:0,
    existencias: 10
  }

  constructor() { }

  ngOnInit(): void {
  }
  nombrevalido():boolean{
    return this.miFormulario?.controls["producto"]?.invalid && 
           this.miFormulario?.controls["producto"]?.touched
  }
  preciovalido():boolean{
    return this.miFormulario?.controls["precio"]?.value<0 && 
           this.miFormulario?.controls["precio"]?.touched
  }
  guardar(){
    // console.log(this.miFormulario)
    console.log('Posteo Correcto');
    this.miFormulario.resetForm({
      producto:"Algo",
      precio:0,
      existencias:0
    });
  }

}
