import {Component, OnInit} from "@angular/core";
import {RouterExtensions} from "@nativescript/angular";
import {ChatBotService} from "~/app/services/chat-bot.service";

@Component({
  selector: 'ns-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css'],
  moduleId: module.id
})
export class ChatBotComponent implements OnInit {
  textBox = '';
  conversation = [
    {actor: 'BOT', response: 'Hi, thank you for using UnityHealth app. How can I help you?'}
  ];

  constructor(private routerExtensions: RouterExtensions, private chatBotService: ChatBotService) {
  }

  ngOnInit() {
  }

  stripRecommendation(recommendationResponse: string) {
    return recommendationResponse.split('-').pop();
  }

  mergeResponse(reply) {
    if (reply.basic) {
      return reply.basic.join('\n');
    }
    return reply.medical.map((item: any) => `Drug: ${item.drugName}\nRecommendation: ${this.stripRecommendation(item.recommendation)}`).join('\n\n');
  }

  onTapSendHandler() {
    if (this.textBox.length > 0) {
      this.conversation.unshift({actor: "You", response: this.textBox});

      this.chatBotService.sendQuery(this.textBox).then((resp: any) => {
        const parsedChatBotResponse = JSON.parse(resp.content.toString());

        if (parsedChatBotResponse.data) {
          this.conversation.unshift({
            actor: 'BOT',
            response: this.mergeResponse(parsedChatBotResponse.data)
          });
        }
      });
      this.textBox = null;
    }
  }

  onCloseHandler() {
    this.routerExtensions.navigate(['/home'], {animated: true});
  }
}
