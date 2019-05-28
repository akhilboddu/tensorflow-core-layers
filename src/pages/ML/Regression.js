import React,  { Component } from 'react';
import { withRouter } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

import P5Wrapper from 'react-p5-wrapper';
import {
  ArtSketch,
  LinearRegression,
  PolynomialRegression,
  Degree3
} from './coreAPI-ml'

import BasicSinglePage from '../../components/templates/BasicSinglePage'

const steps = ['Art!','First Degree', 'Second Degree', 'Third Degree'];

const styles = theme => ({
  grid: {
    margin: `0 ${theme.spacing.unit * 2}px`
  },
  smallContainer: {
    width: '60%'
  },
  bigContainer: {
    width: '80%'
  },
  logo: {
    marginBottom: 24,
    display: 'flex',
    justifyContent: 'center'
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  stepGrid: {
    width: '80%'
  },
  buttonBar: {
    marginTop: 32,
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: theme.palette.primary['A100']
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit
  },
  stepper: {
    backgroundColor: 'transparent'
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  topInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 42
  },
  formControl: {
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  }
})
class Regression extends Component {

  state = {
    activeStep: 0,
    test: 0,
    receivingAccount: '',
    termsChecked: false,
    loading: true,
    labelWidth: 0,
    title: 'Draw in the browser!'
  }

  renderTitle = () => {
        if(this.state.activeStep === 0) {
            return ('Draw in the browser!')
        }
        else {
            return ('Polynomial Regression')
        }
      
  }

  functest = (result) => {
    console.log(result)
  }

  renderSketch = () => {
    if(this.state.activeStep === 0) {
        return (
            <div style={{marginBottom: 32}}>
                <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                    Art!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Hover and drag over the screen below, and watch the magic happen.
                </Typography>
                <div className={this.props.classes.stepContainer}>
                    <P5Wrapper sketch={ArtSketch} test={this.state.test} functest={this.functest}/>
                </div>

            </div>
        )
    }
    else if (this.state.activeStep === 1) {
        return (
            <div style={{marginBottom: 32}}>
                <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                    y = mx + c!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Linear regression of degree 1
                </Typography>
                <div className={this.props.classes.stepContainer}>
                    <P5Wrapper sketch={LinearRegression} />
                </div>
            </div>
        )
    }
    else if (this.state.activeStep === 2) {
        return (
            <div style={{marginBottom: 32}}>
                <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                    y = ax^2 + bx + c!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Polynomial regression of degree 2
                </Typography>
                <div className={this.props.classes.stepContainer}>
                    <P5Wrapper sketch={PolynomialRegression} />
                </div>
            </div>
        )
    }
    else if (this.state.activeStep === 3) {
        return (
            <div style={{marginBottom: 32}}>
                <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                    y = ax^2 + bx + c!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Polynomial regression of degree 3
                </Typography>
                <div className={this.props.classes.stepContainer}>
                    <P5Wrapper sketch={Degree3} />
                </div>
            </div>
        )
    }
  }



  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <BasicSinglePage {...this.props}>
        <Grid item xs={12}>
          <button onClick={() => {
            this.setState((prevState) => {
              return {test: prevState.test + 10};
            })
          } }>increase</button>
          <div className={this.props.classes.stepContainer}>
              <Typography variant="h3" gutterBottom>
                  {this.renderTitle()}
              </Typography>
          </div>
          
          <div className={classes.stepContainer}>
            <div className={classes.stepGrid}>
              <Stepper classes={{root: classes.stepper}} activeStep={activeStep} nonLinear alternativeLabel>
                {steps.map((label, index) => {
                  return (
                    <Step key={index}>
                      <StepButton onClick={() => this.setState({activeStep: index})}>{label}</StepButton>
                    </Step>
                  );
                })}
              </Stepper>
            </div>
            
            <div className={classes.smallContainer}>
              <Paper className={classes.paper}>
                <div>
                {this.renderSketch()}
                </div>
              </Paper>
              </div>
            </div>
        </Grid>
      </BasicSinglePage>
    )
  }
}

export default withRouter(withStyles(styles)(Regression))
