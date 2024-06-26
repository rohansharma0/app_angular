import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Machine } from '../models/Machine';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(private http : HttpClient) { }

  getAllMachines = () : Observable<Machine[]> => {
    return this.http.get<Machine[]>(environment.rootUrl + "/api/v1/machine/all");
  }

  deleteMachine = (machineId : number) => {
    return this.http.delete(environment.rootUrl + "/api/v1/machine/" + machineId);
  }
}
