import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptCommonModule, NativeScriptRouterModule} from "@nativescript/angular";
import {Routes} from "@angular/router";
import {ReportComponent} from "./all-reports/report/report.component";
import {ResultsComponent} from "./results.component";
import {AllReportsComponent} from "./all-reports/all-reports.component";

const routes: Routes = [
  {path: '', component: ResultsComponent},
  {path: 'all-reports', component: AllReportsComponent},
  {path: 'all-reports/report', component: ReportComponent}
];

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule.forChild(routes)
  ],
  declarations: [
    ResultsComponent,
    AllReportsComponent,
    ReportComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ResultsModule {
}
