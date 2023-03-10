import React from 'react';
import {Box, Card, CardContent, Stack, Typography} from '@mui/material';
import {PieChart} from 'react-minimal-pie-chart';


const defaultLabelStyle = {
    fontSize: '4px',
    fontFamily: 'sans-serif',
    fill: 'white'
};
type Props = {
    total_licenses: number,
    active_licenses: number,
    never_used: number,
    unused_licenses: number
}

function DonutChart(infoBoxData: Props) {
    return (
        <div data-testid="donutChart">
            <Card sx={{height: 425, width: 670, mt: 7}}>
                <CardContent>
                    <Typography sx={{
                        textAlign: 'left',
                        fontSize: 25,
                        padding: 2,
                        color: '#002d53',
                        fontStyle: 'Source Sans Pro,sans-serif'
                    }}>
                        Total oversikt
                    </Typography>
                    <Stack direction="row" sx={{paddingLeft: 7}}>
                        <Stack spacing={5} sx={{paddingTop: 7.5, paddingLeft: 3}}>
                            <Box
                                sx={{
                                    width: 10,
                                    height: 10,
                                    backgroundColor: '#63849c',
                                    '&:hover': {
                                        backgroundColor: 'primary.main',
                                        opacity: [0.9, 0.8, 0.7],
                                    },
                                }}
                            />
                            <Box
                                sx={{
                                    width: 10,
                                    height: 10,
                                    backgroundColor: '#3172ce',
                                    '&:hover': {
                                        backgroundColor: 'primary.main',
                                        opacity: [0.9, 0.8, 0.7],
                                    },
                                }}
                            />
                            <Box
                                sx={{
                                    width: 10,
                                    height: 10,
                                    backgroundColor: '#0d90ff',
                                    '&:hover': {
                                        backgroundColor: 'primary.main',
                                        opacity: [0.9, 0.8, 0.7],
                                    },
                                }}
                            />
                        </Stack>
                        <Stack spacing={4} sx={{
                            paddingTop: 6,
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
                                    title: 'Aktiv',
                                    value: infoBoxData.active_licenses ?? 1,
                                    color: '#63849c',
                                    key: "test"
                                },
                                {
                                    title: 'Ledig',
                                    value: infoBoxData.unused_licenses ?? 1,
                                    color: '#3172ce',
                                    key: "test2"
                                },
                                {
                                    title: 'Ubrukte',
                                    value: infoBoxData.never_used ?? 1,
                                    color: '#0d90ff',
                                    key: "test3"
                                }
                            ]}

                        />
                    </Stack>
                </CardContent>
            </Card></div>
    );
}

export default DonutChart;