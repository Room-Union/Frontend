import { pretendard } from "@/assets/font/fonts";
import { AlertModal, ToastComponent } from "@/components/ui";
import { initMocks } from "@/mocks";
import { MSWComponent } from "@/providers/msw-component";
import QueryProvider from "@/providers/query-provider";
import "@/styles/globals.css";
import type { Metadata } from "next";

initMocks();

export const metadata: Metadata = {
  title: "집콕",
  description:
    "오프라인 모임이 부담스러운 여러분에게 공간적 / 시간적 제약에 구애받지 않고 참여할 수 있는 온라인 모임을 제공하는 플랫폼",
  icons: {
    icon: "logo-text.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard`}>
        <MSWComponent>
          <QueryProvider>
            {children}
            <AlertModal />
            <ToastComponent />
          </QueryProvider>
        </MSWComponent>
      </body>
    </html>
  );
}
