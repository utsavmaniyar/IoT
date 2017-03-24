import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { DeviceDataComponent } from './component/device-data/device-data.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DisplayGlassComponent } from './component/display-glass/display-glass.component';

@NgModule({
  declarations: [
    AppComponent,
    DeviceDataComponent,
    OrderByPipe,
    DisplayGlassComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
