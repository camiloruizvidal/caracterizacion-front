export interface IPagination<T> {
    data:         T[];
    totalItems:   number;
    currentPage:  number;
    totalPages:   number;
    itemsPerPage: number;
}
