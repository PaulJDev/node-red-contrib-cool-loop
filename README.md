# node-red-contrib-cool-loop

Custom nodes for Node-RED that implement a continuous loop for processing arrays of elements.

## Description

The `node-red-contrib-cool-loop` package provides two nodes for Node-RED: `cool-loop-start` and `cool-loop-join`. These nodes work together to process an array of elements one by one through a user-defined flow, using events to coordinate continuous execution.

## Installation

To install this package in your Node-RED instance, navigate to your Node-RED project directory and run the following command:

```bash
cd ~/.node-red
npm install node-red-contrib-cool-loop
```

Then, restart Node-RED for the new nodes to appear in the palette.

## Usage

### `cool-loop-start` Node

The `cool-loop-start` node initiates the processing of an array and sends elements one by one. This node expects an array in `msg.payload` (or a specified property) and sends each element through the flow.

#### Configuration

- **Name**: Optional name for the node.
- **Array Property**: Name of the message property that contains the array to process (default is `payload`).

#### Example Usage

1. Drag an `inject` node and configure it with an array in `msg.payload`.
2. Connect the `inject` node to the `cool-loop-start` node.
3. Configure the `cool-loop-start` node to use `msg.payload` as the array property.
4. Connect the output of the `cool-loop-start` node to your processing flow.

### `cool-loop-join` Node

The `cool-loop-join` node receives the processed elements and decides whether to continue sending more elements from the `cool-loop-start` node or to end the loop.

**Important:** `_msgid` and `msg.done` are absolutely necessary, please do not overwrite them.

#### Example Usage

1. Connect the end of your processing flow to the `cool-loop-join` node.
2. Configure the `cool-loop-join` node with the ID of the corresponding `cool-loop-start` node.
3. Adjust the delay as needed.

### Complete Example

```plaintext
[Inject] -> [Cool Loop Start] -> [Your Processing Flow] -> [Cool Loop Join]
```

## Contributions

Contributions are welcome. To contribute, please follow these steps:

1. Fork the repository.
2. Create a branch for your feature (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License

## Author

**Your Name**  
Email: [pauljavaloyesdev@gmail.com](mailto:pauljavaloyesdev@gmail.com)

---

Thank you for using `node-red-contrib-cool-loop`! If you have any questions or suggestions, feel free to contact me.