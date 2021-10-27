import {Injectable, OnInit} from "@angular/core";
import {Http} from "@nativescript/core";


@Injectable({
  providedIn: 'root'
})
export class ImGatewayService implements OnInit {
  appSettings = require("@nativescript/core/application-settings");
  private token = "Cg0s7xuavsTvKEuvEB10ge4nm/3be3qLxGBxfqSM5iE=";
  private herbNames = [];
  private drugNames = [];
  private drugClasses = [];

  constructor() {
  }

  ngOnInit() {
  }

  getAllIngredients() {
    return Http.request({
      url: "http://testexample.imgateway.net/api/searchall",
      method: "GET",
      headers: {
        "X-Auth-Token": this.token
      }
    });
  }

  getProduct(productName) {
    return Http.request({
      url: "http://13.238.230.40:5001/search?productName=" + productName,
      method: "POST"
    });
  }

  getInteractionsByIngredientName(herbName) {
    return Http.request({
      // url: "http://testexample.imgateway.net/api/v1/ingredients/ingredientNames/" + herbName + "/2233",
      url: "http://13.238.230.40:5001/ingredients?ingredientName=" + herbName,
      // method: "GET",
      method: "POST",
      headers: {
        "X-Auth-Token": this.token
      }
    });
  }

  getReportsByInteractionsID(interactionID) {
    return Http.request({
      url: "http://testexample.imgateway.net/api/v1/interaction/" + interactionID,
      method: "GET",
      headers: {
        "X-Auth-Token": this.token
      }
    });
  }

  getReport(reportID) {
    return Http.request({
      url: "http://testexample.imgateway.net/api/v1/interaction-report/" + reportID,
      method: "GET",
      headers: {
        "X-Auth-Token": this.token
      }
    });
  }

  async setSuggestions() {
    const suggestions = this.appSettings.hasKey("suggestions") ? this.appSettings.getString("suggestions") : {};
    const dateTime = new Date();

    if (!suggestions || new Date(suggestions.dateUpdated).getDate() !== dateTime.getDate()) {
      await this.getAllIngredients().then((resp: any) => {
        const resultsArray = JSON.parse(resp.content.toString());

        resultsArray.map(obj => {
          this.herbNames.push(obj.herbName.toLocaleLowerCase());
          this.drugNames.push(obj.drugName.toLocaleLowerCase());
          this.drugClasses.push(obj.catName.toLocaleLowerCase());
        });

        this.herbNames = [...new Set(this.herbNames)];
        this.drugNames = [...new Set(this.drugNames)];
        this.drugClasses = [...new Set(this.drugClasses)];

        const autocomplete = {
          "dateUpdated": dateTime,
          "herbNames": this.herbNames,
          "drugNames": this.drugNames,
          "drugClasses": this.drugClasses
        };

        this.appSettings.setString("suggestions", JSON.stringify(autocomplete));
      });
    }
  }

  getSuggestions() {
    const suggestions = this.appSettings.hasKey("suggestions") ? this.appSettings.getString("suggestions") : null;
    let test = {herbNames: [], drugNames: [], drugClasses: []};

    if (suggestions) {
      test = JSON.parse(suggestions);
    } else {
      this.setSuggestions().then(() => {
        test = {
          "herbNames": this.herbNames,
          "drugNames": this.drugNames,
          "drugClasses": this.drugClasses
        };
      });
    }
    return test;
  }
}
