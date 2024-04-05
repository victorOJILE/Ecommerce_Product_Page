import { AppContext } from '@/context';
import { useState, useRef, useMemo } from 'react';

export default function Header() {
	const [openNav, setOpenNav] = useState(false);
	const nav = useRef(null);
	const prefersReducedMotion = window.matchMedia('prefers-reduced-motion').matches;

	function handleClick() {
		if(window.innerWidth >= 768) return;
		if(!openNav) {
			setOpenNav(true);
			if(prefersReducedMotion) {
				nav.current.classList.toggle('opacity-0');
			} else {
				setTimeout(() => {
					nav.current.classList.toggle('opacity-0');
				}, 100);
			}
		} else {
			nav.current.classList.toggle('opacity-0');
			
			if(prefersReducedMotion) {
				setOpenNav(false);
			} else {
				setTimeout(() => setOpenNav(false), 300);
			}
		}
	}
	
	return (
		<header>
			<div className="xl:max-w-4xl xl:mx-auto py-5 mx-5 flex-ac justify-between md:mx-12 md:p-0">
				<div className="flex-ac">
					<div className="md:hidden mr-4 cursor-pointer" tabIndex="0" onClick={handleClick}>
						<svg width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M16 12v3H0v-3h16Zm0-6v3H0V6h16Zm0-6v3H0V0h16Z" fill="#69707D" fillRule="evenodd"/></svg>
					</div>
					<a href="#">
						<img className="w-32 mb-1" src="logo.svg" alt="" />
					</a>
				</div>
				<div className="flex-grow flex-ac justify-end">
					<div className={"navBar flex-grow" + (openNav ? "" : " hidden")} onClick={handleClick}>
						<nav ref={nav} className="opacity-0" style={{ transition: "opacity 0.4s" }} onClick={(e) => e.stopPropagation()}>
							<div className="md:hidden" id="closeNavBar" onClick={handleClick}>
								<svg width="14" height="15" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#69707D" fillRule="evenodd"/></svg>
							</div>
							<ul>
								<li>
									<a href="#">Collections</a>
								</li>
								<li>
									<a href="#">Men</a>
								</li>
								<li>
									<a href="#">Women</a>
								</li>
								<li>
									<a href="#">About</a>
								</li>
								<li>
									<a href="#">Contact</a>
								</li>
							</ul>
						</nav>
					</div>
					<CartDialog>
						<span className="overflow-hidden rounded-full">
							<img className="w-6 h-6 md:w-12 md:h-12" src="image-avatar.png" alt="" />
						</span>
					</CartDialog>
				</div>
			</div>
		</header>
	);
}

function CartDialog({ children }) {
	const [openCart, setOpenCart] = useState(false);
	let ctx = AppContext();
	let cart = ctx.data.cart;

	const nbf = useMemo(() => 
		new Intl.NumberFormat('en-US', { style: "currency", currency: "USD" })
	, []);

	function removeProduct(e) {
		let id = e.currentTarget.dataset.id;

		ctx.setData(prev => ({
			...prev,
			cart: prev.cart.filter(product => product.pid != id)
		}))
	}

	return (
		<>
			<div className="flex-ac">
				<span tabIndex="0" className="mr-5 relative cursor-pointer" onClick={() => setOpenCart(prev => !prev)}>
					<span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-orange paleOrange flex-ac justify-center h-4 px-1 rounded-full font-bold" style={{ fontSize: "0.65rem" }}>{cart.length}</span>
					<svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
						<path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="currentColor" fillRule="nonzero" />
					</svg>
				</span>
				{children}
			</div>
			 { openCart && (
				<div className="cartDialog">
					<div className="bg-white rounded-lg mx-auto">
						<h2 className="p-4" style={{ borderBottom: "1px solid lightgray" }}>
							<strong>Cart</strong>
						</h2>
						<div className="grayText p-6">
							{ cart.length < 1 ? (
								<div className="h-36 flex-ac justify-center">
									<strong>Your cart is empty</strong>
								</div>
							): (
								<>
									{
										cart.map((product, index) => (
											<div key={index} className="flex-ac mb-6" aria-label="Product details">
												<div className="w-12 rounded overflow-hidden">
													<img src={product.imgUrls[0].thumbnail} alt="Product image" />
												</div>
												<div className="flex-grow text-sm px-3">
													<h3 className="truncate">{product.name}</h3>
													<div>
														<span aria-label="Product price">{product.price}</span> x
														<span aria-label="Product quantity"> {product.quantity} </span>
														<strong className="text-base text-black">{nbf.format(product.price * product.quantity)}</strong>
													</div>
												</div>
												<span 
													data-id={product.pid} 
													className="hover:bg-gray-200 cursor-pointer" 
													aria-label="Delete product from cart"
													onClick={removeProduct}
													>
													<svg width="14" height="16" xmlns="http://www.w3.org/2000/svg">
														<path fill="#C3CAD9" d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" />
													</svg>
												</span>
											</div>
										))
									}
									<button type="button" className="block w-full addToCart rounded-lg h-12 text-center text-sm"><strong>Checkout</strong></button>
								</>
							)}
						</div>
					</div>
				</div>
			 )}
		</>
	);
}