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
