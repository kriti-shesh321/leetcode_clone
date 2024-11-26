import React from 'react';
import HashLoader from 'react-spinners/HashLoader';

const override = {
    display: 'block',
    margin: '100px auto',
}

const Spinner = ({ loading }) => {
    return (
        <HashLoader
            color='violet'
            loading={loading}
            cssOverride={override}
            size={100}
        />
    )
}

export default Spinner;