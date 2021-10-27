import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {PageRoute, RouterExtensions} from "@nativescript/angular";
import {ImGatewayService} from "~/app/services/im-gateway.service";
import {InteractionModel} from "~/app/models/interaction.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'ns-result',
  templateUrl: 'results.component.html',
  styleUrls: ['results.component.css'],
  moduleId: module.id
})
export class ResultsComponent implements OnInit, OnDestroy {
  herbSupplementFood: string;
  ingredientNameResponse: InteractionModel;
  private pageRouteSubscription = new Subscription();

  constructor(private pageRoute: PageRoute, private imGatewayService: ImGatewayService,
              private routerExtensions: RouterExtensions, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.pageRouteSubscription = this.pageRoute.activatedRoute.subscribe(activatedRoute => {
      const queryParamsObj = activatedRoute.snapshot.queryParams;
      this.herbSupplementFood = queryParamsObj["herb"];

      this.imGatewayService.getInteractionsByIngredientName(this.herbSupplementFood).then((resp) => {
        const parsedResponseContent = JSON.parse(resp.content.toString());

        // this.ingredientNameResponse = {
        //   interactions: [
        //     {
        //       "herbID": "36",
        //       "herbName": "Aloe vera",
        //       "drugID": "",
        //       "drugName": "",
        //       "catID": "44",
        //       "catName": "Adrenal steroid hormones",
        //       "recommendation": "BLUE - Speculative",
        //       "generalInteractionID": "186"
        //     },
        //     {
        //       "herbID": "36",
        //       "herbName": "Aloe vera",
        //       "drugID": "",
        //       "drugName": "",
        //       "catID": "15",
        //       "catName": "Antiarrhythmic agents",
        //       "recommendation": "BLUE - Speculative",
        //       "generalInteractionID": "185"
        //     },
        //     {
        //       "herbID": "36",
        //       "herbName": "Aloe vera",
        //       "drugID": "",
        //       "drugName": "",
        //       "catID": "18",
        //       "catName": "Cardiac inotropic agents",
        //       "recommendation": "BLUE - Speculative",
        //       "generalInteractionID": "184"
        //     },
        //     {
        //       "herbID": "36",
        //       "herbName": "Aloe vera",
        //       "drugID": "",
        //       "drugName": "",
        //       "catID": "134",
        //       "catName": "Chemotherapeutic agents",
        //       "recommendation": "DARK GREEN - Potentially beneficial",
        //       "generalInteractionID": "847"
        //     },
        //     {
        //       "herbID": "36",
        //       "herbName": "Aloe vera",
        //       "drugID": "",
        //       "drugName": "",
        //       "catID": "14",
        //       "catName": "Diuretics",
        //       "recommendation": "BLUE - Speculative",
        //       "generalInteractionID": "183"
        //     },
        //     {
        //       "herbID": "36",
        //       "herbName": "Aloe vera",
        //       "drugID": "",
        //       "drugName": "",
        //       "catID": "48",
        //       "catName": "Hypoglycaemic agents",
        //       "recommendation": "AMBER - Caution",
        //       "generalInteractionID": "307"
        //     },
        //     {
        //       "herbID": "36",
        //       "herbName": "Aloe vera",
        //       "drugID": "71",
        //       "drugName": "Glyburide",
        //       "catID": "48",
        //       "catName": "Hypoglycaemic agents",
        //       "recommendation": "DARK GREEN - Potentially beneficial",
        //       "generalInteractionID": "846"
        //     },
        //     {
        //       "herbID": "36",
        //       "herbName": "Aloe vera",
        //       "drugID": "70",
        //       "drugName": "Metformin",
        //       "catID": "48",
        //       "catName": "Hypoglycaemic agents",
        //       "recommendation": "LIGHT GREEN - Unlikely",
        //       "generalInteractionID": "943"
        //     },
        //     {
        //       "herbID": "36",
        //       "herbName": "Aloe vera",
        //       "drugID": "238",
        //       "drugName": "Sevoflurane",
        //       "catID": "118",
        //       "catName": "Anaesthetics- local and general",
        //       "recommendation": "BLUE - Inconclusive",
        //       "generalInteractionID": "187"
        //     }
        //   ],
        //   productId: "",
        //   productName: "",
        //   partNo: ""
        // };

        if (parsedResponseContent.data) {
          this.ingredientNameResponse = parsedResponseContent;
        }
      });
    });
  }

  onTapInteraction(args) {
    const params = {interactionID: args.interactionID, herb: args.herb};

    if (args.drugClass) {
      params["drugClass"] = args.drugClass;
    } else if (args.drugName) {
      params["drugName"] = args.drugName;
    }

    this.routerExtensions.navigate(['all-reports'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: params,
      animated: true
    });
  }

  ngOnDestroy() {
    this.pageRouteSubscription.unsubscribe();
  }
}
