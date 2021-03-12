import React from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import TimelineIcon from '@material-ui/icons/Timeline'
import SearchIcon from '@material-ui/icons/Search'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import AddIcon from '@material-ui/icons/Add'
import PersonIcon from '@material-ui/icons/Person'
import './../screens/home.css'

const Sidebar = (props) => {
  return (
    <div
      className={props.visible ? 'showsidebar' : 'hidesidebar'}
      style={{
        marginTop: props.vissible ? 102 : 15,
        marginLeft: 12,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        height: props.vissible ? 'calc(100vh - 186px)' : 'calc(100vh - 100px)',
        transition: '0.3s',
        backgroundColor: 'white',
      }}
    >
      <Link className='link' to='/graph'>
        <div
          className='firsticon'
          style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}
        >
          <IconButton color='inherit' aria-label='open drawer'>
            <TimelineIcon style={{ color: 'grey' }} />
          </IconButton>
          <p className={props.visible ? 'slide' : 'hidetext'}>Graph View</p>
        </div>
      </Link>

      {/* <div
        style={{ display: 'flex', alignItems: 'center' }}
        onClick={props.showimportview}
      >
        <IconButton color='inherit' aria-label='open drawer'>
          <AddIcon style={{ color: 'grey' }} />
        </IconButton>
        <p className={props.visible ? 'slide' : 'hidetext'}>Import View</p>
      </div> */}

      <Link className='link' to='/query'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color='inherit' aria-label='open drawer'>
            <SearchIcon style={{ color: 'grey' }} />
          </IconButton>
          <p className={props.visible ? 'slide' : 'hidetext'}>Queries</p>
        </div>
      </Link>
      <Link className='link' to='/feed'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color='inherit' aria-label='open drawer'>
            <FormatListBulletedIcon style={{ color: 'grey' }} />
          </IconButton>
          <p className={props.visible ? 'slide' : 'hidetext'}>Feed View</p>
        </div>
      </Link>
      <Link className='link' to='/profile'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color='inherit' aria-label='open drawer'>
            <PersonIcon style={{ color: 'grey' }} />
          </IconButton>
          <p className={props.visible ? 'slide' : 'hidetext'}>Profile</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar
