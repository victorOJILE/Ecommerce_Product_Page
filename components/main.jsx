import ProductImage from './subcomponents/productImage';
import ProductInfo from './subcomponents/productInfo';

export default function Main() {
	
	return (
		<main className="md:p-12 xl:max-w-4xl mx-auto">
			<section className="container grid md:grid-cols-2 lg:items-center gap-8">
				<ProductImage />
				<ProductInfo />
			</section>
		</main>
	);
}