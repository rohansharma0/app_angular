import { Injectable } from '@angular/core';
import {Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  private socket : Socket = io('http://localhost:8081');
  
  connect = () => {
    return this.socket.on("connect" , ()=>{
      console.log("Socket connection established");
    })
  }

  joinChatRoo = () => {
    this.socket.on("join_room" , () => {
      
    })
  }

}
