window.Collector = new Com.Collector();

window.Collector.add('timer', function(node){
    new App.Timer({
        'node' : node,
        'count' : config['leftTime'] * 1000
    });
});