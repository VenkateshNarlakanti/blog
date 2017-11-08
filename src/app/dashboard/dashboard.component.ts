import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  weather: any;
  city_name: string;
  weatherResponse: any;
  geoLocation: any;
  lat: any;
  long: any;
  toFh: any;
  getGeoString: any;
  weatherDesc: any;
  weatherMain: any;
  foreCast: any;
  foreCastResponse: any;
  form = { city_name: '' };
  constructor(
    private _DashboardService: DashboardService
  ) { }

  public getWeather() {
    this.weather = this._DashboardService.getWeather(this.form.city_name)
      .subscribe((response: any) => {
        this.weatherResponse = response;
        this.weatherMain = response.weather[0].main;
        this.weatherDesc = response.weather[0].description;
        console.log(this.weatherDesc);
        this.getForeCast();
      });
  }
  public getForeCast() {
    this.foreCast = this._DashboardService.getForeCast(this.form.city_name)
    .subscribe((response: any) => {
      this.foreCastResponse = response.list;
      console.log(this.foreCastResponse);
    });
  }
  public toFahrenheit(value) {
    const ConNumber = ((value - 273.15)  * 1.8) + 32;
    const math = Math.round(ConNumber * 100) / 100;
    return math;
  }
  public getCoordinates() {
    if (navigator.geolocation) {
        this.geoLocation = navigator.geolocation.getCurrentPosition(this.showPosition);
        // console.log(this.geoLocation);
    } else {
      alert('geolocation not supported by this browser');
    }
  }
  public showPosition(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    // console.log('lat:' + lat);
    console.log('long:' + long);

    // this.callBackTimeOut();
  }
  public callBackTimeOut() {
    setTimeout(() => this.getGeoLocationName(), 2000);
  }
  public getGeoLocationName() {
    this.getGeoString = this._DashboardService.getGeoName(this.lat, this.long)
    .subscribe((response: any) => {
     console.log(response);
    });
  }
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };
  ngOnInit() {
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
    this.getCoordinates();
    const dataDailySalesChart: any = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
        [12, 17, 7, 17, 23, 18, 38]
      ]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
      labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
      series: [
        [230, 750, 450, 300, 280, 240, 200, 190]
      ]
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    }

    var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);



    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    var dataEmailsSubscriptionChart = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

      ]
    };
    var optionsEmailsSubscriptionChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var emailsSubscriptionChart = new Chartist.Bar('#emailsSubscriptionChart', dataEmailsSubscriptionChart, optionsEmailsSubscriptionChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(emailsSubscriptionChart);
  }

}
