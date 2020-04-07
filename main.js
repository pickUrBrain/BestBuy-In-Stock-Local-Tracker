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


var SearchRslts = (prodIds) => {
  return BestBuyAPI.products(CreateSKUsQuery(prodIds), {
    show: 'sku,name,onlineAvailability,onlineAvailabilityUpdateDate,orderable,inStoreAvailability,inStoreAvailabilityUpdateDate'
  })
}

var count = 1;
setInterval(function() {
   SearchRslts(SKUs).then(response => {
       for (const p of response.products){
//           console.log(p);
//           if(p.orderable=='SoldOut')
//               console.log("SoldOut");
//           if(p.orderable=='Available' && p.onlineAvailability)
//               console.log(p.name);
           if(p.orderable=='Available' && p.onlineAvailability){
               console.log(p.sku);
               console.log(p.name);
           }
//           else
//               console.log("Offline Available");
       }
       count+=1;
       console.log(count)
   }).catch(err => err)
}, 2000);
