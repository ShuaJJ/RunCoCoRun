require('regenerator-runtime/runtime');

export default class CoCoList {
  async getCoCos(address) {

    const url = 'https://testnets-api.opensea.io/api/v1/assets?owner='+address+'&order_direction=desc&offset=0&limit=20&collection=coco-characters';

    return new Promise((resolve, reject) => {
      this.cocos = [];

      fetch(url)
        .then(result => result.json())
        .catch(error => {
          reject(error);
        })
        .then(({ assets }) => {
          assets.forEach((asset) => {
            this.cocos.push({ 
              name: asset.name,
              image: asset.image_thumbnail_url,
              address: asset.asset_contract.address
            });
          });

          resolve(this.cocos);
        });
    });
  }
}