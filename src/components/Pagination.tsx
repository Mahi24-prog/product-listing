"use client";

import type { ChangeEvent } from "react";
import { Pagination as MuiPagination, Box } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { SxProps } from "@mui/material";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  sx?: SxProps;
}

export default function Pagination({
  totalPages,
  currentPage,
  sx,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (_event: ChangeEvent<unknown>, page: number) => {
    if (page === currentPage) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    window.scrollTo({ top: 0, behavior: "smooth" });

    router.push(`/?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", ...sx }}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        size="medium"
        showFirstButton
        showLastButton
        siblingCount={0}
      />
    </Box>
  );
}
