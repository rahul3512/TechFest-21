import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import CloseIcon from '@material-ui/icons/Close';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DomainIcon from '@material-ui/icons/Domain';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import PeopleIcon from '@material-ui/icons/People';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PersonIcon from '@material-ui/icons/Person';
import { Box, MenuItem } from '@material-ui/core';
import './Navbar.css';
import { withRouter } from "react-router-dom";
import { isAuthenticated, signout } from '../../../auth/helper';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import teclogo from '../../../assets/images/techFESTlogo.png';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChangePassword from '../../Dashboard/user/ChangePassword';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useAlert } from 'react-alert';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    zIndex: 25,

  },

  appBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    // backgroundColor: 'transparent',
    zIndex: 25,
    boxShadow: 'none',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,

  },
  drawerPaper: {
    width: drawerWidth,
    borderRadius: '75px 0px 0px 75px',
    background: 'linear-gradient(180.25deg, #102C66 -2.77%, #07FFC3 111%)',
    backdropFilter: 'blur(10px)',
    color: 'white',

  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,

  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },

}));

const Nav = props => {
  const alert = useAlert();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { history } = props;

  const itemsList = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      onClick: () => {
        handleDrawerClose()
        history.push("/user/dashboard")
      }     // change /dashboard -->> /user/dashboard    (By Rahul)
    },
    {
      text: "Home",
      icon: <HomeIcon />,
      onClick: () => {
        handleDrawerClose()
        history.push("/")
      }
    },
    {
      text: "About Us",
      icon: <PeopleIcon />,
      onClick: () => {
        handleDrawerClose()
        history.push("/about-us")
      }
    },

    {
      text: "Domain",
      icon: <DomainIcon />,
      onClick: () => {
        handleDrawerClose()
        history.push("/domain")
      }
    },
    {
      text: "Workshop",
      icon: <SupervisedUserCircleIcon />,
      onClick: () => {
        handleDrawerClose()
        history.push("/workshop")
      }
    },
    {
      text: "Sponsors",
      icon: <AttachMoneyIcon />,
      onClick: () => {
        handleDrawerClose()
        history.push("/sponsors")
      }
    },
    {
      text: "PR Intern",
      icon: <PersonIcon />,
      onClick: () => {
        handleDrawerClose()
        history.push("/pr-intern")
      }
    },
    {
      text: "Contact Us",
      icon: <ContactMailIcon />,
      onClick: () => {
        handleDrawerClose()
        history.push("/contact-us")
      }
    },
    {
      text: "Our Team",
      icon: <PeopleIcon />,
      onClick: () => {
        handleDrawerClose()
        history.push("/our-team")
      }
    }
  ];

  // AppBar drawer signout authentication check
  if (!isAuthenticated()) {
    itemsList.push({
      text: "Register",
      icon: <PersonAddIcon />,
      onClick: () => {
        handleDrawerClose()
        history.push("/register")
      }
    })
  } else {

    itemsList.push(
      {
        text: "Change Password",
        icon: <LockOpenIcon />,
        onClick: () => {
          handleShow()
          handleDrawerClose()
        }
      },
      {
        text: "Sign out",
        icon: <ExitToAppIcon />,
        onClick: () => signout(() => {
          alert.show("Signout successfully", {
            type: 'success',
            timeout: '2000'
          })
          handleDrawerClose()
          history.push("/")
        })
      }
    )

  }

  const [show, setShow] = useState(false);


  const handleShow = () => setShow(true);
  const handleClose = useCallback(() => {
    setShow(false);
  }, [show])

  const ChangeP = () => {
    return (
      <>
        {show ?
          <ChangePassword handleClose={handleClose} /> : null}
      </>

    )
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      {ChangeP()}
      <div className={classes.root}>

        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >

          <Toolbar>
            <Typography variant="h6" noWrap className={classes.title}>
              <Box className='logo' component={Link} to='/'>
                {/* techFEST'21 */}
                <img src={teclogo} alt='tec-logo' className='logo-img' />
              </Box>

            </Typography>
            <div className="appbar">

              <MenuItem className="navmenu" component={Link} to="/pr-intern">PR Intern</MenuItem>

              {
                !isAuthenticated() && (
                  <MenuItem className="navmenu" component={Link} to="/register">Register</MenuItem>

                )
              }

              {
                isAuthenticated() && (
                  <MenuItem className="navmenu" onClick={() => signout(() => {
                    alert.show("Signout successfully", {
                      type: 'success',
                      timeout: '2000'
                    })
                    history.push("/")
                  })}>Sign out</MenuItem>

                )
              }
            </div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>


        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose} className="closeicon">
              {theme.direction === 'rtl' ? <CloseIcon /> : <CloseIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {itemsList.map((item, index) => {
              const { text, icon, onClick } = item;
              return (
                <ListItem button key={text} onClick={onClick}>
                  {icon && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText primary={text} />
                </ListItem>
              );
            })}
          </List>

          <Divider />

        </Drawer>
      </div>
    </>
  );
}

export default withRouter(Nav);


