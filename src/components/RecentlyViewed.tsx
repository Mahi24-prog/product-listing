"use client";

import { Box, Typography, Grid } from "@mui/material";
import { useStore } from "@/store/useStore";
import { Product } from "@/types/global.type";
import ProductCard from "./ProductCard";

interface RecentlyViewedProps {
  onQuickView: (product: Product) => void;
}

export default function RecentlyViewed({ onQuickView }: RecentlyViewedProps) {
  const recentlyViewed = useStore((state) => state.recentlyViewed);

  if (recentlyViewed.length === 0) return null;

  return (
    <Box sx={{ mt: 8, mb: 4 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ borderBottom: 1, borderColor: "divider", pb: 1, mb: 3 }}
      >
        Recently Viewed
      </Typography>
      <Grid container spacing={3}>
        {recentlyViewed.map((product) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            key={`recent-${product.id}`}
          >
            <ProductCard
              product={product}
              viewMode="grid"
              onQuickView={onQuickView}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
