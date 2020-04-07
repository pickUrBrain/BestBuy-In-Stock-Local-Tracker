const fs = require('fs')
var apiKey;
try {
  apiKey = fs.readFileSync('apikey.txt', 'utf8').split('\n')[0];
} catch (e) {
  console.log('Error:', e);
}

const BestBuyAPI = require('bestbuy')(apiKey);

const SKUs = [6364255, 6364253, 6401728];

const CreateSKUsQuery = (skusArr) => {
  if (!Array.isArray(skusArr)) {
    throw new Error('Not an array');
  }
  param = sku => `SKU=${sku}`
  skus = skusArr.map(param);
  return skus.join('|');
};

const SearchRslts = (prodIds) => {
  return BestBuyAPI.products(CreateSKUsQuery(prodIds), {
    show: 'sku,salePrice,onlineAvailability'
  })
}

// SearchRslts(SKUs).then(response => {
//   console.log(response);
// }).catch(err => err)

setInterval(function() {
  SearchRslts(SKUs).then(response => {
    console.log(response);
  }).catch(err => err)
}, 1000);
