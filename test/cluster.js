// not really tests but being used to ensure things are working
var RedisClustr = require('../src/redisClustr');

var c = new RedisClustr({
  servers: [
    {
      port: 7007,
      host: '127.0.0.1'
    },
    // {
    //   port: 7001,
    //   host: '127.0.0.1'
    // },
    // {
    //   port: 7002,
    //   host: '127.0.0.1'
    // }
  ]
});

// var b = c.batch();
// b.get('hi', console.log);
// b.get('lol', console.log);
// b.get('no', console.log);

// b.exec(function() {
//   c.get('hi', console.log);
//   c.get('lol', console.log);
//   c.get('no', console.log);
// });

var runs = 0;
var run = function() {
  var b = c.batch();
  b.get('hi' + runs);
  b.set('hi' + runs, runs);
  b.get('hi' + runs);
  b.set('hi' + (runs + 1), runs);
  b.exec(function(err, resp) {
    console.log(err, resp);
    c.del('hi' + (runs - 1), 'hi' + (runs - 2));
    runs++;
    run();
  });
};

// c.getSlots(run);
run();

// setTimeout(function() {
//   c.quit(function() {
//     console.log('QUIIITTT', arguments);
//   });
// }, 1500);

c.on('error', console.log.bind(console, 'Error'));


// c.del('hi', 'test', 'lol', function() {
//   c.del('hi', 'test', 'lol', console.log);
// });


