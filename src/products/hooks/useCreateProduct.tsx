import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, productAction } from '..';

export const useCreateProduct = () => {
	const queryClient = useQueryClient();

	const productMutation = useMutation({
		mutationKey: ['create-product'],
		mutationFn: productAction.createProduct,

		onMutate: (newProduct) => {
			//! Optimistic Product

			const optimisticProduct = {
				id: Math.random(),
				...newProduct,
			};
			console.log('Mutando optimistic', optimisticProduct);

			queryClient.setQueryData<Product[]>(
				['products', { filterKey: optimisticProduct.category }],
				(old) => {
					if (!old) return [optimisticProduct];

					return [...old, optimisticProduct];
				},
			);

			return { optimisticProduct };
		},

		onSuccess: (newProduct, variables, context) => {
			console.log(newProduct, variables, context);

			queryClient.removeQueries({
				queryKey: ['product', context.optimisticProduct.id],
			});

			queryClient.setQueryData<Product[]>(
				['products', { filterKey: newProduct.category }],
				(old) => {
					if (!old) return [newProduct];

					return old.map((cacheProduct) => {
						return cacheProduct.id === context.optimisticProduct.id
							? newProduct
							: cacheProduct;
					});

					// return [...old, newProduct];
				},
			);

			//! InvalidateQueries
			// queryClient.invalidateQueries({
			// 	queryKey: ['products', { filterKey: newProduct.category }],
			// });
		},
		onError: (error, variables, context) => {
			console.error('Error al crear el producto:', error);
			// Manejo de errores opcional, como mostrar un mensaje al usuario

			queryClient.removeQueries({
				queryKey: ['product', context?.optimisticProduct.id],
			});

			queryClient.setQueryData<Product[]>(
				['products', { filterKey: variables.category }],
				(old) => {
					if (!old) return [];

					return old.filter(
						(product: Product) =>
							product.id !== context?.optimisticProduct.id,
					);
				},
			);
		},
	});

	return {
		productMutation,
	};
};
