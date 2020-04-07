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
    show: 'sku,name,onlineAvailability,onlineAvailabilityUpdateDate,orderable,inStoreAvailability,addToCartUrl'
    })
}

var count = 1;
var lastTime = [" "," "," "];
var lastAvailable = [false, false, false]
setInterval(function() {
    SearchRslts(SKUs).then(response => {
        var prods = response.products
        for (i = 0; i < prods.length; i++){
            //           console.log(prods[i]);
            var name = prods[i].name.split(' - ')[2].substring(0, 10);
            if(prods[i].onlineAvailabilityUpdateDate!=lastTime[i]){
                lastTime[i] = prods[i].onlineAvailabilityUpdateDate
                console.log("STOCK UPDATE for " + name + " at " + lastTime[i]);
            }
            if(prods[i].onlineAvailability!=lastAvailable[i]){
                if(!lastAvailable[i]){
                    console.log(name + " Becomes Available ");
                    console.log(prods[i].addToCartUrl)
                }
                else
                    console.log(name + " Becomes Unavailable" + prods[i].addToCartUrl)
                lastAvailable[i]!=lastAvailable[i];
            }
        }
            //            if(prods[i].orderable=='Available')
            //            if(prods[i].orderable=='SoldOut')
            count+=1;
            console.log(count)
        }).catch(err => err)
    }, 2000);
