import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Link,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
  Badge,
  Button,
} from '@material-ui/core';
import useStyles from '../utils/styles';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Layout = ({ title, description, children }) => {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  const classes = useStyles();

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    Cookies.set('darkMode', !darkMode ? 'ON' : 'OFF');
  };

  const [anchorEl, setAnchorEl] = useState(false);

  const handleMenuBox = (e, redirect) => {
    setAnchorEl(!anchorEl);
    console.log('i was clicked');
    if (redirect) {
      router.push(redirect);
      return;
    }
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    Cookies.remove('paymentMethod');
    router.push('/');
  };

  const handleMenuOutside = () => {
    setAnchorEl(!anchorEl);
  };

  return (
    mounted && (
      <div>
        <Head>
          <title>
            {title ? `${title}-The Cult Fashion` : 'The Cult Fashion'}
          </title>
          {description && (
            <meta name="description" content={description}></meta>
          )}
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <AppBar position="static" className={classes.navbar}>
              <Toolbar>
                <NextLink href="/" passHref>
                  <Link underline="none">
                    <Typography className={classes.brand}>
                      The Cult Fashion
                    </Typography>
                  </Link>
                </NextLink>
                <div className={classes.grow}></div>
                <div>
                  <Switch
                    checked={darkMode}
                    onChange={darkModeChangeHandler}
                  ></Switch>
                  <NextLink href="/cart" passHref>
                    <Link underline="none">
                      {cart.cartItems.length > 0 ? (
                        <Badge
                          color="secondary"
                          badgeContent={cart.cartItems.length}
                        >
                          Cart
                        </Badge>
                      ) : (
                        'Cart'
                      )}
                    </Link>
                  </NextLink>
                  {userInfo ? (
                    <>
                      <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={() => setAnchorEl(!anchorEl)}
                        className={classes.navbarButton}
                      >
                        {userInfo.name}
                      </Button>
                      {anchorEl && (
                        <div
                          style={{
                            position: 'relative',
                            transition: 'all ease .5s',
                            zIndex: '10',
                          }}
                        >
                          <div
                            style={{
                              position: 'fixed',
                              width: '100vw',
                              height: '100vh',
                              left: '0',
                              top: '0',
                              backgroundColor: 'transparent',
                            }}
                            onClick={(e) => setAnchorEl(!anchorEl)}
                          ></div>
                          <ul
                            className="dropBox"
                            style={{
                              backgroundColor: 'white',
                              borderRadius: '5px',
                              listStyle: 'none',
                              padding: '1em',
                              margin: '0em',
                              position: 'absolute',
                              right: '1rem',
                              cursor: 'pointer',
                              boxShadow: '1px 1px 10px rgb(0,0,0,0.5)',
                              ':hover': {
                                backgroundColor: 'gray',
                                color: 'yellow',
                              },
                            }}
                          >
                            <li
                              className="dropBox"
                              style={{ padding: '2px 0px' }}
                              onClick={(e) => handleMenuBox(e, '/profile')}
                            >
                              Profile
                            </li>
                            <li
                              className="dropBox"
                              style={{
                                padding: '2px 0px',
                              }}
                              onClick={(e) =>
                                handleMenuBox(e, '/order-history')
                              }
                            >
                              Order History
                            </li>
                            <li
                              className="dropBox"
                              style={{ padding: '2px 0px' }}
                              onClick={handleMenuBox}
                            >
                              Log out
                            </li>
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <NextLink href="/login" passHref>
                      <Link underline="none">Login</Link>
                    </NextLink>
                  )}
                </div>
              </Toolbar>
            </AppBar>
            <Container className={classes.main}>{children}</Container>
            <footer className={classes.footer}>
              <Typography>All rights reserved. thecultstyle.com</Typography>
            </footer>
          </CssBaseline>
        </ThemeProvider>
      </div>
    )
  );
};

export default Layout;
