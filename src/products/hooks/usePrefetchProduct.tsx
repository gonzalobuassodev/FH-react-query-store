import { useQueryClient } from '@tanstack/react-query';
import { productAction } from '..';

export const usePrefetchProduct = () => {
	const queryClient = useQueryClient();

	const prefetchProduct = async (id: string) => {
		await queryClient.prefetchQuery({
			queryKey: ['product', +id],
			queryFn: () => productAction.getProductById(+id),
		});
	};

	return {
		prefetchProduct,
	};
};
