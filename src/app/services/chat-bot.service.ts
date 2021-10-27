import {Injectable} from "@angular/core";
import {Http} from "@nativescript/core";

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {
  constructor() {
  }

  sendQuery(query) {
    const url = "http://192.168.1.13:5000/query?question=" + query;

    return Http.request({
      url: url,
      method: "POST"
    });
  }
}
