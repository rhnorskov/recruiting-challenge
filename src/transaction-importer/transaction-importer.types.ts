export interface TransactionApiItem {
  id: string;
  userId: string;
  createdAt: string;
  type: string;
  amount: number;
}

export interface TransactionApiMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface TransactionApiResponse {
  items: TransactionApiItem[];
  meta: TransactionApiMeta;
}
