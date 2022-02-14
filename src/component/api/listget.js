import axios from 'axios';
import React from 'react';

const Listget = async() =>  {
    const listGet = await axios.get('/api/boards')
    .then(data => {
        return (data.data);
    });
};

export default Listget;