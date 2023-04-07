import React from 'react';
import PoolRequestUnitHeadList from "./PoolRequestUnitHeadList";
import {OrgRequest} from "../../Interfaces";

interface UserRequestListProps {
    userRequests: OrgRequest[];
}

const PoolRequestUserList: React.FC<UserRequestListProps> = ({userRequests}) => {
    return (
        <PoolRequestUnitHeadList
            poolRequests={userRequests}
            isOwnRequest={true}
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
