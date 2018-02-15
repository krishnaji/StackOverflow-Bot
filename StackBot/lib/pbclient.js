const rp = require('request-promise');
const PB_URL = 'https://api.pinboard.in/v1';
var authToken ;

function PBClient (opts) {
    if (!opts.authToken) throw new Error('authToken is required');
    authToken = opts.authToken;
}

PBClient.prototype.get = async (opts, cb) => {
    
    cb = cb || (() => { });
    var searchText= encodeURIComponent(opts.searchText);
    const url = `${PB_URL}/posts/all` + "?"
                + `tag=${searchText}`
                +`&auth_token=${authToken}`;

    const options = {
        method: 'GET',
        uri: url,
        json: false,
        headers: {
            "Content-Type": "application/xml"
        }
    };

    await rp(options)
    .then((body) => {
        // GET succeeded
        return cb(null, body);
        console.log(body);
    })
    .catch((err) => {
        // GET failed

        return cb(err);
    });
}

module.exports = PBClient;
