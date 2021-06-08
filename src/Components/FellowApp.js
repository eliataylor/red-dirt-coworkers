import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InitiativeSelector from './InitiativeSelector';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import OverlayLoader from "./OverlayLoader";
import Dialog from "@material-ui/core/Dialog";
import Counselors from "./Counselors";
import Collaborate from "./Collaborate";
import {useSnackbar} from 'notistack';
import API from "../API";
import TextEditor from "./TextEditor";


const brandList = {
    'Kapuna Hale': {
        'img': 'https://kapunahale.com/wwwroot/img/tree-round-blk.png',
        'title': 'Kapuna Hale',
        'link': 'https://kapunahale.com',
        'desc': "Cooperative & Community Living",
        'mentors': ['Gene Taylor']
    },
    'Ruhral': {
        'img': '//cdn.shopify.com/s/files/1/1630/5941/files/Ruhrallogodesign2018_195x.png',
        'title': 'ruhral.com',
        'link': 'https://ruhral.com',
        'desc': "Wellness products with a worldwide return",
        'mentors': ['Samanta Khalil Taylor']
    },
    'Sammie Taylor': {
        'img': 'https://sammietaylor.com/favicon_rounded.png',
        'title': 'SammieTaylor.com',
        'link': 'https://sammietaylor.com',
        'desc': "Product and Experience Design",
        'mentors': ['Samanta Khalil Taylor']
    },
    'Track Authority Music': {
        'img': 'https://trackauthoritymusic.com/favicon.ico',
        'title': 'Track Authority Music',
        'link': 'https://trackauthoritymusic.com',
        'desc': "Rewarding Musical Tastes",
        'mentors': ['Eli Taylor']
    },
    'Taylor Made Traffic': {
        'img': 'https://taylormadetraffic.com/wwwroot/images/TMM_Logo_flat.png',
        'title': 'Taylor Made Traffic',
        'link': 'https://taylormadetraffic.com',
        'desc': "Application Engineering",
        'mentors': ['Eli Taylor']
    },
    'Garden Island Handyman': {
        'img': '/images/garden-island-handyman.png',
        'title': 'Garden Island Handyman',
        'link': 'https://www.gardenislandhandyman.com/',
        'desc': "Contractors with craftsmanship",
        'mentors': ['Ayal Zeindeld']
    }
}

const mentorList = {
    'Gene Taylor': {
        img: "/images/kh-office-shaka.jpg",
        title: 'Gene Taylor',
        desc: "Promoting win-wins",
        brands: ['Kapuna Hale']
    },
    'Samanta Khalil': {
        img: "/images/sammie-morocco.jpg",
        title: 'Samanta Khalil',
        desc: "Part time hippie",
        brands: ['Sammie Taylor', 'Ruhral']
    },
    'Eli Taylor': {
        img: "/images/kh-office.jpg",
        title: 'Eli Taylor',
        desc: "I have a weird obsession with organizing people's garages.",
        brands: ['Taylor Made Traffic', 'Track Authority Music']
    },
    'Ayal Zeindeld': {
        img: "/images/ayal.jpg",
        title: 'Ayal Zeindeld',
        desc: "Craftsman",
        brands: ['Garden Island Handyman']
    }
}


export default function FellowApp(props) {

    const classes = useStyles();
    const [budget, setBudget] = React.useState(500);
    const [months, setMonths] = React.useState(1);
    const [initiatives, setInitiatives] = React.useState({});
    const [startDate, setStartDate] = React.useState('');
    const [fullname, setName] = React.useState('');
    const [mail, setEmail] = React.useState('');
    const [idea, setIdea] = React.useState('');
    const [housing, setHousingType] = React.useState('');
    const [isLoading, setLoading] = React.useState(false);
    const [showingMentors, toggleMentors] = React.useState(false);
    const [show2020Note, close2020Note] = React.useState(true);


    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const handleBudgetChange = (event, newValue) => {
        setBudget(newValue);
    };

    const handleMonthChange = (event, newValue) => {
        setMonths(newValue);
    };

    const initiativeChange = (items) => {
        setInitiatives(items);
    };

    const handleStartChange = (event) => {
        setStartDate(event.target.value);
    };

    function valueLabelFormat(value) {
        return (<span><sup>$</sup>{value}</span>);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (startDate === '') {
            return enqueueSnackbar('Please select your ideal start month', {variant: 'error'});
        }
        setLoading(true);

        const obj = {
            "mail": mail,
            "name": fullname,
            "field_start_date": startDate,
            "field_type": housing,
            "field_initiatives": Object.keys(initiatives),
            "field_budget": budget,
            "field_duration": months,
            "field_idea": idea
        };

        API.Post('/application/new?_format=json', obj)
            .then(function (response) {
                console.log(response);
                enqueueSnackbar('Message received.', {variant: 'success'});
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                var err = API.getErrorMsg(error);
                enqueueSnackbar(err, {variant: 'error'});
                setLoading(false);
            });

        return false;
    }

    return (
        <Grid container direction='column' style={{marginBottom: 20}}>
            {isLoading === true ? <OverlayLoader/> : ''}
            <div className={classes.appBar}>
                <a href="/"><img src='/icon.png' className="float-right" alt="logo" height='40'/></a>
            </div>
            <Grid container className='container' style={{maxWidth: 800}}>
                <h1 className={classes.h1}>Red Dirt <span style={{fontSize: '50%', display: 'block'}}>Coworkers</span>
                </h1>
                <p><b>Red Dirt is our way of building a collective farm and collaborative workspace through sweat equity
                    and communal investments.</b></p>

                <Grid container className='intakeForm'>
                    <Grid container justify='space-between' spacing={2}>
                        <Grid item xs={12} md={6} sm={4}>
                            <img src="/images/kh-reddirt.jpg" className='img-fluid' alt='our garden'/>
                        </Grid>
                        <Grid item xs={12} md={6} sm={8}>
                            <h2 className={classes.subheader}>Our Mission</h2>
                            <p style={{fontStyle: 'italic'}}><strong>Our mission</strong> is to enrich our community,
                                through
                                sharing hands, minds, hearts and resources.</p>
                            <p>We pledge $5,000 for 2021 and $10,000 for 2022 to invest in projects with shared benefits
                                for you and our home.
                                Want a mobile fruit stand for farmers markets?
                                How about a mobile catering kitchen?
                                Want to start a line of tiny homes, work studios, or kiosks?
                                So do we!
                                Could you throw the pots for our nursery with a fresh new ceramics studio and kiln?
                                Could you lead a fitness bootcamp built from bamboo over 6 acres?
                                What could we do with our Mahogany forest if we had a 26" portable sawmill?
                            </p>
                            <p>Propose your project. If we can fund it, we will; and share all tools purchased, produce
                                grown, and workspaces curated in turn.</p>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} wrap='wrap-reverse'>
                        <Grid item xs={12} sm={6}>
                            <h2 className={classes.subheader}>Mutual Expectations</h2>
                            <p>Our goal is to find win-win investments for Kapuna Hale, as well as assist in your
                                personal &amp; professional development.</p>
                            <p>Before your application and budget is awarded, we will sign a work-trade agreement around
                                the milestones necessary to succeed in your initiative. </p>
                            <p>Your enrollment, access and/or residence during and after your tenure, is
                                entirely <strong>contingent on meeting your
                                    milestones</strong>.</p>
                            <p>You are free to seek or hold employment and encouraged to stay active outside of your
                                initiative
                                through fitness and fun.</p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <h2 className={classes.subheader}>Your Benefits</h2>
                            <p>You may apply to live at <a href="https://kapunahale.com" target="_blank"
                                                           rel="noopener noreferrer">Kapuna
                                Hale</a> or just come to use workspaces as needed from sunrise to sundown.</p>
                            <p>Either way you gain access to it's <strong>6
                                acres</strong>, <strong>tools</strong>, <strong>workspaces</strong>, <strong
                                style={{cursor: 'pointer'}}
                                onClick={e => toggleMentors(true)}><u>counselors</u></strong> and your
                                awarded <strong>budget</strong>.
                            </p>
                            <p>After your tenure you may continue to <strong>use and profit</strong> from the tools and
                                workspaces created during your initiative.</p>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} wrap='wrap-reverse'>
                        <Grid item xs={12} sm={6}>
                            <h2 className={classes.subheader}>Application Process</h2>
                            <p>1. Submit a few investment ideas for Kapuna Hale, and personal or professional
                                developments goals for yourself.</p>
                            <p>2. If we feel there's a match, and a complimentary <u style={{cursor: 'pointer'}}
                                                                                     onClick={e => toggleMentors(true)}>counselor</u> available
                                for your timeframe,
                                we will work together to establish an agreement around your milestones.</p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <h2 className={classes.subheader} style={{textAlign: 'left'}}>Minimum Qualifications</h2>
                            <p>On your first day...</p>
                            <ul>
                                <li>You will be over 18 and under 22 years old</li>
                                <li>You will have attended all four years of High School in Hawaii</li>
                                <li>You will have a High School Diploma with at least a 2.5 cumulative GPA over any two
                                    years
                                </li>
                            </ul>
                        </Grid>
                    </Grid>


                    {showingMentors === false ? '' :
                        <Dialog open={showingMentors} maxWidth={false} fullWidth
                                onClose={e => toggleMentors(false)} fullScreen>
                            <Grid container justify='space-between' className={classes.dialogHead}>
                                <Grid item xs={8}>
                                    <h3>Counselors &amp; Mentors</h3>
                                </Grid>
                                <Grid item xs={4} style={{textAlign: 'right'}}>
                                    <Button color='secondary' variant='contained' onClick={e => toggleMentors(false)}>
                                        COLLAPSE
                                    </Button>
                                </Grid>
                                <Grid xs={12} item><em>While not offering full time supervision, we are each available
                                    and excited to help your initiative succeed.</em></Grid>
                            </Grid>
                            <Grid container direction='column' style={{padding: '5px 8px'}}>
                                <Counselors brandList={brandList} mentorList={mentorList}/>
                            </Grid>
                            <p style={{padding: '30px 8px'}}>
                                <em>We're also seeking other <strong>local professionals</strong> willing to share their
                                    expertise. Please <Collaborate cta='reach out'/>.</em>
                            </p>
                        </Dialog>
                    }

                    {show2020Note === false ? '' :
                        <Dialog open={show2020Note} >
                            <div style={{padding:30}}>
                            <p style={{textAlign:'right', marginBottom:30}}>
                                    <Button color='primary' variant='contained' onClick={e => close2020Note()}>Close</Button>
                            </p>
                                <p>Unfortunately, due to Covid-19, we've decided to place this program on hold further notice.</p>
                                <p>Meanwhile we're keeping this page up to invite your ideas on how to make it a success - for co-workers, counselors, <a href="http://kapunahale.com/" target="_blank">Kapuna Hale</a>, &amp; our community overall.</p>
                                <p>If you're interested in funding collaborative efforts on your property, we've made this application <a href="https://github.com/eliataylor/red-dirt-coworkers" target="_blank">Open Source</a>.</p>
                            </div>
                        </Dialog>
                    }

                    <form action="https://portal.ruhralfarms.com/application/new" method="POST"
                          className={classes.appForm + " container-fluid p-0 mt-5"}>
                        <h1>Application</h1>
                        <Grid container className="mt-5">
                            <InitiativeSelector onChange={initiativeChange}  />
                        </Grid>

                        {Object.keys(initiatives).length === 0 ?
                            ''
                            :
                            <div id='page2'>
                                <Grid item className={classes.appSlider}>
                                    <label className={classes.sliderLabel}>What is the baseline budget? <sup
                                        className='isRequired'>*</sup></label>
                                    <Slider
                                        value={budget}
                                        valueLabelFormat={valueLabelFormat}
                                        onChange={handleBudgetChange}
                                        aria-labelledby='months needed'
                                        name="field_budget"
                                        step={500}
                                        marks
                                        required={true}
                                        min={500}
                                        max={5000}
                                        valueLabelDisplay='on'
                                    />
                                </Grid>

                                <Grid item className={classes.appSlider}>
                                    <label className={classes.sliderLabel}>How many months do you need? <sup
                                        className='isRequired'>*</sup></label>
                                    <Slider
                                        value={months}
                                        onChange={handleMonthChange}
                                        aria-labelledby='months'
                                        name="field_months"
                                        step={1}
                                        marks
                                        min={1}
                                        max={12}
                                        valueLabelDisplay='on'
                                    />
                                </Grid>

                                <Grid item>
                                    <label className={classes.placeholder}>How would you spend
                                        this {months > 1 ? months + ' months' : months + ' month'} and
                                        ${budget}?</label>
                                    <TextEditor onChange={setIdea}/>
                                    <p className='MuiFormHelperText-root'>{idea.length > 0 ? (4000 - idea.length) + ' / 4000 characters allowed ' : '200 - 4000 characters.'}</p>
                                </Grid>

                                <Grid container justify='space-between' spacing={1} alignItems='center'
                                      style={{marginBottom: 40}}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label='Your full name'
                                            autoComplete='true'
                                            name='fullname'
                                            fullWidth
                                            required={true}
                                            onChange={e => setName(e.currentTarget.value)}
                                            type='email'
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            autoComplete='true'
                                            name='mail'
                                            fullWidth
                                            label='Your email'
                                            required={true}
                                            onChange={e => setEmail(e.currentTarget.value)}
                                            type='email'
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth style={{marginTop: 0}}>
                                            <InputLabel id="housing">Housing Preference</InputLabel>
                                            <Select
                                                fullWidth
                                                id="housing"
                                                name="field_type"
                                                value={housing}
                                                onChange={e => setHousingType(e.target.value)}>
                                                <MenuItem value=''>No Preference</MenuItem>
                                                <MenuItem value='fellow'>Live at Kapuna Hale while co-working</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth className="mt-4">
                                            <InputLabel id="when2start">Your ideal start date <sup
                                                className='isRequired'>*</sup></InputLabel>
                                            <Select
                                                id="when2start"
                                                name="field_start_date"
                                                label='Start Timeframe'
                                                value={startDate}
                                                required={true}
                                                fullWidth
                                                onChange={handleStartChange}>
                                                <MenuItem value={'2021-02-01'}>Feb 2021</MenuItem>
                                                <MenuItem value={'2021-03-01'}>Mar 2021</MenuItem>
                                                <MenuItem value={'2021-04-01'}>Apr 2021</MenuItem>
                                                <MenuItem value={'2021-05-01'}>May 2021</MenuItem>
                                                <MenuItem value={'2021-06-01'}>Jun 2021</MenuItem>
                                                <MenuItem value={'2021-07-01'}>Jul 2021</MenuItem>
                                                <MenuItem value={'2021-08-01'}>Aug 2021</MenuItem>
                                                <MenuItem value={'2021-09-01'}>Sep 2021</MenuItem>
                                                <MenuItem value={'2021-10-01'}>Oct 2021</MenuItem>
                                                <MenuItem value={'2021-11-01'}>Nov 2021</MenuItem>
                                                <MenuItem value={'2021-12-01'}>Dec 2021</MenuItem>
                                            </Select>
                                            <FormHelperText>All dates depend on us all clear of
                                                Covid-19</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Button color='primary' type="submit" onClick={handleSubmit} variant='contained'
                                            disabled={(Object.keys(initiatives).length === 0)}>
                                        SUBMIT
                                    </Button>
                                </Grid>
                            </div>
                        }
                    </form>
                </Grid>
            </Grid>
        </Grid>
    );
}


const useStyles = makeStyles((theme) => ({
    h1: {
        fontWeight: 800,
        borderBottom: '1px solid #202020',
        marginBottom: 40,
        width: '100%'
    },
    dialogHead: {
        backgroundColor: '#202020',
        padding: '4px 8px',
        color: theme.palette.primary.light
    },
    appBar: {
        backgroundColor: '#202020',
        height: 45,
        padding: '2px 4px',
        marginBottom: 20
    },
    appForm: {
        color: '#202020',
        fontWeight: 600,
        borderTop: '1px solid #202020'
    },
    appSlider: {
        textAlign: 'right',
        margin: '55px 0 25px 0'
    },
    sliderLabel: {
        marginBottom: 0
    },
    subheader: {
        fontSize: 25,
        marginBottom: 0,
        fontWeight: 800,
        borderBottom: '1px solid #202020'
    },
    placeholder: {
        textAlign: 'left',
        color: '#202020',
        fontWeight: 600
    },
    disabled: {
        color: 'rgba(0, 0, 0, 0.38)',
        fontWeight: 500
    },
    dtImg: {
        height: 70,
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
    },
    investment: {
        color: 'green'
    },
    warning: {
        color: 'red'
    }
}));
