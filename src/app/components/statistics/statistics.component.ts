import { Component, OnInit } from '@angular/core';
import { CovidApiService } from 'src/app/services/covid-data/covid-api.service';

import { Line } from 'src/app/charts/line/line';
import { Doughnut } from 'src/app/charts/Doughnut/doughnut';
import { Bar } from 'src/app/charts/bar/bar';
import { ProjectStatisticsService } from 'src/app/services/project-statistics/project-statistics.service';
import { ProjectStatistics } from 'src/app/DTOs/Projectstatistics/Projectstatistics';
import { NodeLocationMarker } from 'src/app/DTOs/Projectstatistics/NodeLocatonMarker';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  auxLineChart: Line;
  auxDoughnut: Doughnut;
  auxBar: Bar;
  latitude = 18.7357;
  longitude = -70.1627;
  mapType = 'roadmap';
  mapOptions = { zoom: 8 }
  
  state: boolean;
  projectStatistics:ProjectStatistics[];
  statistics:ProjectStatistics;
  date = [];
  cases = [];

  malePercentaje = 0;
  femalePercentaje = 0;

  locations:NodeLocationMarker[];


  constructor(
     private lineChart: Line,
    private doughnutChart: Doughnut,
    private barChart: Bar,
    private projectStatistic:ProjectStatisticsService
  ) { }

  ngOnInit(): void {
    this.state = false;
    this.getStatistics();
    this.getNodesLocationMarker();
    this.auxBar = this.initBarChart();
    this.auxLineChart = this.initLineChart();
    this.auxDoughnut = this.initDoughnutChart();
    
   }
  async getStatistics(){
   await this.projectStatistic.getStatistics().toPromise().then(
      e => {
        if(e.status === 200){
          this.projectStatistics = e.result;
          this.projectStatistics.forEach(e => {
              this.date.push(e.localDate);
              this.cases.push(e.confirmedCases);
          })
              this.statistics = this.projectStatistics[0];
              // this.malePercentaje = (this.statistics.maleInfected/(this.statistics.maleInfected+this.statistics.femaleInfected))*100;
              // this.femalePercentaje = (this.statistics.femaleInfected/(this.statistics.maleInfected+this.statistics.femaleInfected))*100;
        }
       }
    )
    return this.statistics;
  }
  getNodesLocationMarker(){
      this.projectStatistic.getNodesLocationMarker().toPromise().then(
      e => {
        this.locations = e.result;
      })
      this.state = true;
  }

  placeMarker($event){
    console.log($event.coords.lat);
    console.log($event.coords.lng);
  }
 
  initLineChart() {
    this.lineChart.options = {
      scaleShowVerticalLines: false,
      responsive: true,
      curvature: 1,
      scales: {
        xAxes: [{
          barPercentage: 0.4,
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
    this.lineChart.labels = ['2020-05-25', '2020-05-26', '2020-05-27', '2020-05-28', '2020-05-29', '2020-05-30', '2020-05-31', '2020-06-1', '2020-06-2', '2020-06-3', '2020-06-4', '2020-06-5', '2020-06-6',
      '2020-06-7', '2020-06-8', '2020-06-9', '2020-06-10', '2020-06-11', '2020-06-12',
      '2020-06-13', '2020-06-14', '2020-06-15', '2020-06-16', '2020-06-17', '2020-06-18',
      '2020-06-19', '2020-06-20', '2020-06-21'];
    this.lineChart.type = 'line';
    this.lineChart.data = [
      {
        data: [200, 220, 220, 250, 400, 401, 172, 175, 177, 345, 300, 500, 145, 196, 201, 204,
          208, 204, 210, 215, 219, 212, 216, 251, 226,
          250, 237, 246], label: 'Casos acumulados', fill: false
      },
      {
        data: [150, 152, 157, 160, 165, 169, 172, 175, 177, 180, 183, 187, 191, 196, 201, 204,
          208, 214, 220, 225, 229, 232, 236, 241, 246,
          250, 257, 266], label: 'Casos nuevos', fill: false
      },
      {
        data: [300, 152, 15, 16, 16, 16, 0, 17, 177, 10, 13, 17, 11, 16, 20, 24,
          28, 24, 20, 25, 22, 0, 23, 21, 26,
          20, 57, 26], label: 'Casos recuperados', fill: false
      },

    ];
    return this.lineChart;

  }
  initBarChart() {
    this.barChart.options = {
      scaleShowVerticalLines: false,
      responsive: true,
      curvature: 1,
      scales: {
        xAxes: [{
          barPercentage: 0.4,
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
    this.barChart.labels = this.date;
    this.barChart.type = 'bar';
    this.barChart.legend = true;
    this.barChart.data = [
      {
        data: this.cases, label: 'Contagiados a la fecha', backgroundColor: '#2f9ce9', borderColor: '2f9ce9', hoverBackgroundColor: '#e92f2f'
      },

    ];
    return this.barChart;

  }
  initDoughnutChart() {
    this.doughnutChart.labels = ['Femenino', 'Masculino',]
    this.doughnutChart.data = [ 50, 50];
    this.doughnutChart.type = 'doughnut';
    this.doughnutChart.options = {
      cutoutPercentage: 85,
      legend: {
        display: true
      }

    };
    return this.doughnutChart;

  }


}
