import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles, TextField } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import { GoogleLogout } from 'react-google-login'
import './../screens/home.css'

const Navbar = (props) => {

    const { innerWidth, innerHeight } = window

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: innerWidth > 600 ? 600 : '100%',

            backgroundColor: theme.palette.background.paper,
            // border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            maxHeight: 'calc(100vh - 200px)',
            overflow: 'auto !important',
            top: '50%',
        },
        multilineColor: {
            color: 'white',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            width: '100%',
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
        rooot: {
            display: 'flex',
            '& > * + *': {
                marginLeft: theme.spacing(2),

                justifyContent: 'center !important',
            },
        },
    }))

    const classes = useStyles()

    return (
        <nav
            className='navbar'
            style={{
                backgroundColor: 'rgb(32,32,32)',
                width: '100%',
                height: 70,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <div style={{ display: 'flex' }}>
                <IconButton
                    className='menuicon'
                    onClick={() => props.setVisiblity((visiblity) => !visiblity)}
                    color='inherit'
                    aria-label='open drawer'
                >
                    <MenuIcon style={{ color: 'grey' }} />
                </IconButton>
                <h3
                    className='netbook'
                    style={{ color: 'white', display: 'flex', alignItems: 'center' }}
                >
                    Netbook
          </h3>
            </div>
            <div className='filterfield'>
                <TextField
                    style={{
                        color: 'white',
                        backgroundColor: 'rgb(18,18,18)',
                        display: 'flex',
                    }}
                    label='Filter'
                    fullWidth
                    margin='normal'
                    // onChange={}
                    size='small'
                    variant='outlined'
                    InputProps={{
                        className: classes.multilineColor,

                        endAdornment: (
                            <InputAdornment position='end'>
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>

            <div className='gbtn' style={{ display: 'flex', alignItems: 'center' }}>
                <GoogleLogout
                    className='gg'
                    color='white'
                    theme='dark'
                    clientId='542443202716-1162el1e1nqk02h64h08frl40vsl5hgp.apps.googleusercontent.com'
                    buttonText='Logout'
                    onLogoutSuccess={props.logout}
                ></GoogleLogout>
            </div>
        </nav>

    )
}

export default Navbar
