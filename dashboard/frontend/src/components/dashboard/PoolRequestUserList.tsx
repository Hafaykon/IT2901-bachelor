import React from 'react';
import PoolRequestList from "./PoolRequestList";
import {OrgRequest} from "../../Interfaces";

interface UserRequestListProps {
    userRequests: OrgRequest[];
    isHistory: boolean;
}

const PoolRequestUserList: React.FC<UserRequestListProps> = ({userRequests, isHistory}) => {
    return (
        <PoolRequestList
            poolRequests={userRequests}
            isOwnRequest={true}
            isHistory={isHistory} // Pass the isHistory prop
            onApprove={() => {
                console.log('')
            }}
            onDisapprove={() => {
                console.log('')
            }}
        />
    );
};

export default PoolRequestUserList;
