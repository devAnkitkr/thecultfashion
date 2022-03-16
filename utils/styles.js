import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#203040',
    '& a': {
      color: '#ffffff',
      marginLeft: 10,
    },
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: '80vh',
  },
  footer: {
    backgroundColor: 'rgb(210,210,210)',
    marginTop: 50,
    padding: '2rem',
    textAlign: 'center',
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  form: {
    width: '100%',
    maxWidth: 800,
    margin: '0 auto',
  },
  navbarButton: {
    color: '#ffffff',
    textTransform: 'initial',
  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
  error: {
    color: 'red',
  },
  fullWidth: {
    width: '100%',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardButton: {
    marginTop: '0px',
    marginLeft: '5px',
  },
  mt1: {
    width: '100%',
    height: '340px',
    marginTop: '2rem',
  },
  featuredImage: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
  },
});

export default useStyles;
