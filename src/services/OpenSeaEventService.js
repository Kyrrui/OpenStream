import _ from 'lodash';
import moment from 'moment';

class OpenSeaEventService {
  constructor() {
    this.eventStore = [];
    this.running = false;
  }

  async start() {
    this.createEventStore();
  }

  async stop() {
  }

  subscribe(callback, tick = 1000) {
    this.running = true;
    this.uiLoop(callback);
    this.updateEventStoreLoop(callback);
  }

  unsubscribeAll() {
    this.running = false;
  }

  async uiLoop(callback, tick = 250) {
    do {
      await callback({events: _.orderBy(this.eventStore, ['id'], ['desc'])});
      await this.sleep(tick);
    } while (this.running);
  }

  async updateEventStoreLoop(callback, tick = 10000) {
    do {
      await callback(await this.updateEventStore());
      await this.sleep(tick);
    } while (this.running);
  }

  async updateEventStore() {
    const response = await fetch(`https://api.opensea.io/api/v1/events/?event_type=successful`);
    const json = await response.json();
    const events = json.asset_events;

    for (let i = 0; i < events.length; i++) {
      let attributes = this.getAttributes(events[i]);
      let isStored = false;
      for (let j = 0; j < this.eventStore.length; j++) {
        if (attributes.id === this.eventStore[j].id) {
          isStored = true;
          this.eventStore[j].isNew = false;
          break;
        }
      }
      if (!isStored) {
        this.addEventToStore(attributes);
      }
    }
    return {
      events: _.orderBy(this.eventStore, ['id'], ['desc']),
    };
  }

  async createEventStore() {
    const response = await fetch(`https://api.opensea.io/api/v1/events/?event_type=successful`);
    const json = await response.json();
    const events = json.asset_events;

    for (let i = 0; i < events.length; i++) {
      let attributes = this.getAttributes(events[i]);
      attributes.isNew = false;
      this.addEventToStore(attributes)
    }
  }

  addEventToStore(attributes) {
    this.eventStore.push({
      id: attributes.id,
      buyer: attributes.buyer,
      buyerAddressUrl: attributes.buyerAddressUrl,
      assetName: attributes.assetName,
      assetImgUrl: attributes.assetImgUrl,
      profImgUrl: attributes.profImgUrl,
      permaLink: attributes.permaLink,
      eventTimestamp: attributes.eventTimestamp,
      isNew: attributes.isNew,
      comments: [],
    })
  }

  getAttributes(event) {
    let eventId = event.id;
    let buyer = this.getBuyerName(event);
    let assetName = this.getAssetName(event);
    let buyerAddressUrl = 'https://opensea.io/accounts/' + event.winner_account.address
    let assetImgUrl = this.getAssetImgUrl(event);
    let profImgUrl = event.winner_account.profile_img_url;
    let permaLink = this.getPermaLink(event);
    let eventTimestamp = event.event_timestamp;
    let storedEvent = {
      id: eventId,
      buyer: buyer,
      buyerAddressUrl: buyerAddressUrl,
      assetName: assetName,
      assetImgUrl: assetImgUrl,
      profImgUrl: profImgUrl,
      permaLink: permaLink,
      eventTimestamp: eventTimestamp,
      isNew: true,
      comments: [],
    };
    return storedEvent;
  }

  addComment(txId, userName, userImgUrl, profLink, comment) {
    var tx = this.eventStore.filter(obj => {
      return obj.id === txId;
    })
    var commentObj = {
      userName: userName,
      userImgUrl: userImgUrl,
      profLink: profLink,
      content: comment,
      date: moment.utc(),
    }
    tx[0].comments.push(commentObj);
  }

  getAssetName(event) {
    if (event.asset) {
      return event.asset.name;
    } else {
      return 'undefined';
    }
  }

  getPermaLink(event) {
    if (event.asset) {
      return event.asset.permalink;
    } else {
      return 'opensea.io';
    }
  }

  getBuyerName(event) {
    if (event.winner_account.user) {
      return event.winner_account.user.username;
    } else {
      return event.winner_account.address.substring(0, 10) + '...';
    }
  }

  getAssetImgUrl(event) {
    if (event.asset) {
      return event.asset.image_thumbnail_url;
    } else {
      return 'opensea.io';
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default OpenSeaEventService;