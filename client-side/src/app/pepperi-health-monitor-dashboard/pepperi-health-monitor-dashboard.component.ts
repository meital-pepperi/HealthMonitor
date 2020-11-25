import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PepFieldClickedData, PepFieldValueChangedData } from '@pepperi-addons/ngx-lib';
import { AppService } from "../app.service";
import { Chart } from "chart.js";

@Component({
  selector: 'app-pepperi-health-monitor-dashboard',
  templateUrl: './pepperi-health-monitor-dashboard.component.html',
  styleUrls: ['./pepperi-health-monitor-dashboard.component.scss']
})
export class PepperiHealthMonitorDashboardComponent implements OnInit {
  dashboardData;
  canvasSyncStatus: any;
  ctxSyncStatus: any;
  canvasDailySync: any;
  ctxDailySync: any;

  constructor(private translate: TranslateService,
    private appService: AppService) { }

  async ngOnInit() {
    this.dashboardData = await this.appService.getAddonServerAPI('api','health_monitor_dashboard',{});

    this.canvasSyncStatus = document.getElementById('syncStatus');
    this.ctxSyncStatus = this.canvasSyncStatus.getContext('2d');
    this.ctxSyncStatus.canvas.height = '300px';
    const syncStatus = new Chart(this.ctxSyncStatus, {
      type: 'doughnut',
      data: {
      labels: ['SUCCESS', 'FAILURE'],
      datasets: [{
        label: '# of Votes',
        data: [this.dashboardData.SyncStatus.Success, this.dashboardData.SyncStatus.Failure],
        backgroundColor: [
          'rgba(75, 192, 192, 0.4)',
          'rgba(255, 99, 132, 0.4)'],
        hoverBackgroundColor: [
          '#36EBCB',
          '#FF6384']
        }]
      }}
    );

    this.canvasDailySync = document.getElementById('dailySync');
    this.ctxDailySync = this.canvasDailySync.getContext('2d');
    this.ctxDailySync.canvas.height = '300px';
    const dailySync = new Chart(this.ctxDailySync, {
      type: 'line',
      data: {
        labels: this.dashboardData.DailySync.Labels,
        datasets: [
          {
            label:'Success',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75, 192, 192, 0.4)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75, 192, 192, 1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.dashboardData.DailySync.Success,
            spanGaps: false,
          },
          {
            label:'Failure',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(255, 99, 132, 0.4)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(255, 99, 132, 1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.dashboardData.DailySync.Failure,
            spanGaps: false,
          }
        ]
      }
    });

    this.dashboardData.LastSync.StatusName = this.dashboardData.LastSync.Status? 'Success' : 'Failure';
    this.dashboardData.LastSync.Color = this.dashboardData.LastSync.Status? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)';
    this.dashboardData.JobTimeUsage.Color = this.dashboardData.JobTimeUsage.Percantage <80 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)';
  }
}
