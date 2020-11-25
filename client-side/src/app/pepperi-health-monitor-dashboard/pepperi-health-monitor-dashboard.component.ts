import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  ctxSyncStatus: any;
  ctxDailySync: any;

  @ViewChild ('syncStatus') canvasSyncStatus: ElementRef;
  @ViewChild ('dailySync') canvasDailySync: ElementRef;


  constructor(private translate: TranslateService,
    private appService: AppService) { }

  ngOnInit() {
    this.appService.getAddonServerAPI('api','health_monitor_dashboard',{})
      .subscribe((result: any) => {
      this.dashboardData = result;
      this.loadData();
    });
  }

  loadData() {
      Chart.defaults.global.maintainAspectRatio = false;
      // this.canvasSyncStatus = document.getElementById('syncStatus');
      this.ctxSyncStatus = this.canvasSyncStatus.nativeElement.getContext('2d');
      const syncStatus = new Chart(this.ctxSyncStatus, {
        type: 'doughnut',
        data: {
        labels: ['SUCCESS', 'FAILURE'],
        datasets: [{
          data: [this.dashboardData.SyncStatus.Success, this.dashboardData.SyncStatus.Failure],
          backgroundColor: [
            'rgba(75, 220, 172, 0.7)',
            'rgba(255, 89, 90, 0.7)'],
          hoverBackgroundColor: [
            'rgba(75, 220, 172, 1)',
            'rgba(255, 89, 90, 1)']
          }]
        }}
      );

      this.ctxDailySync = this.canvasDailySync.nativeElement.getContext('2d');
      const dailySync = new Chart(this.ctxDailySync, {
        type: 'line',
        data: {
          labels: this.dashboardData.DailySync.Labels,
          datasets: [
            {
              label:'Success',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75, 220, 172, 0.7)',
              borderColor: 'rgba(75, 220, 172, 1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75, 220, 172, 1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75, 220, 172, 1)',
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
              backgroundColor: 'rgba(255, 89, 90, 0.7)',
              borderColor: 'rgba(255, 89, 90, 1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(255, 89, 90, 1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(255, 89, 90, 1)',
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
      this.dashboardData.LastSync.Color = this.dashboardData.LastSync.Status? 'inherit' : 'rgba(255, 89, 90, 1)'; 
      this.dashboardData.JobTimeUsage.Color = this.dashboardData.JobTimeUsage.Percantage <80 ? 'inherit' : 'rgba(255, 89, 90, 1)';
    }
}
