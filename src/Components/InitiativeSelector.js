import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';



const tileData = [
  {
    img: 'https://kapunahale.com/wwwroot/photos/projects/20170528_111110_300x300.jpg',
    title: 'Propagation',
    invest: 'Hydroponic cloners, raised nursery beds, air pumps...?',
    plan: 'Take ~75% of produce to market, leave us with the rest'
  },
  {
    img: '/images/kh/kh-permaculture.jpg',
    title: 'Permaculture',
    invest: 'Starter plants, trees and soils, ...?',
    plan: 'Take ~75% of produce to market, leave us with the rest'
  },
  {
    img: 'https://kapunahale.com/wwwroot/photos/projects/16_300x300.jpg',
    title: 'Horticulture',
    invest: 'Starter plants, trees, soils, tillers, ground covers, irrigation systems, ...?',
    plan: 'Take ~75% of produce to marke, leave us with the restt'
  },
  {
    img: 'https://kapunahale.com/wwwroot/photos/projects/8_300x300.jpg',
    title: 'Landscape Design',
    invest: 'Pavers, rock cinders, and starter plants or trees, a photoshoot and website for your portfolio, ...?',
    plan: 'Start your own landscaping business'
  },
  {
    img: '/images/kh/sammie-caters-A.png',
    title: 'Catering',
    invest: 'Mobile Clay oven, Mobile BBQ / Kitchen, drop freezers, appliances, ...?',
    plan: 'Start a mobile catering company'
  },
  {
    img: 'https://kapunahale.com/wwwroot/photos/projects/IMG_0174_300x300.jpg',
    title: 'Interior Design',
    invest: 'Turn our 1400 square foot lanai into a yoga and fitness space, + a photoshoot and website for your portfolio?',
    plan: 'Start your interior design business'
  },
  {
    img: 'https://kapunahale.com/wwwroot/photos/projects/20170602_144257_300x300.jpg',
    title: 'Carpentry',
    invest: 'CNC machine, sawmill, laser etcher / cutter, ...?',
    plan: 'Build and sell crafts, cabinets, or services'
  },
  {
    img: 'https://kapunahale.com/wwwroot/photos/projects/20141026_131414_300x300.jpg',
    title: 'Construction',
    invest: 'Mobile stage or kiosk, portable sawmill, ...?',
    plan: 'Start a event production business, milling service, or just build your portfolio and experience'
  },
  {
    img: 'https://kapunahale.com/wwwroot/photos/projects/59_300x300.jpg',
    title: 'Combustion Engines',
    invest: 'Parts and materials for restoration projects',
    plan:'Restore and resell cars, trucks and machinery'
  },
  {
    img: 'https://kapunahale.com/wwwroot/photos/projects/51_300x300.jpg',
    title: 'Electric Motors',
    invest: 'Old electric golf cart, tractors, refrigerators',
    plan:'Rebuild and resell tools and appliances with solar powered motors'
  },
  {
    img: 'https://kapunahale.com/wwwroot/photos/projects/9_300x300.jpg',
    title: 'Plumbing',
    invest: 'Water catchment systems, farm irrigation systems, ...?',
    plan:'Start your plumbing business'
  },
  {
    img: '/images/kh/concrete-firepit.jpg',
    title: 'Masonry',
    invest: 'Cement mixer, Hand trucks, ...?',
    plan:'Build and sell stone and cement Art, building services'
  },
  {
    img: '/images/team-music.jpg',
    title: 'Music',
    invest: 'Recording studio, instruments, mixing tools, ...?',
    plan:'Record, release, and market an album'
  },
  {
    img: '/images/team-diverse.jpg',
    title: 'Languages',
    invest: 'Instruction and event promotion',
    plan:'Host language exchange events'
  }
];

// TOOD: add "Fitness", "Software?"

export default function InitiativeSelector(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [initiatives, setInitiatives] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
    window.defaultAnalytics.logEvent('page_view', {page_title : 'All Initiatives'});
  };

  const handleClose = () => {
    setOpen(false);
  };

  function toggleItem(e) {
    var copy = {...initiatives};
    var id = e.currentTarget.getAttribute('data-initiative');
    if (typeof initiatives[id] !== 'undefined') {
      window.defaultAnalytics.logEvent('remove_from_cart', {value : id});
      delete copy[id];
      setInitiatives(copy);
    } else {
      if (Object.keys(copy).length >= 3) {
        window.defaultAnalytics.logEvent('add_to_wishlist', {value : id});
        return false;
      }
      window.defaultAnalytics.logEvent('add_to_cart', {value : id});
      copy[id] = true;
      setInitiatives(copy);
    }
    props.onChange(copy);
  }

  const selectedRows = tileData.map(tile => {
    if (typeof initiatives[tile.title] !== 'undefined') {
      return (
        <CardHeader
                key={tile.img}
                className={classes.cardHeader}
                avatar={<Avatar src={tile.img} variant='rounded' />}
                title={
                  <div>
                    <small>investment <em>ideas</em></small>
                    <div>{tile.invest}</div>
                    <strong>{tile.plan}</strong>
                  </div>
                }
                subheader={tile.warning ? tile.warning : ''}
              />);
    } return '';
  })


  if (open === false) {
    return (
      <Grid container direction='column'>
        <Grid container justify='space-between' wrap='nowrap'>
          <Grid item className={classes.placeholder} >
            First, click up to 3 initiatives you want to focus on<sup className='isRequired'>*</sup>
          </Grid>
          <Grid item>
            <Button style={{marginBottom:4}}  color='secondary' variant='outlined' onClick={handleClickOpen}>
              Expand All
            </Button>
          </Grid>
        </Grid>
          <div className={classes.rootList}>
          <GridList className={classes.gridList} cols={window.innerWidth > 900 ? 4.5 : 2.5}>
            {tileData.map(tile => (
                  <GridListTile
                    key={tile.img}
                    className={classes.skillBlockBtn}
                    data-initiative={tile.title}
                    onClick={toggleItem}
                    >
                    <img src={tile.img} alt={tile.title} />
                    <GridListTileBar title={tile.title} className={(typeof initiatives[tile.title] !== 'undefined') ? ' selected ' : ''} />
                  </GridListTile>
              ))}
          </GridList></div>
          {selectedRows}
          </Grid>
        );
  }

  return (
    <Dialog fullScreen open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle className={classes.appBar}>
        <Grid container justify='space-between' wrap='nowrap'>
          <Grid item>Select 1, 2 or 3 initiatives for your focus</Grid>
          <Grid item>
            <Button style={{marginBottom:4}} color='secondary' variant='contained' onClick={handleClose} aria-label="close">
              Close
            </Button>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        {selectedRows}
        <GridList cols={window.innerWidth > 900 ? 4 : ((window.innerWidth > 600) ? 3 : 2)}>
        {tileData.map(tile => (
              <GridListTile
                key={tile.img}
                className={classes.skillBlockBtn}
                data-initiative={tile.title}
                onClick={toggleItem}
                >
                <img src={tile.img} alt={tile.title} />
                <GridListTileBar title={tile.title} className={(typeof initiatives[tile.title] !== 'undefined') ? ' selected ' : ''} />
              </GridListTile>
          ))}
        </GridList>

      </DialogContent>
    </Dialog>
  );
}


const useStyles = makeStyles((theme) => ({
  h1: {
    fontWeight:800,
    borderBottom:'1px solid #202020',
    marginBottom:40
  },
  cardHeader : {
    padding:0,
    marginBottom:15,
  },
  appForm : {
    color:'#202020',
    fontWeight:600
  },
  appBar : {
    backgroundColor:theme.palette.primary.main,
    color:theme.palette.primary.contrastText,
    textAlign:'left'
  },
  appSlider : {
    textAlign:'right',
    margin:'20px 0'
  },
  sliderLabel : {
    marginBottom:0
  },
  subheader: {
    marginBottom:0,
    fontWeight:800,
    borderBottom:'1px solid #202020'
  },
  rootList: {
    display: 'flex',
    width:'100%',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    flexWrap: 'nowrap',
    width:'100%',
    transform: 'translateZ(0)',
  },
  placeholder : {
    textAlign:'left',
    color:'#202020',
    fontWeight:600
  },
  skillsSelector: {
    color:'#202020',
    display:'flex',
    paddingLeft:5,
    paddingRight:5,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'flex-start',
    alignItems:'flex-start'
  },
  skillBlockBtn : {
    cursor:'pointer',
    '&[aria-selected="true"] .MuiGridListTileBar-title' : {
      color:theme.palette.primary.main
    },
    '& .selected' : {
      color:theme.palette.primary.main
    },
    '& .selected .MuiGridListTileBar-title' : {
      color:theme.palette.primary.main
    },
    '& .selected .MuiGridListTileBar-titleWrap' : {
      color:theme.palette.primary.main
    }
  },
  labelDesc : {
    display: 'block',
    margin: 0,
    borderBottom: '1px solid #202020',
    fontSize: 12,
  },
  selectorIndicator : {
    cursor:'pointer'
  },
  dtImg : {
    width:'100%', height:'100%',
    backgroundSize:'cover',
    backgroundPosition:'center center'
  },
  warning : {
    color:'orange'
  }

}));
