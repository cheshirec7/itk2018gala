const request = require('request'),
    jsftp = require("jsftp"),
    ftp = new jsftp({
        host: "erictotten.net",
        port: 21,
        user: "itk2018@erictotten.net",
        pass: "m+8#^=_uTQt+"
    }),
    req_url = 'http://bputil11.bidpal.net/Scoreboard/slides/0/next.json?hash_id=' + Math.random(),
    req_sessionid = '6192989CBF75BCF2960E70587635017D',
    req_opts = {
        url: req_url,
        headers: {
            'Cookie': 'JSESSIONID=' + req_sessionid
        }
    },
    refreshSecs = 90,
    fileRemote = 'data.json';

setInterval(function () {
    request(req_opts, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let data = JSON.parse(body);

            if (data.hasOwnProperty('displayData')) {
                let dd = data.displayData;
                if (dd.hasOwnProperty('itemClients')) {
                    let json = [];
                    dd.itemClients.forEach(function (e) {
                        let o = {};
                        o.num = e.item.number;
                        o.name = e.item.name;
                        o.val = e.item.value;
                        o.bid = e.item.currentBid;
                        if (e.client)
                            o.bidder = e.client.number;
                        json.push(o);
                    });

                    ftp.put(Buffer.from(JSON.stringify(json)), fileRemote, err => {
                        if (!err) {
                            console.log("Data saved to remote: " + new Date());
                        } else {
                            console.log(err + ': ' + new Date());
                        }
                    });
                }
            } else {
                console.log('No displayData in remote file: ' + new Date());
            }
        } else {
            console.log('-------------------------');
            console.log(error + ' ' + response + ': ' + new Date());
            console.log('-------------------------');
        }
    })
}, 1000 * refreshSecs);
