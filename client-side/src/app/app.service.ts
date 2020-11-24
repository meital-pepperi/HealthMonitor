import { Injectable } from "@angular/core";
import { AddonService, HttpService } from "@pepperi-addons/ngx-lib";
import {
  DialogService,
  PepDialogActionButton,
} from "@pepperi-addons/ngx-lib/dialog";
import { PepDialogData } from "@pepperi-addons/ngx-lib/dialog";
 
@Injectable({
  providedIn: "root",
})
export class AppService {
  idpToken =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjRiYTFjNzJmMTI3NThjYzEzMzg3ZWQ3YTBiZjNlODg3IiwidHlwIjoiSldUIn0.eyJuYmYiOjE2MDYyMjMzMzAsImV4cCI6MTYwNjIyNjkzMCwiaXNzIjoiaHR0cHM6Ly9pZHAuc2FuZGJveC5wZXBwZXJpLmNvbSIsImF1ZCI6WyJodHRwczovL2lkcC5zYW5kYm94LnBlcHBlcmkuY29tL3Jlc291cmNlcyIsInBlcHBlcmkuYXBpbnQiXSwiY2xpZW50X2lkIjoiaW9zLmNvbS53cm50eS5wZXBwZXJ5Iiwic3ViIjoiZTJkZmQ0MDYtZDM4Yy00ZmYwLThhZGItMWRlMjI3ODIzYWEyIiwiYXV0aF90aW1lIjoxNjA2MjIzMzMwLCJpZHAiOiJsb2NhbCIsInBlcHBlcmkuYXBpbnRiYXNldXJsIjoiaHR0cHM6Ly9yZXN0YXBpLnNhbmRib3gucGVwcGVyaS5jb20iLCJlbWFpbCI6ImRhbmllbC5kQHBlcHBlcml0ZXN0LmNvbSIsInBlcHBlcmkuaWQiOjg2OTAzMDQsInBlcHBlcmkudXNlcnV1aWQiOiJlMmRmZDQwNi1kMzhjLTRmZjAtOGFkYi0xZGUyMjc4MjNhYTIiLCJwZXBwZXJpLmRpc3RyaWJ1dG9ydXVpZCI6IjBiZDBlZDc5LThlOWUtNDRmYi05NmY0LThlNTNlZDljZTgyYiIsInBlcHBlcmkuZGlzdHJpYnV0b3JpZCI6MzAwMTIzNTEsInBlcHBlcmkuZGF0YWNlbnRlciI6InNhbmRib3giLCJwZXBwZXJpLmVtcGxveWVldHlwZSI6MSwicGVwcGVyaS5iYXNldXJsIjoiaHR0cHM6Ly9wYXBpLnN0YWdpbmcucGVwcGVyaS5jb20vVjEuMCIsIm5hbWUiOiJkYW5pZWwgZGF2aWRvZmYiLCJzY29wZSI6WyJwZXBwZXJpLmFwaW50Iiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.l8Yv2-WNhrtPLC9GrQ_wsrQTMoOrxzEzhNFXAxMvCChILQHmBjc1KvKaB_-J-6S1fxkbeDdcHElFKls4WkJ2ilSDQhEOcpsbdrN0tRLZOqK7mIF293DYiRx6QTode2aloNIUug3gbT8KpGD7ritTlc17Cc3c9luo6G9v6THlqkJ_u8pVJXxyVX9LtiH4I16XymusqmXQ00Bet9TVub7OxNZ7w1ZhUL4lMQv9IftI386oKA8qF9uMi6Vno0OCYLgfDukfNlJF4l3F9GCgAa5pboKmhUN3hCojNhnFx2yTHZl5h6Bao1r9pU-G1MGmlZqkH5OSq_mf8wUMy4vE019XbQ";
  constructor(
    private httpService: HttpService,
    private addonService: AddonService,
    private dialogService: DialogService
  ) {
    sessionStorage.setItem("idp_token", this.idpToken);
  }
 
  getAddonServerAPI(
    fileName: string,
    functionName: string,
    options: any
  ) {
    return this.addonService.getAddonApiCall(
      '7e15d4cc-55a7-4128-a9fe-0e877ba90069',
      fileName,
      functionName,
      options
    ).toPromise();
  }
 
  postAddonServerAPI(
    fileName: string,
    functionName: string,
    body: any,
    options: any
  ) {
    return this.addonService.postAddonApiCall(
      '7e15d4cc-55a7-4128-a9fe-0e877ba90069',
      fileName,
      functionName,
      body,
      options
    ).toPromise();
  }
 
  openDialog(title: string, content: string, callback?: any) {
    const actionButton: PepDialogActionButton = {
      title: "OK",
      className: "",
      callback: callback,
    };
 
    const dialogData = new PepDialogData({
      title: title,
      content: content,
      actionButtons: [actionButton],
      type: "custom",
    });
    this.dialogService
      .openDefaultDialog(dialogData)
      .afterClosed()
      .subscribe((callback) => {
        if (callback) {
          callback();
        }
      });
  }
 
  getFromAPI(apiObject, successFunc, errorFunc) {
    //this.addonService.setShowLoading(true);
    const endpoint = apiObject.ListType === "all" ? "addons" : "updates";
    // // --- Work live in sandbox upload api.js file to plugin folder
    // const url = `/addons/api/${apiObject.UUID}/api/${endpoint}`;
    // this.addonService.httpGetApiCall(url, successFunc, errorFunc);
 
    //--- Work localhost
    const url = `http://localhost:4400/api/${endpoint}`;
    // this.httpService.getHttpCall(url, searchObject, { 'headers': {'Authorization': 'Bearer ' + this.addonService.getUserToken() }}).subscribe(
    //     res => successFunc(res), error => errorFunc(error), () => this.addonService.setShowLoading(false)
    // );
    this.httpService.getHttpCall("");
  }
 
  postToAPI(endpoint) {
    const url = `http://localhost:4400/api/${endpoint}`;
    this.post(url);
  }
 
  post(url: string) {
    this.httpService.postHttpCall(url, null).subscribe((result) => {});
  }
 
  getPapiCall(url: string) {
    return this.httpService.getPapiApiCall(url);
  }
 
  postPapiCall(url: string, body: any) {
    return this.httpService.postPapiApiCall(url, body);
  }
}