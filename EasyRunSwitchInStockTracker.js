const open = require('open')
const BestBuyAPI = require('bestbuy')('');
const SKUs = [6364255, 6364253, 6401728];
const CreateSKUsQuery = (skusArr) => {
    param = sku => `SKU=${sku}`
    skus = skusArr.map(param);
    return skus.join('|');
};

var SearchRslts = (prodIds) => {
    return BestBuyAPI.products(CreateSKUsQuery(prodIds), {
    show: 'sku,name,onlineAvailability,onlineAvailabilityUpdateDate,addToCartUrl'
    })
}
var LastUpdateStr = [" "," "," "];
var LastOnlineAvailable = [false, false, false];;
var counter = -1;
function Monitor() {
    SearchRslts(SKUs).then(response => {
        var prods = response.products
        for (i = 0; i < prods.length; i++){
            var name = prods[i].name.split(' - ')[2].substring(0, 10);
            if(prods[i].onlineAvailability!=LastOnlineAvailable[i]){
                if(!LastOnlineAvailable[i]){
                    open(prods[i].addToCartUrl)
                    console.log(name + " becomes available.");
                }
                else{
                    console.log(name + " becomes unavailable.")
                }
                LastOnlineAvailable[i]=!LastOnlineAvailable[i];
            }
            
            if(prods[i].onlineAvailabilityUpdateDate!=LastUpdateStr[i]){
                if(LastOnlineAvailable[i]){
                    open(prods[i].addToCartUrl)
                }
                LastUpdateStr[i] = prods[i].onlineAvailabilityUpdateDate
                console.log("Latest online stock update for " + name + " at " + LastUpdateStr[i]);
            }
        }counter+=1;
        if(counter%20==0){
            console.log("Running")}
    }).catch(err => {
        console.error('Error Message: ' + err.message);
    })
}
var monitor = setInterval(Monitor, 2000);
