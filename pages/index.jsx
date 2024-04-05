import { useState } from 'react';
import { AppProvider } from '@/context';
import Header from '@/components/header';
import Main from '@/components/main';

export default function App() {
	const [cart, setCart] = useState([]);
	const product = useState({
		name: "Fall Limited Edition Sneakers",
		description: `These low-profile sneakers are your perfect casual wear companion. Featuring a 
		durable rubber outer sole, they’ll withstand everything the weather can offer.`,
		category: "Sneaker Company",
		price: 125,
		oldPrice: 250,
		currency: 'USD',
		pid: "q4839q98489b9q84v8487t8yq8978%",
		imgUrls: [
			{
				main: "image-product-1.jpg",
				thumbnail: "image-product-1-thumbnail.jpg"
			},
			{
				main: "image-product-2.jpg",
				thumbnail: "image-product-2-thumbnail.jpg"
			},
			{
				main: "image-product-3.jpg",
				thumbnail: "image-product-3-thumbnail.jpg"
			},
			{
				main: "image-product-4.jpg",
				thumbnail: "image-product-4-thumbnail.jpg"
			}
		]
	})[0];
	
	return (
		<AppProvider.Provider value={{ cart, setCart, product }}>
			<Header />
			<Main />
		</AppProvider.Provider>
	);
}
	
		