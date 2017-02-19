import { Component, OnInit } from '@angular/core';
import { DeviceDataService } from '../../service/device-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'device-data',
  templateUrl: './device-data.component.html',
  styleUrls: ['./device-data.component.css'],
  providers: [DeviceDataService],

})
export class DeviceDataComponent implements OnInit {
  form;
  data;
  deviceList;
  list = [];
  flag: boolean = false;
  show: boolean = false;

  constructor(private deviceDataService: DeviceDataService) {
    this.getDeviceList();
  }
  getDeviceList() {
    this.deviceDataService.getDevices('').subscribe(x => {
      this.deviceList = x;
      console.log(this.deviceList);
    })
  }
  getData(event) {
    this.deviceDataService.getFilterDevices(this.form.value.deviceID).subscribe(x => {
      this.data = x;
      this.flag = false;
      if (this.data.length !== 0) {
        this.flag = true;
      }
    });
  }

  ngOnInit() {
    this.form = new FormGroup({
      deviceID: new FormControl('', Validators.compose([Validators.required])),
    })
  }

}
