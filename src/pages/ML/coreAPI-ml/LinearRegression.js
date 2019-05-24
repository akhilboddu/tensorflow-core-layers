/**
 * Linear regression using Tensorflow Core API
 * Using mean squared error
 * This is using Schotastic Gradient Descent
 */
import * as tf from '@tensorflow/tfjs';

export default function PolySketch (p) {
    //1 the first thing is to add our dataset
    let x_vals = [];
    let y_vals = [];

    // 2 get the variables for y=mx+b ready
    let m, b;

    // 4 optimizer with learning rate to minimize loss error
    // stochastic gradient descent - minimizes error with time
    const learningRate = 0.2;
    const optimizer = tf.train.sgd(learningRate);

    p.setup = function () {
        p.createCanvas(640, 480);

        // creating tensor - has to be variable because m and b change
        // but data stays constant
        m = tf.variable(tf.scalar(p.random(1)));
        b = tf.variable(tf.scalar(p.random(1)));
    }

    // 5 loss function that takes in tensors
    function loss(pred, labels) {
        return pred.sub(labels).square().mean(); //mean squared error
    }

    // 3 need predict function, takes xvals and returns y tensor
    function predict(x) {
        const xs = tf.tensor1d(x); 
        // y = mx + b
        const  ys = xs.mul(m).add(b);
        return ys;
    }

    p.mousePressed = function() {
        // mapping everything to 0 and 1, since the canvas drawing starts at 0,0 at top left.
        let x = p.map(p.mouseX, 0, p.width, 0, 1); 
        let y = p.map(p.mouseY, 0, p.height, 1, 0);
        x_vals.push(x);
        y_vals.push(y);

    }

    p.draw = function() {
        
        tf.tidy(() => {
            if(x_vals.length > 0) {
                const ys = tf.tensor1d(y_vals);
                optimizer.minimize(() => loss(predict(x_vals), ys));
            }
        })
        
        p.background(0);
        
        p.stroke(255);
        p.strokeWeight(8);
        for(let i = 0; i < x_vals.length; i++) {
            let px = p.map(x_vals[i], 0, 1, 0, p.width); 
            let py = p.map(y_vals[i], 0, 1, p.height, 0);
            p.point(px, py);
        }

        // drawing line between 0 and 1
        const lineX = [0,1]
        const tensor_y = tf.tidy(() => predict(lineX));
        let lineY = tensor_y.dataSync();
        tensor_y.dispose();

        let x1 = p.map(lineX[0], 0, 1, 0, p.width);
        let x2 = p.map(lineX[1], 0, 1, 0, p.width);
        let y1 = p.map(lineY[0], 0, 1, p.height, 0);
        let y2 = p.map(lineY[1], 0, 1, p.height, 0);
        
        p.strokeWeight(2);
        p.line(x1, y1, x2, y2);
    }
};

  