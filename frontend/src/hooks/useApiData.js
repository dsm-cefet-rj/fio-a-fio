import { useQuery } from '@tanstack/react-query';

export const useApiData = (key, queryFn, options = {}) => useQuery({
  queryKey: [key],
  queryFn,
  ...options,
});
