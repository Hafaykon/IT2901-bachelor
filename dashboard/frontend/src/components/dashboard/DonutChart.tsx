import React from 'react';
import {Box, Card, ButtonBase, CardActionArea,CardContent, Stack, Typography} from '@mui/material';
import {PieChart} from 'react-minimal-pie-chart';
import {useNavigate} from 'react-router-dom';


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
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/licenses/Totale Lisenser`);
    };

    return (
        <div data-testid="donutChart">
            <Card sx={{height: 425, width: 670, mt: 7}}>
                <CardActionArea onClick={handleCardClick}>
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
                                        name: 'Aktiv',
                                        value: infoBoxData.active_licenses ?? 1,
                                        color: '#E1E98B',
                                        key: "test"
                                    },
                                    {
                                        name: 'Ledig',
                                        value: infoBoxData.unused_licenses ?? 1,
                                        color: '#80ADD3',
                                        key: "test2"
                                    },
                                    {
                                        name: 'Ubrukt',
                                        value: infoBoxData.never_used ?? 1,
                                        color: '#80CC9F',
                                        key: "test3"
                                    }
                                ]}

                            />
                        </Stack>
                    </CardContent>
                </CardActionArea>
                <ButtonBase onClick={handleCardClick}/>
            </Card></div>
    );
}

export default DonutChart;