import httpProxyMiddleware from 'next-http-proxy-middleware';

export default function handler(req, res) {
  return httpProxyMiddleware(req, res, {
    target: 'http://35.206.223.219',
    pathRewrite: {
      '^/api': '', // remove /api prefix
    },
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
}