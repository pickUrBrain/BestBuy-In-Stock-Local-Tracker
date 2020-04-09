// TODO: Create a textfile conatining the api key in the same directory as code.
const fs = require('fs')
var apiKey;
try {
    apiKey = fs.readFileSync('apikey.txt', 'utf8').split('\n')[0];
} catch (e) {
    console.log('Error:', e);
}

// This is to open default browser and navigate to the add to cart URL.
const open = require('open')

const BestBuyAPI = require('bestbuy')(apiKey);

// TODO: Replace SKU IDs
const SKUs = [6364255, 6364253, 6401728];

const CreateSKUsQuery = (skusArr) => {
    if (!Array.isArray(skusArr)) {
        throw new Error('Not an array');
    }
    param = sku => `SKU=${sku}`
    skus = skusArr.map(param);
    return skus.join('|');
};

// TODO: If you want to see more information regarding the item(s), you can extend the query by adding more attributes, such as inStoreAvailability,inStorePickup.
var SearchRslts = (prodIds) => {
    return BestBuyAPI.products(CreateSKUsQuery(prodIds), {
    show: 'sku,name,onlineAvailability,onlineAvailabilityUpdateDate,inStoreAvailability,orderable,addToCartUrl'
    })
}

// For a quick check of the status of the item(s).
var QuickCheck = (prodIds) => {
    return BestBuyAPI.products(CreateSKUsQuery(prodIds), {
    show: 'sku,name,onlineAvailability,orderable,addToCartUrl,inStorePickup,inStoreAvailability,onlineAvailabilityUpdateDate'
    })
}

// To keep a log file for your own records.
function LogTime(isDate){
    var timestamp;
    if(isDate)
        timestamp = (new Date).toLocaleDateString()
        else
            timestamp = (new Date).toLocaleTimeString()
            ws.write(timestamp + '\n')
            }

var counter = -1;
var LastUpdateStr = Array(SKUs.length ).fill(" ");
var LastOnlineAvailable = Array(SKUs.length ).fill(false);

function Monitor() {
    SearchRslts(SKUs).then(response => {
        var prods = response.products
        for (i = 0; i < prods.length; i++){
            
            // TODO: If you are watching other items than default, you might need to comment out this line and uncomment the second line.
            var name = prods[i].name.split(' - ')[2].substring(0, 10);
            // var name = prods[i].name
            
            if(prods[i].onlineAvailability!=LastOnlineAvailable[i]){
                
                // TODO: If you want to keep a record of the stock updates, you can uncomment this line.
                // LogTime(false)
                
                if(!LastOnlineAvailable[i]){
                    open(prods[i].addToCartUrl)
                    console.log(name + " becomes available.");
                    // TODO: If you want to keep a record of the availablity, you can uncomment this line.
                    // ws.write(name + " becomes available online."+ '\n')
                }
                else{
                    console.log(name + " becomes unavailable.")
                    // TODO: If you want to keep a record of the availablity, you can uncomment this line.
                    // ws.write(name + " becomes unavailable online."+ '\n')
                }
                LastOnlineAvailable[i]=!LastOnlineAvailable[i];
            }
            
            if(prods[i].onlineAvailabilityUpdateDate!=LastUpdateStr[i]){
                if(LastOnlineAvailable[i]){
                    open(prods[i].addToCartUrl)
                }
                LastUpdateStr[i] = prods[i].onlineAvailabilityUpdateDate
                console.log("Latest online stock update for " + name + " at " + LastUpdateStr[i]);
                // TODO: If you want to keep a record of the stock updates, you can uncomment this line.
                // ws.write("Latest online stock update for " + name + " at " + LastUpdateStr[i]+ '\n')
            }
        }
        
        counter+=1;
        // TODO: Uncomment if you want to call off the tracking after a amount of time.
        if(counter==1000){
            clearInterval(monitor)}
        // TODO: Uncomment if you want to see an overview of the items after a amount of time.
        if(counter%50==0){
            console.log(prods)}
    }
                           ).catch(err => {
        console.error('Error Message: ' + err.message);
    })
}

// TODO: If you want to keep a record of the stock updates, you can uncomment the below two lines.
// const ws = fs.createWriteStream("./log.txt", { flags: 'a' })
// LogTime(true)

// TODO: Repeated calls to API every two seconds. The number is in milliseconds.
var monitor = setInterval(Monitor, 2000);

// TODO: Uncomment this section if you want to do a one-time check of the items you are watching
// QuickCheck(SKUs).then(response => {console.log(response)}).catch(err => {console.error('Error Message: ' + err.message.products);})
