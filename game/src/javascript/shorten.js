const shorten = (address) => {
    if (!address) {
      return '';
    }
    return address.substring(0, 5) + '...' + address.substring(address.length - 5);
  };
  
  module.exports = shorten;