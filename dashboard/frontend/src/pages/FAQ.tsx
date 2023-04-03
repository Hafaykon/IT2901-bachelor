import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import ActiveLastBreadcrumb from '../components/ActivateLastBreadcrumb';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './FAQ.css';

function FAQ() {
    return (
        <div>
            <Grid container sx={{paddingTop: 5, paddingLeft: 25}}>
                <ActiveLastBreadcrumb />
            </Grid>
            <Grid className='Header'>
                <Typography id="Headline">Ofte stilte spørsmål</Typography>
                <p style={{ fontStyle: 'italic', marginBottom: '30px' }}>
                    Nedenfor ser du en oversikt over ofte stilte spørsmål om lisensdashboardet, 
                    lisensportalen, og lisensadministrering generelt. 
                </p>
            </Grid>
            <Grid container id="Columns">
                <p id='SubHeadline'>Lisensdashboard</p>
                <Grid container>
                    <Accordion className='accordions'>
                        <AccordionSummary 
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                            <p>Hva brukes lisensdashboardet til?</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography id="details">
                            Lisensdashboardet viser en oversikt over alle lisenser eid i din enhet.<br></br><br></br>
                            Lisensene blir presentert på ulike måter i lisensdashboardet:
                                <ul> 
                                    <li>Totale lisenser viser hvor mange lisenser enheten eier. </li>
                                    <li>Ubrukte lisenser viser hvor mange lisenser av de enheten eier som aldri har blitt brukt eller åpnet.</li>
                                    <li>Ledige lisenser viser hvor mange lisenser av de enheten eier som ikke har blitt brukt eller åpnet innen de siste 90 dagene.</li>
                                </ul>
                                I tillegg vises en oversikt over hvor stor prosent av aktive, ledige og ubrukte lisenser som enheten eier i form av en donutchart.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className='accordions'>
                        <AccordionSummary 
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                            <p>Hvor kan jeg se hvilke lisenser enheten min eier?</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography id="details">
                                Ved å trykke på knappen &quot;Totale lisenser&quot; åpnes en side med en tabelloversikt over alle 
                                lisenser enheten eier.<br></br><br></br>
                                Tabellen viser informasjon om hvilken bruker lisensen er tilknyttet og brukerens løpenummer.<br></br>
                                I tillegg vises informasjon om lisensens status. Det vil si om lisensen er aktiv i bruk, ubrukt eller ledig.<br></br>
                                En lisens kan også ha staus som <i>frigjort</i> dersom den er blitt lagt til i lisensportalen.<br></br><br></br>
                                Ved å trykke på en spesifikk lisens i denne tabellen kan man se informasjon om når programvaren tilknyttet lisensen sist ble åpnet av brukeren.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className='accordions'>
                        <AccordionSummary 
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                            <p>Hvor kan jeg se hvilke ubrukte lisenser enheten min har?</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography id="details">
                                Ved å trykke på knappen &quot;Ubrukte lisenser&quot; åpnes en side med en tabelloversikt over alle 
                                lisenser enheten eier som aldri er blitt tatt i bruk.<br></br><br></br>
                                Tabellen viser informasjon om hvilken bruker lisensen er tilknyttet og brukerens løpenummer.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className='accordions'>
                        <AccordionSummary 
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                            <p>Hvor kan jeg se hvilke ledige lisenser enheten min har?</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography id="details">
                                Ved å trykke på knappen &quot;Ledige lisenser&quot; åpnes en side med en tabelloversikt over alle 
                                lisenser enheten eier som ikke har blitt bruk eller åpnet av brukeren de siste 90 dagene.<br></br><br></br>
                                Tabellen viser informasjon om hvilken bruker lisensen er tilknyttet og brukerens løpenummer.<br></br><br></br>
                                Ved å trykke på en spesifikk lisens i denne tabellen kan man se tilleggsinformasjon om når lisensen sist ble åpnet.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
            <Grid container id="Columns">
                <p id='SubHeadline'>Lisensportalen</p>
                <Grid container>
                    <Accordion className='accordions'>
                        <AccordionSummary 
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                            <p>Hva er lisensportalen?</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography id="details">

                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className='accordions'>
                        <AccordionSummary 
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                            <p>Hvordan legger jeg ut en lisens til salg i lisensportalen?</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography id="details">
                                
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className='accordions'>
                        <AccordionSummary 
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                            <p>Hvordan kjøper jeg en lisens fra lisensportalen?</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography id="details">
                            
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className='accordions'>
                        <AccordionSummary 
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                            <p>Jeg la med uhell til en lisens i lisensportalen. Hvordan får jeg den tilbake?</p>
                        </AccordionSummary>
                        <AccordionDetails>
                           <Typography id="details">

                           </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
            <Grid container id="Columns">
                <p id='SubHeadline'>Ledertavle</p>
                <Grid container>
                    <Accordion className='accordions'>
                        <AccordionSummary 
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                            <p>Hva er ledertavlen?</p>
                        </AccordionSummary>
                        <AccordionDetails>
                           <Typography id="details">

                           </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className='accordions'>
                        <AccordionSummary 
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                            <p>Hvordan regnes poengene ut i ledertavlen?</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography id="details">

                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className='accordions'>
                        <AccordionSummary 
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                            <p>Hvordan kan øke min enhets plassering i ledertavlen?</p>
                        </AccordionSummary>
                        <AccordionDetails>
                           <Typography id="details">

                           </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className='accordions'>
                        <AccordionSummary 
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                            <p></p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography id="details">

                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </div>
    );
}

export default FAQ;