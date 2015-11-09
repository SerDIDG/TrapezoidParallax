cm.define('App.Sections', {
    'modules' : [
        'Params',
        'Events',
        'DataConfig',
        'DataNodes',
        'Stack'
    ],
    'events' : [
        'onRender'
    ],
    'params' : {
        'node' : cm.Node('div'),
        'name' : ''
    }
},
function(params){
    var that = this;

    that.nodes = {
        'sections' : []
    };

    var init = function(){
        that.setParams(params);
        that.convertEvents(that.params['events']);
        that.getDataNodes(that.params['node']);
        that.getDataConfig(that.params['node']);
        render();
        that.addToStack(that.params['node']);
        that.triggerEvent('onRender');
    };

    var render = function(){
        cm.addEvent(window, 'resize', resizeEvent);
        resizeAction();
    };

    var resizeEvent = function(){
        animFrame(resizeAction);
    };

    var resizeAction = function(){
        var pageSize = cm.getPageSize(),
            size = 'calc(100% - ' + (pageSize['width'] * Math.tan(radians(7))) + 'px)',
            rule;
        if(rule = cm.getCSSRule('.app__section > .b-top')[0]){
            rule.style.height = size;
        }
        if(rule = cm.getCSSRule('.app__section > .b-bottom')[0]){
            rule.style.height = size;
        }
    };

    var radians = function(degrees) {
        return degrees * Math.PI / 180;
    };

    var degrees = function(radians) {
        return radians * 180 / Math.PI;
    };

    /* ******* PUBLIC ******* */

    init();
});