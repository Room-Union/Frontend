import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
