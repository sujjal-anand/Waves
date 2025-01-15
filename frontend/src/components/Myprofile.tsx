import { useQuery } from '@tanstack/react-query';
import React from 'react'
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

const Myprofile = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['userDetail'],
        queryFn: fetchUserDetail,
      });

      if (isLoading) return <div>Loading...</div>;
      if (isError) return <div>Error: {error instanceof Error ? error.message : 'An error occurred'}</div>
  return (
    <div>Myprofile</div>
  )
}

export default Myprofile