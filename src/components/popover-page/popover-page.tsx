import { Event, EventEmitter, Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'popover-page',
  styles: `
    ion-list ion-label {
      font-weight: bold;
    }
  `,
  shadow: true
})
export class PopoverPage {

  @Prop() userAgent: any;
  @Event() loggedOut: EventEmitter | any;

  logout() {
    this.userAgent.logout();
    this.loggedOut.emit();
  }

  render() {
    return [
      <ion-list lines='none'>
        <ion-item onClick={() => this.logout()}>
          <ion-label>Logout</ion-label>
        </ion-item>
      </ion-list>
    ];
  }
}
