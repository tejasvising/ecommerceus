import { LoaderArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node"; 





import React from "react";
import { Product } from "~/lib/interface";
import { client } from "~/lib/sanity";

interface iAppProps {
  products: Product[];
}

export async function loader({}: LoaderArgs) {
  const query = `*[_type == 'product']{
    price,
    name,
    slug,
    "imageUrl": image[0].asset->url
  }`;

  const products = await client.fetch(query);

  return json({ products });
}

const IndexPage = () => {
  const { products } = useLoaderData<typeof loader>() as iAppProps;

  return (
    <>
      <section className="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row mt-12">
        <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24">
          <p className="mb-4 font-semibold text-indigo-600 md:mb-6 md:text-lg xl:text-xl">
            Welcome to our place!
          </p>
          <h1 className="text-black mb-8 text-4xl font-bold sm:text-5xl md:mb-12 md:text-6xl">
            Find products that matter to you
          </h1>
          <p className="mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 xl:text-lg">
            Welcome to Ecommerceus, your ultimate destination for all things
            related to tech! Step into the world of innovation and discovery as we bring you
            the latest gadgets and accessories.
          </p>
          <div>
            <Link
              to="#products"
              className="hover:shadow-2xl rounded-lg bg-indigo-600 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 md:text-base"
            >
              Products for you
            </Link>
          </div>
        </div>

        <div className="mt-20 h-auto overflow-hidden rounded-lg lg:h-auto xl:w-5/12">
          <img
            src='https://www.pngmart.com/files/15/Apple-iPhone-12-PNG-Photo.png'    alt="Prouct Image"
            className="h-50 w-full object-cover object-center"
          />
        </div>
      </section>

      <section id="products">
        <div className="py-24 sm:py-32 lg:pt-32">
          <div className="mt-6 grid grid-col-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
            {products.map((product) => (
              <Link
                className="group relative"
                to={`/product/${product.slug.current}`}
              >
                <div className="rounded-lg xl:bg-transparent shadow-md hover:shadow-2xl w-full h-56 overflow-hidden  lg:h-72 xl:h-80">
                  <img
                    src={product.imageUrl}
                    alt="Image of Product"
                    className="w-full h-full object-center object-contain"
                  />
                </div>
      
                <h3 className="mt-4 leading-relaxed text-sm text-gray-700 "><b>{product.name}</b></h3>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  $ {product.price}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default IndexPage;