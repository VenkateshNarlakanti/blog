import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
@NgModule({
  imports: [
    FormsModule,
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [DashboardService]
})
export class DashboardModule {

}