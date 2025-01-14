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

const Dashboard = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['userDetail'],
    queryFn: fetchUserDetail,
  });
console.log(data)
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error instanceof Error ? error.message : 'An error occurred'}</div>;

  return (
    <div>
          <h2>User Details</h2>
<h2>friends</h2>
  {data?.friends?.map((friend: any) => (
    <p key={friend.id}>
      {friend.firstName} {friend.lastName}
    </p>
  ))}
</div>
  );
};

export default Dashboard;
