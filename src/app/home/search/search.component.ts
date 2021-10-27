import {Component, OnDestroy} from "@angular/core";
import {BarcodeLookupService} from "../../services/barcode-lookup.service";
import {RouterExtensions} from "@nativescript/angular";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'ns-input-area',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
  moduleId: module.id
})
export class SearchComponent implements OnDestroy {
  isLoading = false;
  scanResponseSubscription = new Subscription();
  searchTextField = "";
  private resultContent: any;

  constructor(private barcodeLookupService: BarcodeLookupService,
              private routerExtensions: RouterExtensions,
              private activatedRoute: ActivatedRoute) {
  }

  onScanBarcodeTap() {
    this.isLoading = true;
    this.barcodeLookupService.scanBarcodeNumbers().then((response) => {
      if (response.text && +response.text) {
        this.barcodeLookupService.getProductTitle(response.text).then((results: any) => {
          this.resultContent = JSON.parse(results.content.toString());

        if (this.resultContent.title) {
          this.searchTextField = this.resultContent.title;
        } else {
          console.log("Product Not Found!");
        }
        });
      }
    });
    this.isLoading = false;
  }

  onTapSearchHandler() {
    if (this.searchTextField.length > 0) {
      this.routerExtensions.navigate(['detail', {product: this.searchTextField}],
        {
          relativeTo: this.activatedRoute,
          animated: true
        }
      );
    } else {
      console.log("Product Name Required.");
    }
  }

  onTapChat() {
    this.routerExtensions.navigate(['/chat-bot'], {animated: true});
  }

  ngOnDestroy() {
    this.scanResponseSubscription.unsubscribe();
  }
}
