const eventEmitter = require('../helpers/eventEmitter.js');
const statusHelpers = require('../helpers/status.js');

module.exports = function(RED) {
    function CoolLoopJoinNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        const statusHelper = statusHelpers(node);

        node.on('input', function(msg) {
            if (msg.done) {
                delete msg.done
                node.send(msg);
                
                eventEmitter.removeAllListeners();
                statusHelper.status({ fill: 'green', text: 'Done!' });
                setTimeout(() => statusHelper.clear(), 3000);

                return
            }

            statusHelper.status({ fill: 'yellow', text: 'Waiting for next element...' });
            eventEmitter.emit(`next-${msg._msgid}`, );            
        });
    }

    RED.nodes.registerType("cool-loop-join", CoolLoopJoinNode, {
        defaults: {
            name: { value: "" }
        }
    });
};
