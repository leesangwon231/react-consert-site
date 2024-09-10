import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchContentsDetail = ({id}) => {
  return api.get(`/${id}`);
};

export const useContentsDetailQuery = ({ id }) => {
  return useQuery({
    queryKey: ['contents-detail', id],
    queryFn: () => fetchContentsDetail({id}),
    select: (result) => result.data,
  });
};
