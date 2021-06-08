import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slider from '@material-ui/core/Slider';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Avatar from '@material-ui/core/Avatar';


export default function ApplyNow(props) {
  const [open, setOpen] = React.useState(false);
  const [budget, setBudget] = React.useState(500);
  const [months, setMonths] = React.useState(1);
  const [idea, setIdea] = React.useState('');
  const [initiatives, setInitiatives] = React.useState([]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBudgetChange = (event, newValue) => {
    setBudget(newValue);
  };

  const handleMonthChange = (event, newValue) => {
    setMonths(newValue);
  };

  const handleIdeaChange = (event) => {
    setIdea(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    if (event.target.value.length < 4) {
      setInitiatives(event.target.value);
    }
  };

  function valueLabelFormat(value) {
    return '$'+ value;
  }

  if (open === false) {
    return (<div id='applyNow' onClick={handleClickOpen}>
        <div>Apply Now</div>
        <small className='text-center'><em>Due May 1st</em></small>
    </div>)
  }

  return (
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Red Dirt Coworkers</DialogTitle>
        <DialogContent className='intakeForm'>
          <p style={{fontStyle:'italic'}}>Our mission is to build a community workspace to create products, spaces and solutions for our community through sharing tools, hands, minds, and resources. </p>
          <p>To fulfill this mission we initialize are prioritizing applications which can leave tools or facilities at Kapuna Hale for you, future fellows and our community to use.</p>
          <p>During your co-working at Kapuna Hale you have access to it's 6 acres and all tools, workspaces, and expertise we have. Additionally the following organizations and individuals have offered their support to help make your initiative a success. Please include in your application how you might want to leverage their skills or resources.</p>
          <p>[your name / logo here]</p>

          <div className='mb-4 mt-3' >
            <h4 className="backToTop">Qualifications you should have by May 22nd, 2020</h4>
            <ul>
                <li>You will be under 22 years old</li>
                <li>You will have attended all four years of High School in Hawaii</li>
                <li>You will have a High School Diploma with at least a 2.5 GPA</li>
            </ul>
          </div>

          <FormControl  className='mb-4 mt-3' fullWidth>
              <InputLabel id="skills-label"><b>Select 1 - 3 skills you want to work on</b></InputLabel>
              <Select
                labelId="kills-label"
                id="skills"
                fullWidth
                multiple
                required={true}
                value={initiatives}
                onChange={handleChangeMultiple}
                renderValue={(selected) => selected.join(', ')}
              >
                {props.tileData.map(tile => (
                  <MenuItem key={tile.img} value={tile.title} >
                    <span>{tile.title}</span>
                    <span style={{flexGrow:1}}></span>
                    <Avatar src={tile.img} alt={tile.title} variant="rounded" height='45' />
                  </MenuItem>
                ))}
              </Select>
          </FormControl>

           <div className='appSlider'>
            <label>What is your baseline budget your initiative?</label>
            <Slider
              value={budget}
              valueLabelFormat={valueLabelFormat}
              onChange={handleBudgetChange}
              aria-labelledby='months needed'
              step={100}
              marks
              min={500}
              max={5000}
              valueLabelDisplay='on'
            />
          </div>

          <div className='appSlider'>
            <label>How many months do you need to build your initiative</label>
            <Slider
              value={months}
              onChange={handleMonthChange}
              aria-labelledby='months'
              step={1}
              marks
              min={1}
              max={12}
              valueLabelDisplay='on'
            />
          </div>

          <TextField
            id='appIdea'
            label={<span>How would you spend {months > 1 ? months + ' months' : months + ' month'} rent-free with a ${budget} budget?</span>}
            helperText={ idea.length > 0 ? (4000 - idea.length) + ' / 4000 characters allowed ' : ''}
            type='textarea'
            value={idea}
            onChange={handleIdeaChange}
            multiline
            rows='4'
            fullWidth
          />

          <div className='row m-auto'>
            <TextField
              className='col-md-6 mr-md-1 col-12'
              label='Your full name'
              autoComplete='true'
              id='name'
              type='email'
            />
            <TextField
              className='col-md-6 ml-md-1 col-12'
              autoComplete='true'
              id='email'
              label='Your email'
              type='email'
            />
          </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleClose} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
  );
}
