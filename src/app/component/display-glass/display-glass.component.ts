import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeviceDataService } from '../../service/device-data.service';

@Component({
  selector: 'display-glass',
  templateUrl: './display-glass.component.html',
  styleUrls: ['./display-glass.component.css'],
  providers: [DeviceDataService],
})
export class DisplayGlassComponent implements OnInit {
  form;
  data;
  deviceList;
  list = [];
  glassValue = 0;

  constructor(private deviceDataService: DeviceDataService) {

  }
  getData(event) {
    this.deviceDataService.getFilterDevices(this.form.value.deviceID).subscribe(x => {
      this.data = x;
      if (this.data.length !== 0) {
        var loaded = 0;
        var count = document.getElementById("counter");
        var drink = document.getElementById("drink");
        this.glassValue = this.data[0].ValueA;
        for (loaded; loaded <= Math.floor(this.glassValue / 10); loaded++) {
          (function (x) {
            setTimeout(function () {
              count.innerHTML = x + '%';
              drink.style.top = (100 - x * .9) + '%';
            }, x * 30);
          })(loaded);
        }
      }

    });
  }
  getDeviceList() {
    this.deviceDataService.getDevices('').subscribe(x => {
      this.deviceList = x;
      console.log(this.deviceList);
    })
  }

  ngOnInit() {
    this.getDeviceList();
    this.form = new FormGroup({
      deviceID: new FormControl('', Validators.compose([Validators.required])),
    })


  }

}
