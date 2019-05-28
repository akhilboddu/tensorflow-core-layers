import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles';
import BasicSinglePage from '../../components/templates/BasicSinglePage'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import P5Wrapper from 'react-p5-wrapper';

import XORsketch from './xorProblem/XORsketch'


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

class XORProblem extends Component {
    render() {
        const { classes } = this.props;

        return (
            <BasicSinglePage {...this.props}>
                <Grid item xs={12}>
                <div className={classes.stepContainer}>
                    <Typography variant="h3" gutterBottom>
                        XOR Problem
                    </Typography>
                </div>
                  <div className={classes.stepContainer}>
                    <div className={classes.smallContainer}>
                        <Paper className={classes.paper}>
                            <div>
                                <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                                    Art!
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Hover and drag over the screen below, and watch the magic happen.
                                </Typography>
                                <div className={classes.stepContainer}>
                                    <P5Wrapper sketch={XORsketch} test="test"/>
                                </div>
                            </div>
                        </Paper>
                        </div>
                    </div>
                </Grid>
            </BasicSinglePage>
        )
    }
}

export default withRouter(withStyles(styles)(XORProblem))

