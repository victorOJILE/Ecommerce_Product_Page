import { AppContext } from "@/context";
import { useEffect, useState } from "react";

export default function ProductImage() {
  const [isLightBox, setIsLightBox] = useState(false);
  const [active, setActive] = useState(0);

  return (
    <>
      <ImageComponent
        active={active}
        setActive={setActive}
          isLightBox={isLightBox}
        setIsLightBox={setIsLightBox}
      />
      {isLightBox && (
        <ImageComponent
          active={active}
          setActive={setActive}
          setIsLightBox={setIsLightBox}
        />
      )}
    </>
  );
}

function ImageComponent({ active, setActive, isLightBox, setIsLightBox }) {
  const [isMobile, setIsMobile] = useState(false);
  let { product } = AppContext();

  const activeProduct = product.imgUrls[active];

  function handleThumbnailClick(e) {
    const li = getParentElem(e.target, "li", "ul");

    if (li)
      setActive(
        product.imgUrls.findIndex((prd) => prd.main === li.dataset.url)
      );
  }

  function prevOrNext(type) {
    if (type) {
      setActive((prev) => (prev + 1 == product.imgUrls.length ? 0 : prev + 1));
    } else {
      setActive((prev) =>
        prev - 1 < 0 ? product.imgUrls.length - 1 : prev - 1
      );
    }
  }
  
  useEffect(() => {
    function checkWindowWidth(e) {
      setIsMobile(window.innerWidth < 768);
    }
    checkWindowWidth();
    window.addEventListener('resize', checkWindowWidth);

    return () => window.removeEventListener('resize', checkWindowWidth);
  }, []);
  
  return (
    <div className={isLightBox ? "fixed top-0 left-0 w-full h-full flex-ac justify-center lightBoxBg z-10" : ""}>
      <div className={isLightBox ? " w-1/3" : ""}>
        { isLightBox && (
          <div className="text-white hover-orange text-right py-2">
            <svg 
              className="cursor-pointer inline-block" 
              width="14" 
              height="15" 
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setIsLightBox(false)}
              >
              <path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="currentColor" fillRule="evenodd"/>
            </svg>
          </div> 
        )}
        <div className="relative">
          <div className={"overflow-hidden z-0 md:rounded-xl"+ (!isLightBox ? " md:cursor-pointer" : "")} onClick={() => !isMobile && typeof isLightBox == 'boolean' ? setIsLightBox(true) : null}>
            <img src={activeProduct.main} alt={product.name} />
          </div>
          <button
            type="button"
            className={"flex items-center justify-center bg-white text-gray-600 hover-orange ring-2 ring-yellow-700 absolute left-0 top-1/2 transform -translate-y-1/2 w-9 h-9 rounded-full" + (isLightBox && !isMobile ? " -translate-x-1/2" : " translate-x-1/2") + (!isLightBox && !isMobile ? " md:hidden" : "")}
            onClick={() => prevOrNext(0)}
          >
            <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11 1 3 9l8 8"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
          </button>
          <button
            type="button"
            className={"flex items-center justify-center bg-white text-gray-600 hover-orange ring-2 ring-yellow-700 absolute right-0 top-1/2 transform -translate-y-1/2 w-9 h-9 rounded-full" + (isLightBox && !isMobile ? " translate-x-1/2" : " -translate-x-1/2") + (!isLightBox && !isMobile ? " md:hidden" : "")}
            onClick={() => prevOrNext(1)}
          >
            <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m2 1 8 8-8 8"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className={"hidden md:block " + (isLightBox && !isMobile ? "p-4" : "py-6")}>
          <ul className="grid grid-cols-4 gap-6" onClick={handleThumbnailClick}>
            {product.imgUrls.slice(0, 4).map((img, index) => (
              <li
                key={index}
                data-url={img.main}
                className={
                  "rounded-lg relative overflow-hidden cursor-pointer" +
                  (img.thumbnail == activeProduct.thumbnail ? " active-img" : "")
                }
              >
                <img src={img.thumbnail} alt="" />
                <div className="absolute top-0 left-0 w-full h-full z-0 hover:bg-gray-100 hover:opacity-40"></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * @param {HTMLElement} elem Target element to get its ancestor (or self) element that nodeName matches the one provided
 * @param {String} nodeName NodeName for matching elements
 * @param {String} exception Node name(s) to be used as exception(s) so that traversing the ancestors tree can return when necessary
 * @returns {Element}
 */
function getParentElem(elem, nodeName, exception) {
  if (elem.nodeName.toLowerCase() == nodeName) return elem;
  if (exception && elem.nodeName.toLowerCase().match(new RegExp(exception)))
    return; // used match so we can pass in multiple nodeNames as exceptions, when needed e.g "div|ul"
  let child;
  if (elem.parentElement)
    child = getParentElem(elem.parentElement, nodeName, exception);
  return child;
}
