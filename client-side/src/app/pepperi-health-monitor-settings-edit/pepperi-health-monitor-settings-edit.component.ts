import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PepFieldClickedData, PepFieldValueChangedData } from '@pepperi-addons/ngx-lib';
import { AppService } from "../app.service";


@Component({
  selector: 'app-pepperi-health-monitor-settings-edit',
  templateUrl: './pepperi-health-monitor-settings-edit.component.html',
  styleUrls: ['./pepperi-health-monitor-settings-edit.component.scss']
})
export class PepperiHealthMonitorSettingsEditComponent implements OnInit {
  type;
  typeData;
  isSupport; 

  constructor(      
    private translate: TranslateService,
    private appService: AppService) { }

  ngOnInit() {
    let params = (new URL(window.location.href)).searchParams;
    this.type = params.get("Type");
    this.isSupport = params.get("support_user")==null? false: (params.get("support_user")=="true");
    this.appService.postAddonServerAPI('api','health_monitor_type_alert_edit',{Type:this.type},{})
    .subscribe((result: any) => {
      this.typeData = result;
    });
  }

  onBack() {
    window.location.href =window.location.origin + '/settings/7e15d4cc-55a7-4128-a9fe-0e877ba90069/health-monitor-settings';
  }

  onSave() {
    this.typeData.Type = this.type;
     this.appService.postAddonServerAPI('api','health_monitor_type_alert_save',this.typeData,{})
    .subscribe((result: any) => {
      const response =result;
      if (response.Success){
        window.location.href =window.location.origin + '/settings/7e15d4cc-55a7-4128-a9fe-0e877ba90069/health-monitor-settings';
      }
      else{
        this.appService.openDialog("Error",response.ErrorMessage)
      }
    });
    
  }

  onValueChanged(event: PepFieldValueChangedData) {
    this.typeData[event.key] =event.value;
}
}
