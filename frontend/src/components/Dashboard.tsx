import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axios from 'axios';
import api from '../api/axiosInstance';
import { Local } from '../environment/env';
import { createAuthHeaders } from '../utils/token';

const fetchUserDetail = async () => {
    const token= localStorage.getItem("token")
    if(token){
        const response = await api.get(`${Local.GET_USER_DETAILS}`, createAuthHeaders(token));
        if (response.status !== 200) {
        throw new Error('Failed to fetch user details');
        
      }
      return response.data;

    }
   
};

const fetchLatestWaves = async () => {
      const response = await api.get(`${Local.LATEST_WAVES}`);
      if (response.status !== 200) {
      throw new Error('Failed to fetch user details');
      
    }
    return response.data; 
};

const Dashboard = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['userDetail'],
    queryFn: fetchUserDetail,
  });
  const { data:latestWaves } = useQuery({
    queryKey: ['latestWaves'],
    queryFn: fetchLatestWaves,
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error instanceof Error ? error.message : 'An error occurred'}</div>;

   return (
    <>
      <div className='m-2' >
        {/* Waves */}
        <div>
          <div className="row bg-white p-4 rounded">
          <p className='h5 pb-3' >Making Waves</p>
          
            <div className="col-12 col-sm-6 col-lg-4 mb-3">
              <div className="p-3 border bg-light">Item 1</div>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mb-3">
              <div className="p-3 border bg-light">Item 2</div>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mb-3">
              <div className="p-3 border bg-light">Item 3</div>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mb-3">
              <div className="p-3 border bg-light">Item 4</div>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mb-3">
              <div className="p-3 border bg-light">Item 5</div>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mb-3">
              <div className="p-3 border bg-light">Item 6</div>
            </div>

          </div>
        </div>
        
        {/* Friends */}
        <div className='mt-5 mb-4' >

            <div className="row bg-white p-4 rounded">
              <p className='h5 pb-3' >Friends</p>
                <div className="col-12 col-lg-6 mb-3">
                  <div className="p-3 border bg-light">Item 1</div>
                </div>
                <div className="col-12 col-lg-6 mb-3">
                  <div className="p-3 border bg-light">Item 2</div>
                </div>
                <div className="col-12 col-lg-6 mb-3">
                  <div className="p-3 border bg-light">Item 3</div>
                </div>
                <div className="col-12 col-lg-6 mb-3">
                  <div className="p-3 border bg-light">Item 4</div>
                </div>
                <div className="col-12 col-lg-6 mb-3">
                  <div className="p-3 border bg-light">Item 5</div>
                </div>
                <div className="col-12 col-lg-6 mb-3">
                  <div className="p-3 border bg-light">Item 6</div>
                </div>

            </div>
        </div>
      </div>
      
    </>
  )
};

export default Dashboard;
