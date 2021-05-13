import React from 'react';
import Navbar from '../../components/Navbar/Navbar';

const Home = ({children}) =>{
    return(
        <div>
            <Navbar/>
            <h1>Home Page</h1>
        </div>
    )
}

export default Home;