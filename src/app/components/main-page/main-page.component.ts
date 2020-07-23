/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, } from '@angular/core';
import { Subject } from 'rxjs';
import { CovidApiService } from 'src/app/services/covid-data/covid-api.service';
import { CovidGlobalSummaryDTO } from 'src/app/DTOs/covid-global-summary';
import { CovidSummary } from 'src/app/DTOs/covid-data-summary-response';
import { Line } from 'src/app/charts/line/line';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  username: string;
  latitude = 18.7357;
  longitude = -70.1627;
  mapType = 'roadmap';
  mapOptions = { zoom: 8 }
  covidData: CovidGlobalSummaryDTO = new CovidGlobalSummaryDTO();
  auxCovidSummary: CovidSummary;
  auxLineChart: Line;
  styles: any;
  state: boolean;
  infected:number;
  recovered:number;
  dead:number;
  province:string;

  constructor(
    private covidService: CovidApiService,
    private lineChart: Line
  ) { }




  ngOnInit(): void {

    this.state = false;
    this.auxLineChart = this.initLineChart();
    this.initMapStyles();
    this.getCovidGeneralData();

  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onHoverEffect( province:string,recovered:number,infected:number,dead:number){
    this.infected = infected;
    this.dead = dead;
    this.recovered = recovered;
    this.province = province;
     
  }



  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  initMapStyles() {
    this.styles = [
      {
        'featureType': 'landscape.natural',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'road',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'road.arterial',
        'elementType': 'labels',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'labels',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'road.local',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      }
    ]
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  initLineChart() {
    this.lineChart.options = {
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          },
        }],
        yAxes: [{
          gridLines: {
            display: false
          },
        }]
      }
    };
    this.lineChart.labels = ['1', '2', '3', '4', '5', '6', '7'];
    this.lineChart.type = 'line';
    this.lineChart.legend = false;
    this.lineChart.data = [

      { data: [28, 50, 90, 150, 300, 450, 600], label: '# de contagiados' }
    ];
    return this.lineChart;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async getCovidGeneralData() {
    await this.covidService.getCovidTotalCasesSummary().toPromise()
      .then(data => {
        this.auxCovidSummary = data;

        for (const i in this.auxCovidSummary.Countries) {

          if (this.auxCovidSummary.Countries[i].Country === 'Dominican Republic') {
            this.covidData = this.auxCovidSummary.Countries[i];
          }
        }

      });
    this.state = true;
  }
}
