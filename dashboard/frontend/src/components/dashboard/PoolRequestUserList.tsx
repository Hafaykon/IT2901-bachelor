import React from 'react';
import PoolRequestList from "./PoolRequestList";
import {OrgRequest} from "../../Interfaces";

// Defining the props that the UserRequestList component expects
interface UserRequestListProps {
    userRequests: OrgRequest[]; 
    isHistory: boolean; 
}

// Defining the functional component PoolRequestUserList using the React.FC type and the UserRequestListProps interface
const PoolRequestUserList: React.FC<UserRequestListProps> = ({userRequests, isHistory}) => {
    return (
        <PoolRequestList
            poolRequests={userRequests} // Pass the userRequests prop as poolRequests
            isOwnRequest={true} // Set the isOwnRequest prop to true
            isHistory={isHistory} // Pass the isHistory prop
            onApprove={() => {
                console.log('') // Defining a callback function for when a request is approved, which logs an empty string to the console
            }}
            onDisapprove={() => {
                console.log('') // Defining a callback function for when a request is disapproved, which logs an empty string to the console
            }}
        />
    );
};

export default PoolRequestUserList;
