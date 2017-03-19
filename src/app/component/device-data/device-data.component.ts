import { Component, OnInit } from '@angular/core';
import { DeviceDataService } from '../../service/device-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderByPipe } from '../../pipes/order-by.pipe';


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
  display_table: boolean = false;
  display_chart: boolean = false;

  public lineChartData: Array<any>;
  public lineChartLabels: Array<any>;
  public lineChartOptions: any;
  public lineChartColors: Array<any>;
  public lineChartLegend: boolean;
  public lineChartType: string;
  

  constructor(private deviceDataService: DeviceDataService) {
    this.getDeviceList();
  }
  drawChart(d:any) {
    console.log("this is my data in chart : ", d[0].ValueA);
    var value = [];  
    var time = [];  
    for(var i=0;i<d.length;i++){
      value[i] = d[i].ValueA;
      time[i] = d[i].CreatedDateTime;
      console.log("this is value a for " + value[i]);
      console.log("this is value for time " + time[i]);
    }
    this.lineChartData = [
      { data: value, label: 'Value A' }
    ];
    this.lineChartLabels = time;
    this.lineChartOptions = {
      responsive: true
    };
    this.lineChartColors = [
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];
    this.lineChartLegend = true;
    this.lineChartType = 'line';
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
        for (var i = 0; i < this.data.length; i++) {
        var d = new Date(this.data[i].CreatedDateTime);
        var localTime = d.getTime();
        this.data[i].CreatedDateTime = new Date((localTime - (new Date().getTimezoneOffset() * 60000))).toLocaleString();
      }
        if (this.form.value.displayType === "chart") {
          this.display_table = false;

          this.drawChart(this.data);
          this.display_chart = true;
        } else if (this.form.value.displayType === "table") {
          this.display_chart = false;
          this.display_table = true;
        }
        console.log(this.data);
      }
    });
  }

  ngOnInit() {
    this.form = new FormGroup({
      deviceID: new FormControl('', Validators.compose([Validators.required])),
      displayType: new FormControl('', Validators.compose([Validators.required])),
    })
  }

}
