import React, { Component } from 'react'
import * as tf from '@tensorflow/tfjs'

export default class NeuralNetwork extends Component {
    componentWillMount() {
        console.log('here we are')

        //this is the model
        const model = tf.sequential()

        //create hidden layer
        //dense is a fully connected layer
        const hidden = tf.layers.dense({
            units: 4,       //num of nodes
            inputShape: [2],//input batch (an array [ with arrays inside of 2 elements[a,b]])
            activation: 'sigmoid'
        });
        model.add(hidden) //add to the model (Sequentially - feedforward sequential model)

        //create another output - 
        const output = tf.layers.dense({
            units: 1,
            activation: 'sigmoid'
        });
        model.add(output)

        //once configurations are complete, time to compile the model
        const sgdOpt = tf.train.sgd(0.6)
        model.compile({
            optimizer: sgdOpt, //model then needs to be compiled with an optimizer to reduce loss function
            loss: tf.losses.meanSquaredError //and a kind of loss function
        })

        /** Model then needs to be Trained */
        const xs = tf.tensor2d([
            [1, 1],
            [0.5, 0.5],
            [0, 0]
        ])
        const ys = tf.tensor2d([
            [0],
            [0.5],
            [1]
        ])
        const config = {
            shuffle: true,
            verbose: true,
            epochs: 5
        }
        async function train() {
            for(let i = 0; i < 10; i++){
                let response = await model.fit(xs, ys, config);
                console.log(response.history.loss[0])
            }
        }
        train().then(() => {
            /** Because of synchronous nature of tf, need to make predictions here */
            console.log('Training Completed');
            let outputs = model.predict(xs)
            outputs.print()
        })

        
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
