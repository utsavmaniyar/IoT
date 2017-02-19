import { Injectable } from '@angular/core';
import { Devices } from '../devices';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/RX';
@Injectable()
export class DeviceDataService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId: number = 0;
  headers: any;
  options: any;
  // Placeholder for todo's
  devices: Devices[] = [];
  constructor(private _http: Http) {

    this.headers = new Headers();
    this.headers.append('Access-Control-Expose-Headers', 'etag');
    this.options = new RequestOptions({ headers: this.headers });
  }


  // Simulate GET /todos
  getAllTodos(): Devices[] {
    return this.devices;
  }

  addTodo(device: Devices): DeviceDataService {
    if (!device.id) {
      device.id = ++this.lastId;
    }
    this.devices.push(device);
    return this;
  }


  getDevices(CustomerId: string) {
    return this._http.get('http://52.26.239.194/azurerest/api/devicedata/DeviceList?customerId' + CustomerId, this.headers)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getFilterDevices(deviceId: string) {
    return this._http.get('http://52.26.239.194/azurerest/api/devicedata/FilterDeviceData?id=' + deviceId, this.headers)
      //.map(this.extractData)
      .map(res => res.json())

      .catch(this.handleError);
    // console.log("service return",x);
    //return x;
  }

  public extractData(res: any) {

    if (res.status === 200) {
      var h = JSON.parse(res._body) || {};
      console.log("i'm here", h);
      return h;
    } else {
      this.handleError(res);
    }
  }
  public handleError(error: any) {
    //let errMsg = (error.message) ? error.message : (error.status ? `${error.status} - ${error.statusText}` : 'Server error');
    //this.logger.error(errMsg);
    console.log(error);
    return Observable.throw('Server error');
  }
  // Simulate GET /todos/:id
  getTodoById(id: number): Devices {
    return this.devices
      .filter(todo => todo.id === id)
      .pop();
  }
}
