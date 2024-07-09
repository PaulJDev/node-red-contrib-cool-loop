module.exports = function(node) {
    return {
        status({ fill = 'blue', text  }) {
            node.status({ fill, shape: "dot", text });
        },
        clear() {
            node.status({});
        }
    }   
}