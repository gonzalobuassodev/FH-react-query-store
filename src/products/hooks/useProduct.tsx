import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../services/actions';

interface Options {
	id: number
}

export const useProduct = ({id}: Options) => {
	const {
		isLoading,
		isError,
		error,
		data: product,
		isFetching,
	} = useQuery({
		queryKey: ['product', id],
		queryFn: () => getProductById(id),
		staleTime: 1000 * 60 * 60,
	});

	return {
		isLoading,
		isError,
		error,
		product,
		isFetching,
	};
};
