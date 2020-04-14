const open = require('open')
const BestBuyAPI = require('bestbuy')('');
var SearchRslts = () => {
    return BestBuyAPI.products("SKU=6364255|SKU=6364253|SKU=6401728", {
    show: 'sku,name,onlineAvailability,addToCartUrl'
    })
}
var LastUpdateStr = [" ", " ", " "];
var LastOnlineAvailable = [false, false, false];
var counter = -1;
function Monitor() {
    SearchRslts().then(response => {
        var prods = response.products
        for (i = 0; i < 3; i++){
            var name = prods[i].name.split(' - ')[2].substring(0, 10);
            if(prods[i].onlineAvailability!=LastOnlineAvailable[i]){
                if(!LastOnlineAvailable[i]){
                    open(prods[i].addToCartUrl)
                    console.log((new Date).toLocaleTimeString() + " " + name + " is available.");
                    console.log("Paste the link into a browser if needed again: " + prods[i].addToCartUrl)
                }
                else{
                    console.log((new Date).toLocaleTimeString() + " " + name + " becomes unavailable.")
                }
                LastOnlineAvailable[i]=!LastOnlineAvailable[i];
            }
        }counter+=1;
        if(counter%50==0){
            for (i = 0; i < 3; i++){
                var pStr = (new Date).toLocaleTimeString() + " " + prods[i].name.split(' - ')[2].substring(0, 10) + " is ["
                if(!prods[i].onlineAvailability){
                    pStr+="NOT "}
                pStr+= "AVAILABLE] for online shipping."
                console.log(pStr)
            }
            
        }
    }).catch(err => err)
}
var monitor = setInterval(Monitor, 2000);
console.log((new Date).toLocaleDateString() + " " + (new Date).toLocaleTimeString())
console.log("Start Running")
console.log("The program is checking with BestBuy API every two seconds. \nA list of products online availability should be printed out around every 100 seconds for your own reference.")
