const eventEmitter = require('../helpers/eventEmitter.js');
const statusHelpers = require('../helpers/status.js');

module.exports = function(RED) {
    function CoolLoopStartNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        const statusHelper = statusHelpers(node);

        node.on('input', function(msg) {
            
            const items = msg[config.arrayProperty || 'payload'];
            if (!items) {
                statusHelper.status({ fill: 'red', text: 'Array property not found' });
                throw new Error('Array property not found');
            }

            if (!Array.isArray(items)) {
                statusHelper.status({ fill: 'red', text: 'Property is not an array' });
                throw new Error('Property is not an array');
            }

            if (!items.length) {
                statusHelper.status({ fill: 'red', text: 'Array is empty' });
                throw new Error('Array is empty');
            }
            
            const sendItem = setItemsToSend(items);

            sendItem(msg);

            const eventId = `next-${msg._msgid}`;

            eventEmitter.on(eventId, () => sendItem(msg));

            node.on('close', () => {
                eventEmitter.removeAllListeners();
                statusHelper.clear();
            });
            
        });

        function setItemsToSend(items) {
            let index = -1;
            const length = items.length;

            return (msg,) => {
                index += 1;
                msg.payload = items[index];
                msg.done = index === length - 1;
    
                statusHelper.status({ text: `Item ${index + 1} of ${length}` });
                node.send(msg);
    
                msg.done && setTimeout(() => statusHelper.clear(), 1000);
            }
        }
    }

    RED.nodes.registerType("cool-loop-start", CoolLoopStartNode, {
        defaults: {
            name: { value: "" },
            arrayProperty: { value: "payload" }
        }
    });
};
