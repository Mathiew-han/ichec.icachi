import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath = rawBasePath && rawBasePath !== "/"
  ? `/${rawBasePath}`.replace(/\/+/g, "/").replace(/\/+$/, "")
  : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fds.cityu.edu.mo",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "fiad.cityu.edu.mo",
        pathname: "/uploads_thumb/**",
      },
      {
        protocol: "https",
        hostname: "ichec.icachi.org",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "sdmda.bupt.edu.cn",
        pathname: "/__local/**",
      },
      {
        protocol: "https",
        hostname: "yong-wang.org",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "jc926.github.io",
        pathname: "/Jie_Cai/**",
      },
      {
        protocol: "https",
        hostname: "shi.buaa.edu.cn",
        pathname: "/_resources/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
