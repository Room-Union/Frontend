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
      trigger={
        <Button variant="outline" size="sm">
          링크 보기
        </Button>
      }
    >
      <div className="flex flex-col gap-5">
        {platformURL.map((url) => (
          <ul key={url} className="flex flex-col gap-5">
            <li className="typo-body-md-medium text-neutral-500 underline">
              <Link href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </Link>
            </li>
          </ul>
        ))}
      </div>
    </ModalWrapper>
  );
};

export default UrlListModal;
