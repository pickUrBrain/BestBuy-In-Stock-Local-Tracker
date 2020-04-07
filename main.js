const fs = require('fs')
var apiKey;
try {
    apiKey = fs.readFileSync('apikey.txt', 'utf8').split('\n')[0];
} catch (e) {
    console.log('Error:', e);
}

// to open default browser and navigate to the add to cart URL
const open = require('open')
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
    show: 'sku,name,onlineAvailability,onlineAvailabilityUpdateDate,orderable,addToCartUrl'
    })
}

var QuickCheck = (prodIds) => {
    return BestBuyAPI.products(CreateSKUsQuery(prodIds), {
    show: 'sku,name,onlineAvailability,orderable,addToCartUrl,inStorePickup,inStoreAvailability,homeDelivery,onlineAvailabilityUpdateDate'
    })
}

//QuickCheck(SKUs).then(response => {console.log(response)}).catch(err => {
//    console.error('Error Message: ' + err.message.products);
//})

var counter = 1;
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
                console.log("To get sense about the orderable status: " + prods[i].orderable)
                if(!lastAvailable[i]){
                    open(prods[i].addToCartUrl)
                    console.log(name + " Becomes Available ");
                }
                else{
                    console.log(name + " Becomes Unavailable" + prods[i].addToCartUrl)
                }
                lastAvailable[i]!=lastAvailable[i];
            }
        }
        //            if(prods[i].orderable=='Available')
        //            if(prods[i].orderable=='SoldOut')
        counter+=1;
        console.log(counter)    // updates
    }).catch(err => {
        console.error('Error Message: ' + err.message);
    })
}, 2000);
