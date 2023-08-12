export const oktaConfig = {
    clientId: '0oaalew55wzktJlCC5d7',
    issuer: 'https://dev-53177510.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
    isAuthenticated: false,
}