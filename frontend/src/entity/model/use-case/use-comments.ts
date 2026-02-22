import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../../../common/model/api-response";
import { Comment } from "../entity/comment";

export function useComments(id: string|undefined, page: number) {
    return useQuery({
        queryKey: ['comments', id, page],
        queryFn: async (): Promise<ApiResponse<Array<Comment>>> => {
            const response = await fetch(`/api/articles/${id}/comments?page=${page}&per_page=5`);
            if (!response.ok) {
                throw new Error('network error');
            }

            return response.json();
        },
    });
}
