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
                    lisensportalen, og ledertavlen. 
                </p>
            </Grid>
            <Grid container id="Columns">
                <p className='SubHeadline'>Lisensdashboard</p>
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
                <p className='SubHeadline'>Lisensportalen</p>
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
                                Lisensportalen er en oversikt over alle lisenser som din enhet kan kjøpe fra andre enheter. 
                                Det er også her lisenser din enhet har lagt til salg havner. <br></br><br></br>
                                Lisensportalen skal oppfordre til gjenbruk av lisenser heller enn å kjøpe inn nye når det finnes mange 
                                ledige og ubrukte lisenser innenfor Trondheim Kommune. <br></br><br></br>
                                Bare lisensansvarlige innen en enhet har mulighet til å kjøpe en lisens fra lisensportalen, og det er bare
                                de som kan legge til en lisens fra enheten til lisensportalen for salg. Alle brukere kan velge å sende en forespørsel om å kjøpe 
                                eller selge en lisens som er tilkoblet deres PC eller bruker. <br></br><br></br>
                                I første omgang kan man kjøpe en enkeltlisens fra en annen enhet til samme pris som ved innkjøp. <br></br>
                                Senere er det planlagt at dette skal endres til å kunne kjøpe en lisens fra lisensportalen til en billigere pris enn innkjøpspris.
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
                                Lisensansvarlige kan følge disse stegene for å frigjøre en lisens:
                                <ol>
                                    <li>Gå inn på oversikten over totale lisenser i enheten.</li>
                                    <li>Finn og trykk på den lisensen som ønskes å selges gjennom lisensportalen.</li>
                                    <li>Trykk på knappen hvor det står &quot;Legg i lisensportalen&quot;.</li>
                                </ol>
                                Lisensen ligger da tilgjengelig for kjøp i lisensportalen hvor andre enheter kan kjøpe den. 
                                <br></br><br></br>
                                Vanlige brukere kan føge de samme stegene som nevnt ovenfor.
                                <br></br>
                                Da blir en forespørsel om å frigjøre lisensen blir sendt til den lisensansvarlige i enheten og de har mulighet til å godkjenne
                                eller avslå denne forespørselen. Dersom forespørselen blir godkjent, blir lisensen automatisk lagt til i lisensportalen. 
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
                                Lisensansvarlige kan følge disse stegene for å kjøpe en lisens:
                                <ol>
                                    <li>Gå inn på lisensportalen og søk opp navnet på lisensen du ønsker å kjøpe.</li>
                                    <li>Trykk på lisensen du ønsker å kjøpe for å se mer informasjon om den. </li>
                                    <li>Trykk på handlekurven til den lisensen du ønsker å kjøpe.</li>
                                    <li>Du vil nå få opp en melding dersom din enhet allerede eier en ledig eller ubrukt lisens av denne typen. 
                                        Da kan man velge å kjøpe lisensen uansett, eller avbryte kjøpet.</li>
                                </ol>
                                Når kjøpet gjennomføres blir lisensen lagt til i enhetens Lisensdashboard.
                                <br></br><br></br>
                                Vanlige brukere kan følge disse stegene for å kjøpe en lisens:  
                                <ol>
                                    <li>Gå inn på lisensportalen og søk opp navnet på lisensen du ønsker å kjøpe.</li>
                                    <li>Trykk på lisensen du ønsker å kjøpe for å se mer informasjon om den. </li>
                                    <li>Trykk på handlekurven til den lisensen du ønsker å kjøpe.</li>
                                    <li>Du vil få opp melding om at lisensansvarlig i enheten har mottat forespørsel om kjøp av denne lisensen.</li>
                                </ol>
                                Når en slik forespørsel om kjøp blir sendt, vil lisensansvarlig godkjenne eller avslå forespørselen.<br></br> 
                                Dersom forespørselen godkjennes vil lisensen automatisk overføres til brukeren som sendte forespørselen om kjøp.
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
                            En lisensansvarlig bruker kan enkelt få tilbake en lisens som ikke er blitt kjøpt fra lisensportalen. <br></br>
                            <ol>
                                <li>Gå inn på oversikt over totale lisenser i enheten</li>
                                <li>Finn lisensen som ble med uhell lagt i lisensportalen. Den vil ha status som frigjort.</li>
                                <li>Trykk på lisensen for å se mer informasjon.</li>
                                <li>Trykk på knappen hvor det står &quot;Fjern fra lisensportal&quot;. Lisensen blir da automatisk fjernet fra lisensportalen.</li>
                            </ol><br></br>
                            En annen måte å få tilbake en lisens på er å kjøpe den tilbake fra lisensportalen slik man ville gjort med andre lisenser.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
            <Grid container id="Columns">
                <p className='SubHeadline'>Ledertavle</p>
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
                            Ledertavlen sammenligner alle enheter i Trondheim Kommune basert på hvor stor andel av alle lisensene eid 
                            i enheten er aktive. <br></br>
                            Det betyr at dersom din enhet har en liten prosentandel ubrukte og ledige lisenser, vil enheten ligge høyt oppe på ledertavlen.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className='accordions'>
                        <AccordionSummary 
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                                <p>Hvordan kan jeg øke min enhets plassering i ledertavlen?</p>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography id="details">
                            Du kan øke din enhets plassering i ledertavlen ved å minimere antall ledige og ubrukte lisenser din enhet eier. <br></br>
                            Den enkleste måten å gjøre dette på er å legge disse lisensene ut til salg i lisensportalen.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </div>
    );
}

export default FAQ;