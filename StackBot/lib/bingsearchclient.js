const rp = require('request-promise');

    var bingSearchConfig ;
    var bingSearchKey ;
    var bingSearchCount ;
    var bingSearchMkt ;
    var bingSearchBaseUrl ;
    var bingSearchMaxSearchStringSize;

function BingSearchClient (opts) {
    if (!opts.bingSearchConfig) throw new Error('bingSearchConfig is required');
    if (!opts.bingSearchKey) throw new Error('bingSearchKey is required');

    bingSearchConfig = opts.bingSearchConfig;
    bingSearchKey = opts.bingSearchKey;
    bingSearchCount = 6;
    bingSearchMkt = "en-us";
    bingSearchBaseUrl = "https://api.cognitive.microsoft.com/bingcustomsearch/v7.0/search";
    bingSearchMaxSearchStringSize = 150;
}

BingSearchClient.prototype.get = async (opts, cb) => {
    if (!opts.searchText) throw new Error('Search text is required');
    cb = cb || (() => {});

    const searchText = opts.searchText.substring(0, bingSearchMaxSearchStringSize).trim();

    const url = bingSearchBaseUrl + "?"
                + `q=${encodeURIComponent(searchText)}`
                + `&customconfig=${bingSearchConfig}`
                + `&count=${bingSearchCount}`
                + `&mkt=${bingSearchMkt}`
                + "&offset=0&responseFilter=Webpages&safesearch=Strict";

    const options = {
        method: 'GET',
        uri: url,
        json: true,
        headers: {
            "Ocp-Apim-Subscription-Key": bingSearchKey
        }
    };

    await rp(options)
        .then((body) => {
            // POST succeeded
            return cb(null, body);
        })
        .catch((err) => {
            // POST failed
            return cb(err);
        });
}

module.exports = BingSearchClient;
