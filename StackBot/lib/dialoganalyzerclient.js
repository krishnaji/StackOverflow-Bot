const request = require('request-promise');
const duplex = require('stream').Duplex;
var clientId;
var key;
var url;

function DialogAnalyzerClient (opts) {
    if (!opts.clientId) throw new Error('Client id is required.');
    if (!opts.key) throw new Error('Key is required.');
    if (!opts.url) throw new Error('Url is required.');

    clientId = opts.clientId;
    key = opts.key;
    url = opts.url;
}

DialogAnalyzerClient.prototype.post = async (opts, cb) => {

    if (!opts.fileData) throw new Error('File Data is required');
    cb = cb || (() => { });

    const options = {
        method: 'POST',
        uri: url,
        json: true,
        headers: {
            "x-functions-clientid": clientId,
            "x-functions-key": key,
            "Content-Type": "application/octet-stream",
            "Content-Length": opts.fileData.length
        }
    };

    const stream = new duplex();
    stream.push(new Buffer(new Uint8Array(opts.fileData)));
    stream.push(null);

    await stream.pipe(request(options))
        .then((body) => {
            // POST succeeded
            return cb(null, body);
        })
        .catch((err) => {
            // POST failed
            return cb(err);
        });
}

module.exports = DialogAnalyzerClient;