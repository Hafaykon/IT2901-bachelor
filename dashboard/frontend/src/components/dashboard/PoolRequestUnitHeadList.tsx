import React from 'react';
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';


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
    onApprove: (requestId: number) => void;
    onDisapprove: (requestId: number) => void;
}

const PoolRequestUnitHeadList: React.FC<PoolRequestListProps> = ({ poolRequests, isOwnRequest, onApprove, onDisapprove }) => {
    return (
        <TableContainer component={Paper} sx={{ marginTop: 4, maxWidth: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Request ID</TableCell>
                        <TableCell>Navn</TableCell>
                        <TableCell>Forespørsel opprettet</TableCell>
                        <TableCell>Forespørsel</TableCell>
                        <TableCell>Handling</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {poolRequests.map((request) => (
                        <TableRow key={request.id}>
                            <TableCell>{request.id}</TableCell>
                            <TableCell>{request.contact_organization}</TableCell>
                            <TableCell>{request.request_date}</TableCell>
                            <TableCell>{request.request}</TableCell>
                            {!isOwnRequest && (
                                <TableCell>
                                    <Button
                                        onClick={() => onApprove(request.id)}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        onClick={() => onDisapprove(request.id)}
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Disapprove
                                    </Button>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PoolRequestUnitHeadList;
