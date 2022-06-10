import { Component, Input, OnInit } from '@angular/core';
import { Notification, NotificationState } from 'src/app/types/notification';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss'],
})
export class NotificationCardComponent implements OnInit {
  @Input() notification!: Notification;
  StateType = NotificationState;
  constructor() {}

  ngOnInit(): void {}
}
