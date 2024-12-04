import { Button, Image, Input, Textarea } from '@nextui-org/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useCreateProduct } from '../hooks/useCreateProduct';

interface FormInput {
	title: string;
	price: number;
	category: string;
	image: string;
	description: string;
}

export const NewProduct = () => {

  const { productMutation } = useCreateProduct();

	const { control, handleSubmit, watch } = useForm<FormInput>({
		defaultValues: {
			title: 'Teclado',
			price: 150.02,
			category: "men's clothing",
			image: 'https://img.freepik.com/vector-gratis/dibujos-animados-teclado_78370-505.jpg?w=360',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore cum rerum magni pariatur consectetur nihil provident numquam explicabo odit, aut illum velit perferendis debitis incidunt a vitae dolorum nostrum iusto.',
		},
	});

  const newImage = watch('image');
 

	const onSubmit: SubmitHandler<FormInput> = (data) => {
    productMutation.mutate(data);
	};

	return (
		<div className="w-full flex-col">
			<h1 className="text-2xl font-bold">Nuevo producto</h1>

			<form className="w-full" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex justify-around items-center">
					<div className="flex-col w-[500px]">
						<Controller
							control={control}
							name="title"
							rules={{ required: true }}
							render={({ field }) => (
								<Input
									className="mt-2"
									type="text"
									label="Titulo del producto"
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>

						<Controller
							control={control}
							name="price"
							rules={{ required: true }}
							render={({ field }) => (
								<Input
									className="mt-2"
									type="text"
									label="Precio del producto"
									value={field.value?.toString()}
									onChange={(e) => field.onChange(+e.target.value)}
								/>
							)}
						/>

						<Controller
							control={control}
							name="image"
							rules={{ required: true }}
							render={({ field }) => (
								<Input
									className="mt-2"
									type="text"
									label="Url del producto"
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>

						<Controller
							control={control}
							name="description"
							rules={{ required: true }}
							render={({ field }) => (
								<Textarea
									className="mt-2"
									label="Descripcion del producto"
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>

						<Controller
							control={control}
							name="category"
							rules={{ required: true }}
							render={({ field }) => (
								<select 
                value={field.value}
                onChange={field.onChange}
                className="rounded-md p-3 mt-2 bg-gray-800 w-full">
									<option value="men's clothing">
										Men's clothing
									</option>
									<option value="women's clothing">
										Women's clothing
									</option>
									<option value="jewelery">Jewelery</option>
									<option value="electronics">
										Electronics
									</option>
								</select>
							)}
						/>

						<br />
						<Button type="submit" 
            isDisabled={productMutation.isPending}
            className="mt-2" color="primary">
							{
                productMutation.isPending ? "Creando..." : "Crear"
              }
						</Button>
					</div>

					<div
						className="bg-white rounded-2xl p-10 flex items-center"
						style={{
							width: '500px',
							height: '600px',
						}}
					>
						<Image src={newImage} />
					</div>
				</div>
			</form>
		</div>
	);
};
