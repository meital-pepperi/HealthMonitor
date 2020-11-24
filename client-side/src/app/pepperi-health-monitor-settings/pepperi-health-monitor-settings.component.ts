import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CustomizationService, HttpService, ObjectSingleData, DataConvertorService,
    PepRowData, PepFieldData, AddonService, FIELD_TYPE, UtilitiesService } from '@pepperi-addons/ngx-lib';
import { PepListComponent, ChangeSortingEvent } from '@pepperi-addons/ngx-lib/list';
import { AppService } from "../app.service";

@Component({
  selector: 'app-pepperi-health-monitor-settings',
  templateUrl: './pepperi-health-monitor-settings.component.html',
  styleUrls: ['./pepperi-health-monitor-settings.component.scss']
})
export class PepperiHealthMonitorSettingsComponent implements OnInit {

  @ViewChild(PepListComponent) customList: PepListComponent;
  tests;
  menuActions = [
    { key: 'edit', value: 'Edit'}, 
    { key: 'run_now', value: 'Run Now'}, 
    { key: 'send_test_message', value: 'Send Test Message'}
  ];
  disableActions =true;


  constructor(
      private translate: TranslateService,
      private customizationService: CustomizationService,
      private utilitiesService: UtilitiesService,
      private dataConvertorService: DataConvertorService,
      private httpService: HttpService,
      private addonService: AddonService,
      private appService: AppService
  ) {

      const browserCultureLang = translate.getBrowserCultureLang();
  }

  ngOnInit() {
      
      // this.httpService.getHttpCall('http://get_data')
      //     .subscribe(
      //         (res) => {
      //             debugger;
      //             console.log('')
      //         },
      //         (error) => {
      //             debugger;
      //             console.log(error);
      //         },
      //         () => {
      //             debugger;
      //         }
      // );

  }

  async onMenuItemClicked(action) {
    const typeListID = this.customList.getSelectedItemsData().rows[0];
    const typeData = this.customList.getItemDataByID(typeListID.toString());
    var typeID = typeData.Fields[0].AdditionalValue;

    if (action.key == 'edit') {
      window.location.href =window.location.origin + `/settings/7e15d4cc-55a7-4128-a9fe-0e877ba90069/health-monitor-settings-edit?Type=`+typeID;
    }
    else {
      const popupMessage = await this.appService.postAddonServerAPI('api',action.key,{Type:typeID},{});
      const eventName = action.value;
      this.appService.openDialog(eventName,popupMessage)
    }
  }

  ngAfterViewInit() {
      this.loadlist('all');
  }

  async loadlist(apiEndpoint) {
      this.tests = await this.appService.getAddonServerAPI('api','health_monitor_settings',{});
      this.loadAddons(this.tests);
  }

  loadAddons(tests) {
      if (this.customList && tests) {
          const tableData = new Array<PepRowData>();
          tests.forEach((test: any) => {
              const allKeys = ['Type', 'Email', 'Webhook'];
              tableData.push(this.convertTestToPepRowData(test, allKeys));
          });
          const pepperiListObj = this.dataConvertorService.convertListData(tableData);
          const buffer = [];
          if (pepperiListObj.Rows) {
              pepperiListObj.Rows.forEach( row => {
                  const osd = new ObjectSingleData(pepperiListObj.UIControl, row);
                  osd.IsEditable = true;
                  buffer.push(osd);
              });
          }

          this.customList.initListData(pepperiListObj.UIControl, buffer.length, buffer, 'table', '', true);
      }
  }

  convertTestToPepRowData(test: any, customKeys = null) {
      const row = new PepRowData();
      row.Fields = [];
      const keys = customKeys ? customKeys : Object.keys(test);
      keys.forEach(key => row.Fields.push(this.initDataRowField(test, key)));
      return row;
  }

  initDataRowField(test: any, key: any): PepFieldData {

      const dataRowField: PepFieldData = {
          ApiName: key,
          Title: this.translate.instant(key),
          XAlignment: 1,
          FormattedValue: test[key] ? test[key].toString() : '',
          Value:  test[key] ? test[key].toString() : '',
          ColumnWidth: 10,
          AdditionalValue: '',
          OptionalValues: [],
          FieldType: FIELD_TYPE.TextBox
      };

      switch (key) {

          case 'Type':
              dataRowField.ColumnWidth = 30;
              dataRowField.AdditionalValue= test["ID"] ? test["ID"].toString() : '';
              break;
          case 'Email':
              dataRowField.ColumnWidth = 50;
              break;
          case 'Webhook':
              dataRowField.ColumnWidth = 45;
              break;
          default:
              dataRowField.ColumnWidth = 0;
              break;
      }

      return dataRowField;
  }

  onListChange(event) {
  }

  onCustomizeFieldClick(event) {
  }


  selectedRowsChanged(selectedRowsCount) {
    if (selectedRowsCount==0){
      this.disableActions=true;
    }
    else{
      this.disableActions=false;
    }
  }
}