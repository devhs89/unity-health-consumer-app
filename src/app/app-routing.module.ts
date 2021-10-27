import {NgModule} from '@angular/core';
import {Routes} from '@angular/router';
import {NativeScriptRouterModule} from '@nativescript/angular';
import {HomeComponent} from "~/app/home/home.component";
import {SearchComponent} from "~/app/home/search/search.component";
import {InteractionsComponent} from "~/app/home/interactions/interactions.component";
import {ChatBotComponent} from "~/app/home/chat-bot/chat-bot.component";
import {DetailComponent} from "~/app/home/search/detail/detail.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchComponent},
  {path: 'interactions', component: InteractionsComponent},
  {path: 'chat-bot', component: ChatBotComponent},
  {path: 'search/detail', component: DetailComponent},
  {
    path: 'interactions/result',
    loadChildren: () => import('~/app/home/interactions/results/results.module').then(mod => mod.ResultsModule)
  },
  {path: '', redirectTo: '/home', pathMatch: "full"}
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {
}
