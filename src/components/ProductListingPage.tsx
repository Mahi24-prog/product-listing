"use client";

import { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Breadcrumbs from "@/components/Breadcrumbs";
import Filters from "@/components/Filters";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import PLPToolbar from "@/components/PLPToolbar";
import ProductGrid from "@/components/ProductGrid";
import ProductQuickView from "@/components/ProductQuickView";
import RecentlyViewed from "@/components/RecentlyViewed";
import { useSearchspring } from "@/hooks/useSearchspring";
import { Product } from "@/types/global.type";

export default function ProductListingPage() {
  const { data, isLoading, isFetching, isError, refetch } = useSearchspring();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );

  const products = data?.results || [];
  const pagination = data?.pagination || {
    totalResults: 0,
    totalPages: 0,
    currentPage: 1,
  };
  const sortOptions = data?.sorting?.options || [];
  const facets = data?.facets || [];

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <Container maxWidth="xl" sx={{ mt: 4, flexGrow: 1 }}>
        <Breadcrumbs />

        <Typography variant="h4" component="h1" gutterBottom>
          {data?.merchandising?.header || "Products"}
        </Typography>

        <Grid container spacing={4}>
          <Grid
            size={{ xs: 12, md: 3 }}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Filters facets={facets} isLoading={isLoading} />
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <PLPToolbar
              totalResults={pagination.totalResults}
              sortOptions={sortOptions}
              pagination={
                <Pagination
                  totalPages={pagination.totalPages}
                  currentPage={pagination.currentPage}
                />
              }
            />

            <ProductGrid
              products={products}
              isLoading={isFetching}
              isError={isError}
              refetch={refetch}
              onQuickView={setQuickViewProduct}
            />

            <Pagination
              totalPages={pagination.totalPages}
              currentPage={pagination.currentPage}
              sx={{ my: 4 }}
            />
          </Grid>
        </Grid>

        <RecentlyViewed onQuickView={setQuickViewProduct} />
      </Container>

      <ProductQuickView
        product={quickViewProduct}
        open={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </Box>
  );
}
