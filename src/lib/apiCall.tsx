import { toast } from "../components/ui/use-toast";
import ToastError from "../components/utils/toastVariant/TostError";
import ToastSuccess from "../components/utils/toastVariant/TostSuccess";
import { handleError } from "./handlingErrors";

export const buildApiUrl = (
  boardKeys: string[],
  jobsPerPage: number,
  currentPage: number
) => {
  const boardKeysParam = encodeURIComponent(JSON.stringify(boardKeys));
  return `https://api.hrflow.ai/v1/jobs/searching?board_keys=${boardKeysParam}&limit=${jobsPerPage}&page=${currentPage}`;
};

export const handleApiResponse = async (response: any) => {
  if (!response.ok) {
    toastError(response.status);
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  toastSuccess();
  return await response.json();
};

export const toastError = (status: number) => {
  toast({
    variant: "error",
    duration: 5000,
    action: (
      <ToastError
        title={`Error code: ${status}`}
        message={handleError(status)}
      />
    ),
  });
};

export const toastSuccess = () => {
  toast({
    variant: "success",
    duration: 2000,
    action: (
      <ToastSuccess
        title="Success"
        message="Jobs have been fetched correctly"
      />
    ),
  });
};
