"use client";

import Button from "@/components/ui/button/button";
import ModalWrapper from "@/components/ui/modal/modal-wrapper";
import Link from "next/link";
import { useState } from "react";

interface UrlListModalProps {
  platformURL: string[];
}
const UrlListModal = ({ platformURL }: UrlListModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      title="모임 URL"
      description="모임 URL 목록 모달"
      className="tb:w-[400px] mo:w-[335px]"
      trigger={
        <Button variant="outline" size="sm">
          링크 확인
        </Button>
      }
    >
      <ul className="flex flex-col gap-5 pb-7.5">
        {platformURL.map((url) => (
          <li
            key={url}
            className="typo-body-md-medium truncate text-neutral-500 underline"
          >
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block truncate"
            >
              {url}
            </Link>
          </li>
        ))}
      </ul>
    </ModalWrapper>
  );
};

export default UrlListModal;
