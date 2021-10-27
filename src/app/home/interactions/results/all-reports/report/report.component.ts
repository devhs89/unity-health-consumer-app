import {Component, OnInit} from "@angular/core";
import {PageRoute} from "@nativescript/angular";
import {ImGatewayService} from "../../../../../services/im-gateway.service";
import {ReportModel} from "../../../../../models/report.model";

@Component({
  selector: 'ns-report',
  templateUrl: 'report.component.html',
  styleUrls: ['report.component.css'],
  moduleId: module.id
})
export class ReportComponent implements OnInit {
  report: ReportModel;
  private reportID = "";

  constructor(private pageRoute: PageRoute, private imGatewayService: ImGatewayService) {
  }

  ngOnInit() {
    this.pageRoute.activatedRoute.subscribe(activatedRoute => {
      const queryParamsObj = activatedRoute.snapshot.queryParams;

      this.reportID = queryParamsObj["id"];

      if (this.reportID) {
        this.imGatewayService.getReport(this.reportID).then((resp) => {
          const respContent = JSON.parse(resp.content.toString());

          if (respContent) {
            this.report = respContent;
          }
        });
      }
    });
  }
}
