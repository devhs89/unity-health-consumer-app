import {Component, OnDestroy, OnInit} from "@angular/core";
import {PageRoute} from "@nativescript/angular";
import {Subscription} from "rxjs";
import {ImGatewayService} from "~/app/services/im-gateway.service";

@Component({
  selector: 'ns-detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.css'],
  moduleId: module.id
})
export class DetailComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  productDetails: any;
  private pageRouteSubscription = new Subscription();

  constructor(private pageRoute: PageRoute, private imGatewayService: ImGatewayService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.pageRouteSubscription = this.pageRoute.activatedRoute.subscribe(activatedRoute => {
      activatedRoute.paramMap.subscribe(params => {
        const productName = params.get("product");

        if (productName) {
          this.imGatewayService.getProduct(productName.toLocaleLowerCase()).then((resp: any) => {
            const parsedResponseContent = JSON.parse(resp.content?.toString());
            if (parsedResponseContent.data) {
              this.productDetails = parsedResponseContent.data;
              this.isLoading = false;
            } else {
              console.log("Something went wrong!");
            }
          });
        } else {
          console.log("No product Found!");
        }
      }, (e) => {
        console.log("ERROR" + e);
      });
    });
  }

  ngOnDestroy() {
    this.pageRouteSubscription.unsubscribe();
  }
}
