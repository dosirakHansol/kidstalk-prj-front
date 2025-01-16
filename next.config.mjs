/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Single-Page Application (SPA)을 출력합니다.
  distDir: "./build", // 빌드 출력 디렉터리를 `./dist`로 변경합니다.
};

export default nextConfig;
