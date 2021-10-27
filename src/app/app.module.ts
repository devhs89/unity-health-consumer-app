import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptFormsModule, NativeScriptHttpClientModule, NativeScriptModule} from '@nativescript/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from "~/app/home/home.component";
import {SearchComponent} from "~/app/home/search/search.component";
import {InteractionsComponent} from "~/app/home/interactions/interactions.component";
import {ChatBotComponent} from "~/app/home/chat-bot/chat-bot.component";
import {DetailComponent} from "~/app/home/search/detail/detail.component";
import {NativeScriptUIAutoCompleteTextViewModule} from "nativescript-ui-autocomplete/angular";

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptHttpClientModule,
    NativeScriptFormsModule,
    AppRoutingModule,
    NativeScriptUIAutoCompleteTextViewModule
  ],

  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    InteractionsComponent,
    ChatBotComponent,
    DetailComponent
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
