import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../state/store";
import { setIsDataLoading } from "../state/slices/appSlice";

const useDebounce = (value: any, delay: number, showLoader = false) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const { isDataLoading } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    !isDataLoading && showLoader && dispatch(setIsDataLoading(true));
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      showLoader && dispatch(setIsDataLoading(false));
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
