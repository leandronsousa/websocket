import { Component } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { rxStompConfig } from 'rx-stomp.config';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Message } from '@stomp/stompjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
    receivedMessages: string[] = [];

    topicSubscription: Subscription;

    rxStompService: RxStomp;

    constructor(private http: HttpClient) {
        const rxStomp = new RxStomp();
        rxStomp.configure(rxStompConfig);
        rxStomp.activate();
        this.rxStompService = rxStomp;

        this.topicSubscription = this.rxStompService
            .watch('/status')
            .subscribe((message: Message) => {
              this.receivedMessages.push(message.body);
            });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.topicSubscription.unsubscribe();
    }

    receiveMessage() {
        this.http.put('http://localhost:8080/v1/sync', {})
        .subscribe(response => console.log(response));
    }

    onSendMessage() {
        const message = `Message generated at ${new Date}`;
        this.rxStompService.publish({destination: '/status', body: message});
    }

}
