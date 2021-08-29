import loader from './loader.svg'
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  loader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    width: '30%',
  }
}));

const Loader: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.loader}>
      <img className={classes.image} src={loader} alt="loading" />
    </div>
  );
}
 
export default Loader;