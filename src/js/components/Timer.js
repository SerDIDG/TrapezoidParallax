cm.define('App.Timer', {
    'modules' : [
        'Params',
        'Events',
        'Langs',
        'DataConfig',
        'Stack'
    ],
    'events' : [
        'onRender'
    ],
    'params' : {
        'node' : cm.Node('div'),
        'name' : '',
        'count' : 0,
        'counters' : ['d', 'h', 'm', 's'],
        'langs' : {
            'd' : ['день', 'дня', 'дней'],
            'h' : ['час', 'часа', 'часов'],
            'm' : ['минута', 'минуты', 'минут'],
            's' : ['секунда', 'секунды', 'секунд']
        }
    }
},
function(params){
    var that = this;

    that.nodes = {};
    that.components = {};

    that.current = {};
    that.previous = {};

    var init = function(){
        that.setParams(params);
        that.convertEvents(that.params['events']);
        that.getDataConfig(that.params['node']);
        render();
        that.addToStack(that.nodes['container']);
        that.triggerEvent('onRender');
    };

    var render = function(){
        // Structure
        that.nodes['container'] = cm.node('div', {'class' : 'app__timer'},
            that.nodes['inner'] = cm.node('div', {'class' : 'inner'})
        );
        // Render Blocks
        cm.forEach(that.params['counters'], function(counter, i){
            // Render Separator
            if(i != 0){
                that.nodes['inner'].appendChild(
                    cm.node('div', {'class' : 'b-separator'}, ':')
                );
            }
            // Render Block
            that.nodes[counter] = cm.node('div', {'class' : 'b-counter'},
                that.nodes[counter + 'Value'] = cm.node('div', {'class' : 'b-value'}),
                that.nodes[counter + 'Label'] = cm.node('div', {'class' : 'b-label'})
            );
            that.nodes['inner'].appendChild(that.nodes[counter]);
        });
        // Append
        that.params['node'].appendChild(that.nodes['container']);
        // Init Timer
        cm.getConstructor('Com.Timer', function(classConstructor){
            that.components['timer'] = new classConstructor({
                'count' : that.params['count'],
                'events' : {
                    'onTick' : renderTime
                }
            });
        });
        // Show
        cm.addClass(that.nodes['container'], 'is-show', true);
    };

    var renderTime = function(timer, counters){
        that.previous = cm.clone(that.current);
        cm.forEach(that.params['counters'], function(counter){
            if(that.previous[counter] != counters[counter]){
                that.nodes[counter + 'Value'].innerHTML = cm.addLeadZero(counters[counter]);
                that.nodes[counter + 'Label'].innerHTML = cm.getNumberDeclension(counters[counter], that.lang(counter));
            }
        });
        that.current = counters;
    };

    /* ******* PUBLIC ******* */

    init();
});