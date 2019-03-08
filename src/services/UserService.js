import web3 from '../web3'

class UserService {
  constructor(openSeaEventService) {
    this.openSeaEventService = openSeaEventService;
    this.userName = "anon";
    this.image = 'https://storage.googleapis.com/opensea-static/opensea-profile/1.png';
    this.link = 'https://opensea.io/accounts/anon';
    this.rug = require('random-username-generator');
  }

  async start() {
    // Determine username from web3 provider
    this.userName = 'anon-' + this.rug.generate();
    if (web3 !== 'undefined') {
      const address = await web3.eth.getAccounts();
      if (address) {
        await this.determineUserInfo(address[0]);
      }
    }
  }

  async stop() {}

  async determineUserInfo(address) {
    this.userName = address.substring(0, 10) + '...';
    this.link = 'https://opensea.io/accounts/' + address;
    const response = await fetch(`https://api.opensea.io/api/v1/accounts/?address=` + address);
    const json = await response.json();
    if (json.accounts) {
      const userInfo = json.accounts;
      if (userInfo[0]) {
        this.image = userInfo[0].profile_img_url;
        if (userInfo[0].user) {
          this.userName = userInfo[0].user.username;
        }
      }
    }
  }

  addComment(txId, comment){
    this.openSeaEventService.addComment(txId, this.userName, this.image, this.link, comment);
  }
}

export default UserService;