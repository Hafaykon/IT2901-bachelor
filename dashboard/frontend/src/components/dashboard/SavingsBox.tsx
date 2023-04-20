import './SavingsBox.css';
import React, {useEffect, useState} from 'react';
import {Card, CardContent, Stack, Tooltip, Typography} from '@mui/material';
import CardOverflow from '@mui/joy/CardOverflow';
import {orgAtom} from '../../globalVariables/variables';
import {useRecoilValue} from 'recoil';
import {fetchPotentialSavings} from '../../api/calls';

export function SavingsBox() {
    const [potentialSavings, setpotentialSavings] = useState<number | undefined>(undefined);
    const organization = useRecoilValue(orgAtom)

    useEffect(() => {
        const fetchData = async () => {
            if (organization) {
                try {
                    const data: string[] | undefined = await fetchPotentialSavings(organization);
                    if (data !== undefined) {
                        const numberData: number = +data;
                        setpotentialSavings(numberData);
                    }
                } catch (error) {
                    console.error('Error fetching potential savings:', error);
                }
            }
        };

        fetchData();
        }, [organization]);

    return (
        <Tooltip title={<h2 style={{fontSize: 15, fontWeight: 'lighter'}}>
                Potensiell sparing viser hvor mye enheten kan spare ved å frigi alle ledige og ubrukte lisenser.
            </h2>} followCursor arrow placement='top'>
            <Card sx={{width: 300, height: 140, borderRadius: 5, backgroundColor: '#002d53'}} data-testid='savingsBox'>
                    <CardOverflow>
                        <CardContent>
                            <Stack direction={'row'}>
                                <Typography id="title">
                                    Potensiell sparing
                                </Typography>
                                {/*  <SavingsIcon fontSize='large' sx={{position: 'absolute', top:20, right:15, color:'pink'}}></SavingsIcon> */}
                            </Stack>
                            <Typography id="numbers">
                                {potentialSavings?.toLocaleString('nb-NO', {useGrouping: true})} kr
                            </Typography>
                        </CardContent>
                    </CardOverflow>
            </Card>
        </Tooltip>
    )
}