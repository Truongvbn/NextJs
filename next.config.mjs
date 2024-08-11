/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: [
      'example.com',
      's3.amazonaws.com',
      'www.tuv.com',
      'storage.googleapis.com',
      'media.geeksforgeeks.org',
      'www.webskittersacademy.in',
      'emeritus.org',
      'www.computersciencedegreehub.com',
      'i.ytimg.com',
      'foundr.com',
      'www.bing.com',
      // Thêm bất kỳ domain nào khác mà bạn sử dụng cho hình ảnh
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://35.206.223.219/:path*', // Chuyển tiếp đến API server của bạn
      },
    ];
  },
};

export default nextConfig;
