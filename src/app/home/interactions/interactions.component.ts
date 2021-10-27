import {Component, OnInit} from "@angular/core";
import {BarcodeLookupService} from "../../services/barcode-lookup.service";
import {RouterExtensions} from "@nativescript/angular";
import {ActivatedRoute} from "@angular/router";
import {ImGatewayService} from "~/app/services/im-gateway.service";
import {ObservableArray} from "@nativescript/core";
import {RadAutoCompleteTextView, TokenModel} from "nativescript-ui-autocomplete";

type AllIngredients = {
  dateUpdated?: Date,
  herbNames: string[],
  drugNames: string[],
  drugClasses: string[]
}

@Component({
  selector: 'ns-interactions-home',
  templateUrl: 'interactions.component.html',
  styleUrls: ['interactions.component.css'],
  moduleId: module.id
})
export class InteractionsComponent implements OnInit {
  herbSupplementFood = '';
  drug = '';
  drugClass = '';
  allIngredients: AllIngredients = {herbNames: [], drugNames: [], drugClasses: []};
  suggestionViewHeight = 0;
  private herbNameSuggestions: ObservableArray<TokenModel>;
  private drugNameSuggestions: ObservableArray<TokenModel>;
  private drugClassSuggestions: ObservableArray<TokenModel>;

  constructor(private barcodeLookupService: BarcodeLookupService,
              private routerExtensions: RouterExtensions,
              private activatedRoute: ActivatedRoute,
              private imGatewayService: ImGatewayService) {
  }

  get herbSuggestions(): ObservableArray<TokenModel> {
    return this.herbNameSuggestions;
  }

  get drugSuggestions(): ObservableArray<TokenModel> {
    return this.drugNameSuggestions;
  }

  get classSuggestions(): ObservableArray<TokenModel> {
    return this.drugClassSuggestions;
  }

  ngOnInit() {
    this.allIngredients = this.imGatewayService.getSuggestions();
    this.initDataItems();
  }

  onSuggestionViewBecameVisible(args: any) {
    let autoComplete: RadAutoCompleteTextView = args.object;
    let numberOfItems = autoComplete.filteredItems.length;

    if (numberOfItems >= 5) {
      this.suggestionViewHeight = 230;
    } else if (numberOfItems === 4) {
      this.suggestionViewHeight = 184;
    } else if (numberOfItems === 3) {
      this.suggestionViewHeight = 138;
    } else if (numberOfItems === 2) {
      this.suggestionViewHeight = 92;
    } else {
      this.suggestionViewHeight = 46;
    }
  }

  public onTextChanged(args) {
    if (args.object.name === 'herbField') {
      this.herbSupplementFood = args.text;
    }
    if (args.object.name === 'drugField') {
      this.drug = args.text;
    }
    if (args.object.name === 'drugClassField') {
      this.drugClass = args.text;
    }
  }

  onTapInteractions() {
    if (this.herbSupplementFood && !this.drug && !this.drugClass) {
      this.routerExtensions.navigate(['result'],
        {
          relativeTo: this.activatedRoute,
          queryParams: {herb: this.herbSupplementFood.toLocaleLowerCase()},
          animated: true
        });
    } else if (this.herbSupplementFood && this.drugClass && !this.drug) {
      this.routerExtensions.navigate(['result/all-reports'],
        {
          relativeTo: this.activatedRoute,
          queryParams: {
            herb: this.herbSupplementFood.toLocaleLowerCase(),
            drugClass: this.drugClass.toLocaleLowerCase()
          },
          animated: true
        });
    } else if ((this.herbSupplementFood && this.drug && !this.drugClass) || (this.herbSupplementFood && this.drug && this.drugClass)) {
      this.routerExtensions.navigate(['result/all-reports'],
        {
          relativeTo: this.activatedRoute,
          queryParams: {herb: this.herbSupplementFood.toLocaleLowerCase(), drug: this.drug.toLocaleLowerCase()},
          animated: true
        });
    } else {
      console.log("Something went wrong!");
    }
  }

  onTapChat() {
    this.routerExtensions.navigate(['/chat-bot'], {animated: true});
  }

  private initDataItems() {
    this.herbNameSuggestions = new ObservableArray<TokenModel>();
    this.drugNameSuggestions = new ObservableArray<TokenModel>();
    this.drugClassSuggestions = new ObservableArray<TokenModel>();

    for (let i = 0; i < this.allIngredients.herbNames.length; i++) {
      this.herbNameSuggestions.push(new TokenModel(this.allIngredients.herbNames[i], undefined));
    }

    for (let i = 0; i < this.allIngredients.drugNames.length; i++) {
      this.drugNameSuggestions.push(new TokenModel(this.allIngredients.drugNames[i], undefined));
    }

    for (let i = 0; i < this.allIngredients.drugClasses.length; i++) {
      this.drugClassSuggestions.push(new TokenModel(this.allIngredients.drugClasses[i], undefined));
    }
  }
}
