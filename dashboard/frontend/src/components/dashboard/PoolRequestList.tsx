import React from 'react';
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

// Define the OrgRequest interface
interface OrgRequest {
  id: number; // The ID of the request
  contact_organization: string; // The name of the organization contacted
  application_name: string; // The name of the application being requested
  family: string | null; // The name of the family if applicable
  family_version: string | null; // The version of the family if applicable
  family_edition: string | null; // The edition of the family if applicable
  request: 'add' | 'remove' | 'update'; // The type of request being made
  request_date: string; // The date the request was made
  approved: boolean; // Whether the request has been approved
  completed: boolean; // Whether the request has been completed
  reviewed_by: string | null; // The name of the reviewer if applicable
  reviewed_date: string | null; // The date the request was reviewed if applicable
  spc_id: number; // The SPC ID of the request
  requested_by: string; // The email of the person who requested the change
}

// Define the PoolRequestListProps interface
interface PoolRequestListProps {
  poolRequests: OrgRequest[];
  isOwnRequest: boolean;
  isHistory: boolean;
  onApprove: (requestId: number) => void;
  onDisapprove: (requestId: number) => void;
}

// Define the PoolRequestList functional component
const PoolRequestList: React.FC<PoolRequestListProps> = ({
  poolRequests,
  isOwnRequest,
  isHistory = false,
  onApprove,
  onDisapprove
}) => {
  return (
    // Create a TableContainer component with Paper as its base component
    <TableContainer component={Paper} sx={{ marginTop: 4, width: '100%' }}>
      <Table>
        <TableHead>
            {/* Define the table headers */}
          <TableRow>
            <TableCell sx={{ fontFamily: 'Source Sans Pro,sans-serif' }}>
              <b>Lisensnavn </b>
            </TableCell>
            <TableCell sx={{ fontFamily: 'Source Sans Pro,sans-serif' }}>
              <b>Forespørsel opprettet</b>
            </TableCell>
            {!isHistory && (
            <TableCell sx={{ fontFamily: 'Source Sans Pro,sans-serif' }}>
              <b>Forespørsel av</b>
            </TableCell>
            )}
            <TableCell sx={{ fontFamily: 'Source Sans Pro,sans-serif' }}>
              <b>Forespørsel</b>
            </TableCell>
            {/* Added table headers if isHistory is true */}
            {isHistory && (
              <>
                {/* <TableCell sx={{ fontFamily: 'Source Sans Pro,sans-serif' }}>
                  <b>Prossesert av</b>
                </TableCell> */}
                <TableCell sx={{ fontFamily: 'Source Sans Pro,sans-serif' }}>
                  <b>Prossesert dato</b>
                </TableCell>
                <TableCell sx={{ fontFamily: 'Source Sans Pro,sans-serif' }}>
                  <b>Status</b>
                </TableCell>
              </>
            )}
            {/* Added table headers if both isHistory and isOwnRequest is false*/}
            {!isOwnRequest && !isHistory ? (
              <TableCell sx={{ fontFamily: 'Source Sans Pro,sans-serif' }}>
                <b>Handling</b>
              </TableCell>
            ) : (
              <TableCell></TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
            {/* Iterate over poolRequests array and generate TableRow for each request */}
          {poolRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell sx={{ fontFamily: 'Source Sans Pro,sans-serif' }}>
                {request.application_name}
              </TableCell>
              <TableCell sx={{ fontFamily: 'Source Sans Pro,sans-serif' }}>
                {request.request_date}
              </TableCell>
              {!isHistory && (
              <TableCell sx={{ fontFamily: 'Source Sans Pro,sans-serif' }}>
                {request.requested_by}
              </TableCell>
              )}
              <TableCell sx={{ fontFamily: 'Source Sans Pro,sans-serif' }}>
                {request.request == 'add'
                  ? 'Overfør til lisensportalen'
                  : 'Kjøp fra lisensportalen'}
              </TableCell>
              {/* If isHistory is true, include additional cells for the reviewed_by, reviewed_date, and approval status */}
              {isHistory && (
                <>
                  {' '}
                  {/*<TableCell sx={{ fontFamily: 'Source Sans Pro,sans-serif' }}>
                    {request.reviewed_by}
              </TableCell>*/}
                  <TableCell sx={{ fontFamily: 'Source Sans Pro,sans-serif' }}>
                    {request.reviewed_date}
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'Source Sans Pro,sans-serif' }}>
                    {request.approved ? 'Godkjent' : 'Ikke godkjent'}
                  </TableCell>
                </>
              )}
              {/* If isOwnRequest is false and isHistory is false, include a TableCell with approve and disapprove buttons */}
              {!isOwnRequest && !isHistory && (
                <TableCell>
                  <Stack direction={'row'} spacing={2}>
                    <Button
                      onClick={() => onApprove(request.id)}
                      variant="contained"
                      color="success"
                      data-testid="approve-button"
                      sx={{ fontFamily: 'Source Sans Pro,sans-serif' }}>
                      Godkjenn
                    </Button>
                    <Button
                      onClick={() => onDisapprove(request.id)}
                      variant="contained"
                      color="error"
                      data-testid="disapprove-button"
                      sx={{ fontFamily: 'Source Sans Pro,sans-serif' }}>
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
