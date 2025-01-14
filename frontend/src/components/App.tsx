import React from 'react';
import { Outlet } from 'react-router-dom';
import Dashboardlayout from './dashboardlayout';
import SideBar from './SideBar';

const Apps = () => {
  return (
    <div className='container-fluid'>
        <div className='row'>
            <Dashboardlayout />
        </div>
        <div className='row'>
            <div className=' col-2'>
                <SideBar/>
            </div>
            <div className='col-10'>
                <Outlet />
            </div>
        </div>
    </div>
  );
};

export default Apps;
