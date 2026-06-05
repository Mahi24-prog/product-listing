"use client";

import {
  Grid,
  Box,
  Typography,
  Button,
  Skeleton,
  Alert,
  AlertTitle,
} from "@mui/material";
import ProductCard from "./ProductCard";
import { useStore } from "@/store/useStore";
import { Product } from "@/types/global.type";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  onQuickView: (product: Product) => void;
}

export default function ProductGrid({
  products,
  isLoading,
  isError,
  refetch,
  onQuickView,
}: ProductGridProps) {
  const viewMode = useStore((state) => state.viewMode);

  if (isError) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        <AlertTitle>Error</AlertTitle>
        Something went wrong while fetching products.
        <Box sx={{ mt: 2 }}>
          <Button color="inherit" size="small" onClick={() => refetch()}>
            Try again
          </Button>
        </Box>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {Array.from(new Array(12)).map((_, index) => (
          <Grid
            size={{
              xs: 12,
              sm: viewMode === "grid" ? 6 : 12,
              md: viewMode === "grid" ? 4 : 12,
              lg: viewMode === "grid" ? 3 : 12,
            }}
            key={index}
          >
            <Skeleton
              variant="rectangular"
              height={viewMode === "grid" ? 300 : 250}
              sx={{ borderRadius: 2 }}
            />
            <Skeleton width="60%" sx={{ mt: 1 }} />
            <Skeleton width="80%" />
            <Skeleton width="40%" />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" color="text.secondary" gutterBottom>
          No Results Found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Try adjusting your search or filters to find what you&apos;re looking
          for.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      {products.map((product) => (
        <Grid
          size={{
            xs: 12,
            sm: viewMode === "grid" ? 6 : 12,
            md: viewMode === "grid" ? 4 : 12,
            lg: viewMode === "grid" ? 3 : 12,
          }}
          key={product.id}
        >
          <ProductCard
            product={product}
            viewMode={viewMode}
            onQuickView={onQuickView}
          />
        </Grid>
      ))}
    </Grid>
  );
}
