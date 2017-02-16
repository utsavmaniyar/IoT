import { Component } from '@angular/core';
import { DeviceDataService } from './device-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [DeviceDataService],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  devices;
  constructor(private deviceService: DeviceDataService) {
    deviceService.getFilterDevices('35').subscribe(x => {
      this.devices = x;
      console.log(x);
      console.log("here test", this.devices);
    });
    /*
    
    getResult(Search:string){       this.searchService.getSearch(Search).subscribe(post => {       this.stack = post.items;       console.dir(this.stack);     })
    */
  }
}
