import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Container from "@material-ui/core/Container";
import Header from "components/MainLayout/components/Header";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'© Rolling Scopes School '}
      <Link color="inherit" href="https://material-ui.com/">
        PinApple
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  main: {
    flex: '1 0 auto'
  },
  container: {
    paddingBottom: theme.spacing(8),
    height: '100%'
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    flexShrink: 0,
  },
}));

const MainLayout: React.FC = ({children}) => {
  const classes = useStyles();

  return (
    <>
      <Header/>
      <main className={classes.main}>
        <Container className={classes.container} maxWidth="md">
          {children!}
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Thank you for your purchase!
        </Typography>
        <Copyright/>
      </footer>
    </>
  );
};

export default MainLayout;