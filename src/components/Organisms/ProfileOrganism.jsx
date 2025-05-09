import React from 'react';
import { Fetcher } from '../util/Fetcher/index.js';
import { JsonViewer } from '../util/JsonViewer/index.js';

const ProfileOrganism = ({ apiUrl, path }) => {
    return(
        <div>
            <h2>Profile</h2>
            <Fetcher apiUrl={apiUrl} path={path}>
                <JsonViewer/>
            </Fetcher>
        </div>
    );
};

export default ProfileOrganism;
