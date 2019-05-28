export default function ArtSketch (p) {

  let color;
  p.setup = function() {
    p.createCanvas(640, 480);
  }

  let test;
  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    test = props.functest
    console.log(props.test);
    color = props.test

  };
  
  p.draw = function() {
    if (p.mouseIsPressed) {
      test('fockol')
      p.fill(0);
    } else {
      p.fill(255);
    }
    p.ellipse(p.mouseX, p.mouseY, 80, 80);
  }
};