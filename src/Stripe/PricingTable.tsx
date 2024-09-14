import axios from 'axios';
import { getCookie } from 'cookies-next';
import React, { ReactNode } from 'react';
import useSWR from 'swr';
export type PricingTableProps = { appProductsEndpoint?: string };
export default function PricingTable({ appProductsEndpoint = '/v1/products' }: PricingTableProps): ReactNode {
  const { data, error, isLoading } = useSWR<any, any, string>('/products', async () => {
    return (
      await axios.get(`${process.env.NEXT_PUBLIC_AGIXT_SERVER}${appProductsEndpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: getCookie('jwt'),
        },
      })
    ).data;
  });
  //console.log(data);
  return isLoading ? (
    <p>Loading pricing...</p>
  ) : error ? (
    <p>{error.message}</p>
  ) : (
    <div>
      <h1>Pricing</h1>
      <ul>
        {data.map((product: any) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <ul>
              {product.prices.map((price: any) => (
                <li key={price.id}>
                  <h3>{price.nickname}</h3>
                  <p>{price.description}</p>
                  <p>{price.unit_amount}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
