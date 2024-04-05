import { AppContext } from "@/context";
import { useState, useEffect, useMemo } from "react";

export default function ProductInfo() {
  let { product, cart, setCart } = AppContext();
	const [cartInfo, setCartInfo] = useState(cart.find(e => e.pid == product.pid) || { quantity: 1 });
	
	function handleChange(config) {
		setCartInfo(config);
	}

	function addToCart() {
		let productInCart = cart.findIndex(e => e.pid == product.pid);
		
		if(productInCart == -1) {
			setCart(prev => [...prev, { ...cartInfo, ...product }]);
		} else {
			setCart(prev => {
				let cart = [...prev];
				cart[productInCart] = { ...cartInfo, ...product };

				return cart;
			});
		}
	}
	
  useEffect(() => {
		if(cart.findIndex(e => e.pid == product.pid) !== -1) addToCart();
  }, [cartInfo]);
  
	const nbf = useMemo(() => 
		new Intl.NumberFormat('en-US', { style: "currency", currency: "USD" })
	, []);

  return product && (
    <div className="p-5">
      <small className="font-mono orange">
        <strong>{product.category}</strong>
      </small>
      <h1 className="text-2xl">
        <strong>{product.name}</strong>
      </h1>
      <p className="text-sm leading-normal grayText pt-3">{product.description}</p>
      <div className="flex-ac flex-wrap justify-between py-6 font-bold">
        <div className="flex-grow flex-ac md:w-full">
          <span className="text-2xl" aria-label="Product price">
            {nbf.format(product.price)}
          </span>
          { product.oldPrice && (
						<span className="text-sm bg-paleOrange orange px-2 mx-2 rounded">
							{100/(product.oldPrice/product.price)}%
          	</span>
					)}
        </div>
        <div className="grayishBlue text-xs">
          <del>{nbf.format(product.oldPrice)}</del>
        </div>
      </div>
      <div className="grid sm:grid-cols-12 gap-4">
        <div className="sm:col-span-5 rounded-lg bg-lightGrayishBlue h-12">
          <div className="h-full flex items-stretch justify-between">
            <span 
              tabIndex="0"
							className="w-12 hover:bg-gray-200 rounded cursor-pointer flex-ac justify-center"
							onClick={() => handleChange({ quantity: cartInfo.quantity <= 1 ? 1 : cartInfo.quantity -1 })}
							>
              <svg width="12" height="4" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#FF7E1B"
                  d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z"
                />
              </svg>
            </span>
            <input
              className="w-3/5 font-bold text-center bg-transparent outline-none"
              type="number"
              placeholder="0"
              value={cartInfo.quantity}
							min="1"
							onChange={(e) => handleChange({ quantity: e.target.value })}
            />
            <span 
              tabIndex="0"
							className="w-12 hover:bg-gray-200 rounded cursor-pointer flex-ac justify-center"
							onClick={() => handleChange({ quantity: cartInfo.quantity +1 })}
							>
              <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#FF7E1B"
                  d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z"
                />
              </svg>
            </span>
          </div>
        </div>
        <button 
          type="button"
          tabIndex="0"
					className="sm:col-span-7 addToCart rounded-lg h-12 flex-ac justify-center text-sm"
					onClick={addToCart}
					>
          <svg
            style={{ transform: "scale(0.8)" }}
            width="22"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
              fill="currentColor"
              fillRule="nonzero"
            />
          </svg>
          <strong className="ml-3">Add to cart</strong>
        </button>
      </div>
    </div>
  );
}
