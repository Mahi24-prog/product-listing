import ProductListingPage from "@/components/ProductListingPage";
import { connection } from "next/server";

export default async function Home() {
  // This page depends on URL search params, so render it at request time.
  await connection();

  return <ProductListingPage />;
}
