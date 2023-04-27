import React from 'react';
import HelpIcon from '@mui/icons-material/Help';
import {useNavigate} from 'react-router-dom';
import {Box, Card, Stack, Tooltip, Typography} from '@mui/material';
import {Chart, ReactGoogleChartEvent} from 'react-google-charts';


type Props = {
    total_licenses: number,
    active_licenses: number,
    never_used: number,
    unused_licenses: number,
    available_licenses: number,
    width?: number;
    height?: number;
    title?: string,
    showInformation?: boolean,  
}


function DonutChart(infoBoxData: Props) {
    const navigate = useNavigate();
    const {width = 670, height = 425} = infoBoxData;
    const {title = 'Total oversikt', showInformation = true} = infoBoxData;


    const chartEvents: ReactGoogleChartEvent[] = [
        {
            eventName: "select",
            callback: ({chartWrapper}) => {
                const chart = chartWrapper.getChart();
                const selection = chart.getSelection();
                if (selection.length === 1) {
                    const [selectedItem] = selection;
                    const dataTable = chartWrapper.getDataTable();
                    let column = selectedItem.column;
                    if (column === null || column === undefined) {
                        column = 0;
                    }
                    const row = selectedItem.row;
                    console.log("You selected:", {
                        row,
                        column,
                        value: dataTable?.getValue(row, column),
                    });
                    const value = dataTable?.getValue(row, column)
                    if (value === 'Aktiv') {
                        navigate(`/Totale Lisenser`);

                    }
                    if (value === 'Ledig') {
                        navigate(`/Ledige Lisenser`);
                    }
                    if (value === 'Ubrukt') {
                        navigate(`/Ubrukte Lisenser`);
                    }

                }
            },
        },
    ];

    const data = [
        ['Type', 'Value'],
        ['Aktiv', infoBoxData.active_licenses ?? 1],
        ['Ledig', infoBoxData.unused_licenses ?? 1],
        ['Ubrukt', infoBoxData.never_used ?? 1],
    ];
    const options = {
        pieHole: 0.4,
        legend: 'none',
        pieSliceText: 'percentage',
        colors: ['#80cc9f', '#f9c680', '#f28f8d'],
    };


    return (
        <Card
            id={"donutChart"}
            data-testid='donutChart'
            sx={{
                height: height,
                width: width,
                mt: 7,
                borderRadius: 5,
            }}
        >
            <Stack direction="column" sx={{height: "100%"}}>
                <Stack direction="row" alignItems="center" sx={{justifyContent: 'space-between'}}>
                    <Typography
                        sx={{
                            textAlign: 'left',
                            fontSize: 27,
                            padding: 2,
                            color: '#002d53',
                            fontFamily: 'Source Sans Pro,sans-serif',
                        }}
                    >
                        {title}
                    </Typography>
                    {showInformation &&
                        <Tooltip
                            title={
                                <h2 style={{fontSize: 15, fontWeight: 'lighter'}}>
                                    Diagrammet viser en oversikt over hvor mange aktive, ubrukte og ledige
                                    lisenser som eies i enheten.
                                </h2>
                            }
                            placement="top"
                            arrow
                        >
                            <HelpIcon
                                sx={{color: 'grey', fontSize: 25, marginRight: 2, marginTop: 2}}
                                data-testid="donutchartHelpIcon"
                            ></HelpIcon>
                        </Tooltip>
                    }
                </Stack>

                <Stack direction="row" sx={{paddingLeft: 7, height: "100%", width: "100%", alignItems: 'center'}}>
                    <Stack spacing={5} sx={{paddingTop: 7.5, paddingLeft: 3, height: "100%"}}>
                        <Box sx={{width: 15, height: 15, backgroundColor: '#80cc9f'}}/>
                        <Box sx={{width: 15, height: 15, backgroundColor: '#f9c680'}}/>
                        <Box sx={{width: 15, height: 15, backgroundColor: '#f28f8d'}}/>
                    </Stack>
                    <Stack
                        spacing={4}
                        sx={{
                            paddingTop: 7,
                            paddingLeft: 3,
                            paddingRight: -50,
                            color: '#002d53',
                            fontStyle: 'Source Sans Pro,sans-serif',
                            height: "100%",
                        }}
                    >
                        <Typography>Aktiv</Typography>
                        <Typography>Ledig</Typography>
                        <Typography>Ubrukt</Typography>
                    </Stack>

                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="100%"
                        data={data}
                        options={options}
                        chartEvents={chartEvents}
                        style={{cursor: 'pointer'}}
                    />

                </Stack>
            </Stack>
        </Card>
    )


}

export default DonutChart;