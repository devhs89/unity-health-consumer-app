import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {PageRoute, RouterExtensions} from "@nativescript/angular";
import {ImGatewayService} from "~/app/services/im-gateway.service";
import {InteractionModel} from "~/app/models/interaction.model";
import {ReportModel} from "~/app/models/report.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'ns-all-reports',
  templateUrl: 'all-reports.component.html',
  styleUrls: ['all-reports.component.css'],
  moduleId: module.id
})
export class AllReportsComponent implements OnInit, OnDestroy {
  herbSupplementFood: string;
  drug: string;
  drugClass: string;
  interactionID: string | number;
  ingredientNameResponse: InteractionModel;
  allReports: ReportModel[];
  private pageRouteSubscription = new Subscription();

  constructor(private pageRoute: PageRoute, private imGatewayService: ImGatewayService,
              private routerExtensions: RouterExtensions, private activatedRoute: ActivatedRoute) {
  }

  getReports(interactionId: string | number) {
    this.imGatewayService.getReportsByInteractionsID(interactionId).then((resp) => {
      this.allReports = JSON.parse(resp.content.toString());
    });
  }

  ngOnInit() {
    this.pageRouteSubscription = this.pageRoute.activatedRoute.subscribe(activatedRoute => {
      const queryParamsObj = activatedRoute.snapshot.queryParams;

      if (queryParamsObj["interactionID"]) {
        this.interactionID = queryParamsObj["interactionID"];
        this.herbSupplementFood = queryParamsObj["herb"];

        if (queryParamsObj["drugClass"]) {
          this.drugClass = queryParamsObj["drugClass"];
        } else if (queryParamsObj["drug"]) {
          this.drug = queryParamsObj["drug"];
        }

        this.getReports(this.interactionID);
      } else {
        this.herbSupplementFood = queryParamsObj["herb"];
        queryParamsObj["drug"] ? this.drug = queryParamsObj["drug"] : "";
        queryParamsObj["drugClass"] ? this.drugClass = queryParamsObj["drugClass"] : "";

        this.imGatewayService.getInteractionsByIngredientName(this.herbSupplementFood).then((resp: any) => {
          const parsedResponseContent = JSON.parse(resp.content.toString());

          if (parsedResponseContent.data) {
            this.ingredientNameResponse = parsedResponseContent;
            this.ingredientNameResponse.data.map(result => {
              if (this.drug && result.drugName.toLocaleLowerCase() === this.drug) {
                this.interactionID = result.generalInteractionID;
                this.getReports(this.interactionID);
              }

              if (this.drugClass && result.catName.toLocaleLowerCase() === this.drugClass) {
                this.interactionID = result.generalInteractionID;
                this.getReports(this.interactionID);
              }
            });
          }
        });
      }
    });
  }

  onTapResult(reportID) {
    this.routerExtensions.navigate(['report'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: reportID},
      animated: true
    });
  }

  ngOnDestroy() {
    this.pageRouteSubscription.unsubscribe();
  }
}
