import {Injectable} from "@angular/core";
import {BarcodeScanner} from "nativescript-barcodescanner";
import {Http} from "@nativescript/core";

@Injectable({
  providedIn: 'root'
})
export class BarcodeLookupService {
  private upcDatabaseKey = '098f6bc22621d_demo_4de4e8326b4f6';
  private barcodeScanner = new BarcodeScanner();

  constructor() {
  }

  scanBarcodeNumbers() {
    return this.barcodeScanner.scan(
      {showTorchButton: true, orientation: 'portrait', resultDisplayDuration: 500});
  }

  getProductTitle(barcodeNumbers) {
    if (+barcodeNumbers) {
      const urlString = 'https://api.upcdatabase.org/product/' + barcodeNumbers + '?apikey=' + this.upcDatabaseKey;

      return Http.request({
        url: urlString,
        method: "GET"
      });
    }
  }
}
