import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';
import { CovidApiService } from 'src/app/services/covid-data/covid-api.service';

import { CovidGlobalSummaryDTO } from 'src/app/DTOs/covid-global-summary';
import { CovidSummary } from 'src/app/DTOs/covid-data-summary-response';
import { Line } from 'src/app/charts/line/line';
const AUTH_API = 'http://localhost:8080/';
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
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private covidService: CovidApiService,
    private lineChart: Line
  ) { }

  ngOnInit(): void {
    this.getCovidGeneralData();
    this.auxLineChart = this.initLineChart();
    this.initMapStyles();
  }
  initMapStyles() {
    this.styles = [
      {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.local",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }
    ]
  }
  initLineChart() {
    this.lineChart.options = {
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          }, ticks: {
            display: false
          }
        }],
        yAxes: [{
          gridLines: {
            display: false
          }, ticks: {
            display: false
          }
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
  async getCovidGeneralData() {
    await this.covidService.getCovidTotalCasesSummary().toPromise()
      .then(data => {
        this.auxCovidSummary = data;

        for (var i in this.auxCovidSummary.Countries) {

          if (this.auxCovidSummary.Countries[i].Country === "Dominican Republic") {
            this.covidData = this.auxCovidSummary.Countries[i];
          }
        }

      });
  }
}
