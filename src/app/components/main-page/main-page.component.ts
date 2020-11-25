/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, HostListener, } from '@angular/core';
import { Subject } from 'rxjs';
import { CovidApiService } from 'src/app/services/covid-data/covid-api.service';
import { CovidGlobalSummaryDTO } from 'src/app/DTOs/covid-global-summary';
import { CovidSummary } from 'src/app/DTOs/covid-data-summary-response';
import { Line } from 'src/app/charts/line/line';
import { GlobalStatistics } from 'src/app/DTOs/GlobalStatistics/GlobalStatistics';
import { ProvinceStatisticsDTO } from 'src/app/DTOs/GlobalStatistics/ProvinceStatisticsDTO';
import { ProjectStatistics } from 'src/app/DTOs/Projectstatistics/Projectstatistics';
import { ProjectStatisticsService } from 'src/app/services/project-statistics/project-statistics.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  username: string;
  covidData: CovidGlobalSummaryDTO = new CovidGlobalSummaryDTO();
  globalStatistics:GlobalStatistics = new GlobalStatistics();
  auxLineChart: Line;
  styles: any;
  state: boolean;
  infected:number;
  recovered:number;
  dead:number;
  province:string;
  public innerWidth: string;
  provinceDetail:ProvinceStatisticsDTO[];
   X = []
   Y = []
   X1= []
   Y1= []
  

  constructor(
    private covidService: CovidApiService,
    private lineChart: Line,
    private lineChart2: Line,
    private projectStatistics:ProjectStatisticsService
  ) { }

  ngOnInit(): void {
    this.state = false;
    this.getCovidGeneralData();
    this.auxLineChart = this.initLineChart();
    this.getProvinces();
    
  }

  async getProvinces(){
      await this.projectStatistics.getProvinceDetails().toPromise().then(e => {
        this.provinceDetail = e.result;
        const random = Math.round(Math.random() * 32);
        this.infected = this.provinceDetail[random].infected;
        this.dead = this.provinceDetail[random].deaths;
        this.province = this.provinceDetail[random].provinceName;
      })
      return this.provinceDetail;
  }

@HostListener('window:resize', ['$event'])
onResize(event) {
  this.innerWidth = window.innerWidth.toString();
  console.log(this.innerWidth)
}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onHoverEffect( province:string,recovered:number,infected:number,dead:number){
    this.provinceDetail.forEach(element => {
      if(element.provinceName == province){
        this.infected = element.infected;
        this.dead = element.deaths;
        this.recovered = element.recovered;
        this.province = element.provinceName;
      }
    });
    
     
  }



   
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
   
  initLineChart() {
    this.lineChart.options = {
      legend: {
        position: 'top'
    },
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
        xAxes: [{
          gridLines: {
            zeroLineColor: 'transparent',
            
},
        ticks: {
            padding: 20,
            fontColor: 'rgba(0,0,0,0.5)',
            fontStyle: 'bold'
        },
        }],
        yAxes: [{
          gridLines: {
            drawTicks: false,
            display: true
        },
          ticks: {
            fontColor: 'rgba(0,0,0,0.5)',
            fontStyle: 'bold',
            beginAtZero: false,
            maxTicksLimit: 10,
            padding: 20
        }
        }]
      }
    };
    this.lineChart.labels = this.X;
    this.lineChart.type = 'line';
    this.lineChart.legend = true;
    this.lineChart.data = [
      { data: this.Y, label: 'Cantidad de contagiados a la fecha',borderColor: '#80b6f4',
      pointBorderColor: '#80b6f4',
      pointBackgroundColor: '#80b6f4',
      pointHoverBackgroundColor: '#80b6f4',
      pointHoverBorderColor: '#80b6f4',
      pointBorderWidth: 10,
      pointHoverRadius: 10,
      pointHoverBorderWidth: 1,
      pointRadius: 3,
      fill: false,
      borderWidth: 4, }
    ];
    return this.lineChart;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async getCovidGeneralData() {
    await this.covidService.getCovidTotalCasesSummary().toPromise()
      .then(data => {
        this.globalStatistics = data.result;
      });

      await this.covidService.getInfectedByTimeIntervalFromCurrentDate().then(
        e => { 
          e.forEach(element => {
            this.X.push(element[0])
            this.Y.push(element[1])
          })
         
        }
      )
    this.state = true;
  }
}
