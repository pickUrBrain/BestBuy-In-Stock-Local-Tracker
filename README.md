# In-Stock Local Tracker for Best Buy Products

## Features
* Get local updates on the in-store and online availablility
* Automatically add items to the cart if re-instock
* Keep a log of availability of watched items

## Usage
Currently there are two runnable scripts for use.
* `main.js` is well-commented. Feel free to fork the repo and customize the code to track any otheritems on Best Buy.

* `EasyRunSwitchInStockTracker.js` needs no more edits than setting up the api key. You only need to run this script if you want to buy the Nintendo Switch.

## Getting Started
 1. Sign-up for a developer API Key at https://developer.bestbuy.com/
 2. Run `npm install bestbuy --save`
 3. The library requires an API key to be provided before it can be used. You can set that depends on the script you are using:
    * Create a separate file named `apikey.txt` containg the API key.<br>

    * Edit the key as a string when invoking the method. The key here only serves as an example.<br>
```Javascript
const BestBuyAPI = require('bestbuy')('ABp3jkZI5KOzCdTDzkofjo19');
```
  4. Run `npm install open` if needed
  5. Run either command in the Terminal depends on your need:<br>
  `node EasyRunSwitchInStockTracker.js`<br>
  `node main.js`

## Q&A
### What does it look like?

Here's a snippet of the console outputs.
```
4/8/2020
LATEST ONLINE STOCK UPDATE for Neon Red/N at 2020-04-08T11:32:11
LATEST ONLINE STOCK UPDATE for Animal Cro at 2020-04-06T12:27:13
1:01:37 PM
Gray Joy-C becomes available
LATEST ONLINE STOCK UPDATE for Gray Joy-C at 2020-04-08T11:30:41
1:33:18 PM
Neon Red/N becomes available
LATEST ONLINE STOCK UPDATE for Neon Red/N at 2020-04-08T12:32:15
1:33:18 PM
Gray Joy-C becomes unavailable
LATEST ONLINE STOCK UPDATE for Gray Joy-C at 2020-04-08T12:11:15
```

### How to find the SKU number?
![SKU example](https://github.com/dareg0/BestBuy-In-Stock-Local-Tracker/blob/master/skuScreeshot.png)

## Resources
 - [Best Buy Developer Portal](https://developer.bestbuy.com)
 - [Best Buy API Query Builder](https://github.com/BestBuyAPIs/bby-query-builder)
