import OpenSeaEventService from './OpenSeaEventService';
import UserService from './UserService';

class Services {
  constructor() {
    this.openSeaEventService = new OpenSeaEventService();
    this.userService = new UserService(this.openSeaEventService);
  }

  start() {
    this.openSeaEventService.start();
    this.userService.start();
  }

  stop() {
    this.openSeaEventService.stop();
    this.userService.stop();
  }
}

export default Services;