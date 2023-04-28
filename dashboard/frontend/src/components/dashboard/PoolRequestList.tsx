import React from 'react';
import {Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';


interface OrgRequest {
    id: number; // The ID of the request
    contact_organization: string; // The name of the organization contacted
    application_name: string; // The name of the application being requested
    family: string | null; // The name of the family if applicable
    family_version: string | null; // The version of the family if applicable
    family_edition: string | null; // The edition of the family if applicable
    request: "add" | "remove" | "update"; // The type of request being made
    request_date: string; // The date the request was made
    approved: boolean; // Whether the request has been approved
    completed: boolean; // Whether the request has been completed
    reviewed_by: string | null; // The name of the reviewer if applicable
    reviewed_date: string | null; // The date the request was reviewed if applicable
    spc_id: number; // The SPC ID of the request
    requested_by: string; // The email of the person who requested the change
}

interface PoolRequestListProps {
    poolRequests: OrgRequest[];
    isOwnRequest: boolean;
    isHistory: boolean;
    onApprove: (requestId: number) => void;
    onDisapprove: (requestId: number) => void;
}

const PoolRequestList: React.FC<PoolRequestListProps> = ({
                                                             poolRequests,
                                                             isOwnRequest,
                                                             isHistory = false,
                                                             onApprove,
                                                             onDisapprove
                                                         }) => {
    return (
        <TableContainer component={Paper} sx={{marginTop: 4, maxWidth: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><b>Bruker</b></TableCell>
                        <TableCell><b>Applikasjon </b></TableCell>
                        <TableCell><b>Forespørsel opprettet</b></TableCell>
                        <TableCell><b>Forespørsel</b></TableCell>
                        {isHistory && (<>
                            <TableCell><b>Prossesert av</b></TableCell>
                            <TableCell><b>Prossesert dato</b></TableCell>
                            <TableCell><b>Status</b></TableCell>
                        </>)
                        }
                        {!isOwnRequest && !isHistory && <TableCell><b>Handling</b></TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {poolRequests.map((request) => (
                        <TableRow key={request.id}>
                            <TableCell>{request.requested_by}</TableCell>
                            <TableCell>{request.application_name}</TableCell>
                            <TableCell>{request.request_date}</TableCell>
                            <TableCell>{request.request == "add" ? 'Overfør til pool' : 'Kjøp fra pool'}</TableCell>
                            {isHistory && (
                                <> <TableCell>{request.reviewed_by}</TableCell>
                                    <TableCell>{request.reviewed_date}</TableCell>
                                    <TableCell>{request.approved ? 'Godkjent' : 'Ikke godkjent'}</TableCell>
                                </>


                            )


                            }
                            {!isOwnRequest && !isHistory && (
                                <TableCell>
                                    <Stack direction={"row"} spacing={2}>
                                        <Button
                                            data-testid="approved-test-id"
                                            onClick={() => onApprove(request.id)}
                                            variant="contained"
                                            color="success"
                                        >
                                            Godkjenn
                                        </Button>
                                        <Button
                                            data-testid="disapproved-test-id"
                                            onClick={() => onDisapprove(request.id)}
                                            variant="contained"
                                            color="error"
                                        >
                                            Avslå
                                        </Button>
                                    </Stack>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};


export default PoolRequestList;
