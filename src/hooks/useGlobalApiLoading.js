import { useSyncExternalStore } from "react";
import { apiLoadingService } from "@/services/apiLoadingService";

export default function useGlobalApiLoading() {
  const activeRequestCount = useSyncExternalStore(
    apiLoadingService.subscribe,
    apiLoadingService.getSnapshot,
    apiLoadingService.getSnapshot
  );

  return {
    activeRequestCount,
    isLoading: activeRequestCount > 0,
  };
}
