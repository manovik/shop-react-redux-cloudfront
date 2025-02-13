import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Product } from 'models/Product';
import { countPages, formatAsPrice } from 'utils/utils';
import AddProductToCart from 'components/AddProductToCart/AddProductToCart';
import axios from 'axios';
import API_PATHS from 'constants/apiPaths';
import Loader from 'components/Loader/Loader';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  pagination: {
    marginTop: '1em',
  },
}));

export default function Products() {
  const classes = useStyles();

  const [products, setProducts] = useState<Product[]>([]);
  const [productsToShow, setProductsToShow] = useState<Product[]>([]);
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const productsOnPage = 9;

  useEffect(() => {
    axios.get(`${API_PATHS.bff}`).then((res) => {
      setProducts(res.data.product);
      setLoader(false);
    });
  }, []);

  useEffect(() => {
    setProductsToShow(products.slice(0, productsOnPage));
    setPageCount(getPageCount())
    // eslint-disable-next-line
  }, [products]);

  useEffect(() => {
    scrollPageUp();
    setProductsToShow(
      products.slice(productsOnPage * (page - 1), productsOnPage * page)
    );
    // eslint-disable-next-line
  }, [page]);

  const handleSetPage = (num: number) => {
    setPage(num);
  };

  const scrollPageUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const getPageCount = () => countPages(products, productsOnPage);

  return (
    <>
      <Grid container spacing={4}>
        {
          loader ? (
            <Loader />
          ) : (
            productsToShow.map((product: Product) => {
              return (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={product.image_link}
                      title={product.description}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {product.title}
                      </Typography>
                      <Typography>{formatAsPrice(product.price)}</Typography>
                    </CardContent>
                    <CardActions>
                      <AddProductToCart product={product} />
                    </CardActions>
                  </Card>
                </Grid>
              );
            })
          )
        }
      </Grid>
      {
        pageCount > 1 
        ? <div className={classes.pagination}>
          <Pagination
            count={pageCount}
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={(e, number) => handleSetPage(number)}
            hidePrevButton={page === 1}
            hideNextButton={page === pageCount}
          />
        </div>
        : <></>
      }
    </>
  );
}
