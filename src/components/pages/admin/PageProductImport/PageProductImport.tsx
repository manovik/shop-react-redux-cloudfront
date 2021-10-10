import React, { useEffect } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import API_PATHS from "constants/apiPaths";
import ProductsTable from "components/pages/admin/PageProductImport/components/ProductsTable";
import CSVFileImport from "components/pages/admin/PageProductImport/components/CSVFileImport";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {Link} from "react-router-dom";
import { ls } from 'constants/localStorage';


const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3, 0, 3),
  },
}));

export default function PageProductImport() {
  const classes = useStyles();

  useEffect(() => {
    for (const [key, val] of Object.entries(ls)) {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, val);
      }
    }

    const user = localStorage.getItem('user');
    const pass = localStorage.getItem('pass');
    const token = btoa(`${user}:${pass}`);
    localStorage.setItem('authorization_token', `Basic ${token}`);
  }, []);
  
  return (
    <div className={classes.content}>
      <Box display="flex" alignItems="center">
        <CSVFileImport url={`${API_PATHS.import}`} title="Import Products CSV"/>
        <Button size="small" color="primary" variant="contained" component={Link} to={'/admin/product-form/'}>
          create product
        </Button>
      </Box>
      <ProductsTable/>
    </div>
  );
}
