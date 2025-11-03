import GatheringDetailPage from "@/page/gathering-detail-page";
import { Suspense } from "react";

const GatheringDetailRoute = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="typo-body-md text-neutral-500">Loading...</div>
        </div>
      }
    >
      <GatheringDetailPage />
    </Suspense>
  );
};

export default GatheringDetailRoute;
