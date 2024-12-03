import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/actions';

interface Options {
	filterKey?: string;
}

export const useProducts = ({ filterKey }: Options) => {
	const {
		isLoading,
		isError,
		error,
		data: products,
    isFetching,
	} = useQuery({
		queryKey: ['products', filterKey],
		queryFn: () => getProducts({ filterKey }),
    staleTime: 1000 * 60 * 60
	});

	return {
		error,
		isError,
		isLoading,
		products,
    isFetching,
	};
};
