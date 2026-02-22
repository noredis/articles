export type ApiResponse<T> = {
    data: T;
    links?: Links;
};

type Links = {
    next: string|null;
};
