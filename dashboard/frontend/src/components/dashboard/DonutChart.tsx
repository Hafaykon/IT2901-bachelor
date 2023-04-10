import React from 'react';
import {Box, ButtonBase, Card, CardActionArea, CardContent, Stack, Tooltip, Typography} from '@mui/material';
import {PieChart} from 'react-minimal-pie-chart';
import HelpIcon from '@mui/icons-material/Help';
import CardOverflow from '@mui/joy/CardOverflow';
import {useNavigate} from 'react-router-dom';

const defaultLabelStyle = {
    fontSize: '5px',
    fontFamily: 'Source Sans Pro,sans-serif',
    fill: 'white'
};
type Props = {
    total_licenses: number,
    active_licenses: number,
    never_used: number,
    unused_licenses: number,
    available_licenses: number,
}

function DonutChart(infoBoxData: Props) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/Totale Lisenser`);
    };

    return (
        <div data-testid="donutChart">
            <Card sx={{height: 425, width: 670, mt: 7, borderRadius: 5, ':hover': {boxShadow: 20}}}>
                <CardOverflow>
                    <CardActionArea onClick={handleCardClick}>
                        <CardContent>
                            <Stack direction="row">
                                <Typography sx={{
                                    textAlign: 'left',
                                    fontSize: 27,
                                    padding: 2,
                                    color: '#002d53',
                                    fontFamily: 'Source Sans Pro,sans-serif'
                                }}>
                                    Total oversikt
                                </Typography>
                                <Tooltip title={<h2 style={{fontSize: 15, fontWeight: 'lighter'}}>
                                    Diagrammet viser en oversikt over hvor mange aktive, ubrukte og ledige lisenser som
                                    eies i enheten.
                                </h2>} placement='top' arrow>
                                    <HelpIcon
                                        sx={{position: 'absolute', top: 30, right: 20, color: 'grey', fontSize: 25}}
                                        data-testid="donutchartHelpIcon"></HelpIcon>
                                </Tooltip>
                            </Stack>
                            <Stack direction="row" sx={{paddingLeft: 7}}>
                                <Stack spacing={5} sx={{paddingTop: 7.5, paddingLeft: 3}}>
                                    <Box
                                        sx={{
                                            width: 15,
                                            height: 15,
                                            backgroundColor: '#80cc9f',
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            width: 15,
                                            height: 15,
                                            backgroundColor: '#f9c680',
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            width: 15,
                                            height: 15,
                                            backgroundColor: '#f28f8d',
                                        }}
                                    />
                                </Stack>
                                <Stack spacing={4} sx={{
                                    paddingTop: 7,
                                    paddingLeft: 3,
                                    paddingRight: -50,
                                    color: '#002d53',
                                    fontStyle: 'Source Sans Pro,sans-serif'
                                }}>
                                    <Typography>
                                        Aktiv</Typography>
                                    <Typography>Ledig</Typography>
                                    <Typography>Ubrukt</Typography>

                                </Stack>
                                <PieChart
                                    viewBoxSize={[140, 140]}
                                    center={[70, 40]}
                                    radius={40}
                                    label={({dataEntry}) => `${Math.round((dataEntry.value / (infoBoxData.total_licenses ?? 1)) * 100)}%`}
                                    labelStyle={defaultLabelStyle}
                                    labelPosition={80}
                                    paddingAngle={1}
                                    lineWidth={40}


                                    data={[
                                        {
                                            name: 'Aktiv',
                                            value: infoBoxData.active_licenses ?? 1,
                                            color: '#80cc9f',
                                            key: "test"
                                        },
                                        {
                                            name: 'Ledig',
                                            value: infoBoxData.unused_licenses ?? 1,
                                            color: '#f9c680',
                                            key: "test2"
                                        },
                                        {
                                            name: 'Ubrukt',
                                            value: infoBoxData.never_used ?? 1,
                                            color: '#f28f8d',
                                            key: "test3"
                                        }
                                    ]}
                                />
                            </Stack>
                        </CardContent>
                    </CardActionArea>
                    <ButtonBase onClick={handleCardClick}/>
                </CardOverflow>
            </Card></div>
    );
}

export default DonutChart;