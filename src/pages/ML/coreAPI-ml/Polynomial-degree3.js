/**
 * Linear regression using Tensorflow Core API
 * Using mean squared error
 * This is using Schotastic Gradient Descent
 */
import * as tf from '@tensorflow/tfjs';

export default function PolynomialRegression (p) {
    //1 the first thing is to add our dataset
    let x_vals = [];
    let y_vals = [];

    // 2 get the variables for y=mx+b ready
    let a, b, c,d;

    // 4 optimizer with learning rate to minimize loss error
    // stochastic gradient descent - minimizes error with time
    const learningRate = 0.4;
    const optimizer = tf.train.adam(learningRate);

    p.setup = function () {
        p.createCanvas(640, 480);

        // creating tensor - has to be variable because m and b change
        // but data stays constant
        a = tf.variable(tf.scalar(p.random(-1, 1)));
        b = tf.variable(tf.scalar(p.random(-1, 1)));
        c = tf.variable(tf.scalar(p.random(-1, 1)));
        d = tf.variable(tf.scalar(p.random(-1, 1)));
    }

    // 5 loss function that takes in tensors
    function loss(pred, labels) {
        return pred.sub(labels).square().mean(); //mean squared error 
    }

    // 3 need predict function, takes xvals and returns y tensor
    function predict(x) {
        const xs = tf.tensor1d(x); 
        // y = ax^3 + bx^2 + cx+d
        const  ys = xs.pow(3).mul(a).add(xs.square().mul(b)).add(xs.mul(c)).add(d);
        return ys;
    }

    p.mousePressed = function() {
        // mapping everything to 0 and 1, since the canvas drawing starts at 0,0 at top left.
        let x = p.map(p.mouseX, 0, p.width, -1, 1); 
        let y = p.map(p.mouseY, 0, p.height, -1, 1);
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
            let px = p.map(x_vals[i], -1, 1, 0, p.width); 
            let py = p.map(y_vals[i], 1, -1, p.height, 0);
            p.point(px, py);
        }

        // drawing line between 0 and 1
        const curveX = [];
        for(let x = -1; x < 1; x += 0.05) {
            curveX.push(x)
        }
        const tensor_y = tf.tidy(() => predict(curveX));
        let curveY = tensor_y.dataSync();
        tensor_y.dispose();

        p.beginShape();
        p.noFill();
        p.stroke(255);
        p.strokeWeight(2);

        for(let i = 0; i < curveX.length; i++) {
            let x = p.map(curveX[i], -1, 1, 0, p.width);
            let y = p.map(curveY[i], -1, 1, 0, p.height);
            p.vertex(x, y);
        }
        p.endShape();
        
    }
};

  