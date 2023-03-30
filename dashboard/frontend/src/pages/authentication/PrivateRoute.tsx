import React from 'react';
import {Navigate, Route} from 'react-router-dom';

interface PrivateRouteProps {
    element: React.ReactElement;
    path: string;
    isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({element, path, isAuthenticated}) => {
    return isAuthenticated ? (
        <Route path={path} element={element}/>
    ) : (
        <Navigate to="/Login"/>
    );
};

export default PrivateRoute;
