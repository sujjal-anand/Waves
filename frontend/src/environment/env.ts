interface Config {
    BASE_URL: string;
    LOGIN_USER: string;
    CREATE_USER: string;
    ADD_FRIEND_LOGIN:string;
    ADD_FRIEND_SIGNUP:string
    GET_USER_DETAILS:string;
    SECRET_KEY:string
    LATEST_WAVES:string
    INVITE_FRIEND:string
  }
  
  export const Local: Config = {
    BASE_URL: import.meta.env.VITE_BASE_URL,
    LOGIN_USER: import.meta.env.VITE_USER_LOGIN,
    CREATE_USER: import.meta.env.VITE_USER_SIGNUP,
    ADD_FRIEND_LOGIN:import.meta.env.VITE_ADD_FRIEND_LOGIN,
    ADD_FRIEND_SIGNUP:import.meta.env.VITE_ADD_FRIEND_SIGNUP,
    GET_USER_DETAILS:import.meta.env.VITE_GET_USER_DETAILS,
    LATEST_WAVES:import.meta.env.VITE_LATEST_WAVES,
    INVITE_FRIEND:import.meta.env.VITE_INVITE_FRIEND,
    SECRET_KEY:import.meta.env.VITE_SECRET_KEY
  };
  