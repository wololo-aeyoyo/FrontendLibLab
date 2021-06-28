import { Component, OnInit , ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import {ServicioHttp} from '../services/http.service'
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ServicioHttp]
})

export class AppComponent {
  constructor(private fb: FormBuilder,
    private http:ServicioHttp){}

  @ViewChild('formDirective') formDirective: any;

  tiposCliente = [
    {viewValue:"Bueno",value:"Bueno"},
    {viewValue:"Regular",value:"REGULAR"},
    {viewValue:"Malo",value:"MALO"}
  ]
  puntuacionNum = [
    1,2,3,4,5,6,7,8,9,10
  ]
  formCredito:any;
  title = 'prueba';
  lista: any ;
  no = 1;
  displayedColumns: string[] = ['id','fecha','deuda', 'id_puntuacion', 'AlgoritoIa', 'acciones', 'eliminar'];
  
  async ngOnInit (){

    this.formCredito = this.fb.group({
        monto: ['', [Validators.required, Validators.max(50000), Validators.min(1)]],
        puntuacionCliente: ['', Validators.required],
        puntuacionAi: ['', Validators.required]
    });
    const res:any = await this.http.obtenerCreditos()
    this.lista = [...res]
    
  }

  async  onSubmit(){
    const json ={
      'status':false,
      'deuda':this.formCredito.value.monto,
      'AlgoritoIa':this.formCredito.value.puntuacionAi,
      'fecha':formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      'id_user':2,
      'id_puntuacion':pCliente(this.formCredito.value.puntuacionCliente)
    }
    const monto = "$" + this.formCredito.value.monto  
  //  const obj = {...this.formCredito.value,monto,status:false,fecha:'2020-06-27',id_user:2}
    //this.no = ++this.no
    const respuesta:any =await this.http.crearCredito(json)
    
    this.lista = [...this.lista,respuesta]
    this.formCredito.reset()
    this.formDirective.resetForm();
    console.log(this.lista);
    

  }

  async aprobar(id:string){
    const data:any = await this.http.obtenerCreditosbyId(id);
    console.log(data)
    data.status = true;
    console.log(data)
   this.http.updateCredito(id,data)
   const res:any = await this.http.obtenerCreditos()
   this.lista = [...res]
  }

 async noAprobar(id:string){
  const data:any = await this.http.obtenerCreditosbyId(id);
  console.log(data)
  data.status = false;
  console.log(data)
 this.http.updateCredito(id,data)
 const res:any = await this.http.obtenerCreditos()
 this.lista = [...res]
    
  } 

  async eliminar(id:string){
    this.http.borrarCredito(id)
    const res:any = await this.http.obtenerCreditos()
    this.lista = [...res]
  }


}
function pCliente(pC:string) {
  if( pC == "Bueno") return 3
  else if( pC == "Regular") return 2
  return 1;

  
    
}