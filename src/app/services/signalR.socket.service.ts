import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { Wishlist } from '../models/wishlist.model';

@Injectable({
  providedIn: 'root'
})
export class SignalRSocketService {
  _hubConnection: HubConnection;
  signalRData : any[] = [];
  constructor(
      public httpClient: HttpClient
  ) { }

  signalRInitial(){
      this._hubConnection = new HubConnectionBuilder().withUrl('https://localhost:5001/notify').build();
      this._hubConnection.start()
      .then(()=>{
          console.log('Connecting....');
      })
      .catch(err=>{
          console.log('Connection failure...', err)
      });

      this._hubConnection.on('BroadcastMessage', (messages)=>{
          console.log(messages);
          this.signalRData.push(messages);
      })
  }
  getMessage(){
      this.httpClient.get(environment.API + '/Message/GetMessages')
  }
}
