import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { DecimalPipe, CommonModule} from '@angular/common';
@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: [DashboardService]
})
export class DashboardModule {

}
