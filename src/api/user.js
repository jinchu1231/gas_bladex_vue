import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const loginByUsername = (tenantCode, username, password, type) => request({
  url: '/api/blade-auth/oauth/token',
  method: 'post',
  headers: {
    'Tenant-Code': tenantCode
  },
  params: {
    tenantCode,
    username,
    password,
    grant_type: "password",
    scope: "all",
    type
  }
})

export const refreshToken = (refresh_token) => request({
  url: '/api/blade-auth/oauth/token',
  method: 'post',
  params: {
    refresh_token,
    grant_type: "refresh_token",
    scope: "all",
  }
})

export const getButtons = () => request({
  url: '/api/blade-system/menu/buttons',
  method: 'get'
});

export const getUserInfo = () => request({
  url: baseUrl + '/user/getUserInfo',
  method: 'get'
});

export const getMenu = () => request({
  url: '/api/blade-system/menu/routes',
  method: 'get'
});

export const getTopMenu = () => request({
  url: baseUrl + '/user/getTopMenu',
  method: 'get'
});

export const sendLogs = (list) => request({
  url: baseUrl + '/user/logout',
  method: 'post',
  data: list
})

export const logout = () => request({
  url: baseUrl + '/user/logout',
  method: 'get'
})
