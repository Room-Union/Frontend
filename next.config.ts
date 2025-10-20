import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 이미지 외부 호스트 허용
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "roomunion-bucket.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
  // 터보팩 설정
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              svgo: true,
            },
          },
        ],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
