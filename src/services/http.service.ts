import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ServicioHttp {
  constructor(private http: HttpClient) { }

  obtenerCreditos(){
    console.log(this.http.get('http://localhost:8000/api/creditos/').toPromise())
    return this.http.get('http://localhost:8000/api/creditos/').toPromise()
  }

  obtenerCreditosbyId(id:string){
    console.log(this.http.get('http://localhost:8000/api/creditos/' + id + "/").toPromise())
    return this.http.get('http://localhost:8000/api/creditos/' + id + "/").toPromise()
  }

  crearCredito(obj:object){
    const res = this.http.post('http://localhost:8000/api/creditos/add/',obj).toPromise()
    return res
  }

  borrarCredito(id:string){
    return this.http.post('http://localhost:8000/api/creditos/delete/' + id + "/",'').toPromise()
  }

  updateCredito(id:string,data:object){
    return this.http.post('http://localhost:8000/api/creditos/update/' + id + "/",data).toPromise()
  }
}