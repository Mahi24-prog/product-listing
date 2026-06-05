"use client";

import React from "react";
import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Typography,
  Box,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useSearchParams } from "next/navigation";

export default function Breadcrumbs() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  return (
    <Box sx={{ mb: 3 }}>
      <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        {q ? (
          <Typography color="text.primary">Search Results for {q}</Typography>
        ) : (
          <Typography color="text.primary">All Products</Typography>
        )}
      </MuiBreadcrumbs>
    </Box>
  );
}
