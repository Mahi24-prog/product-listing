"use client";

import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Typography,
  IconButton,
  useTheme,
  SelectChangeEvent,
} from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/store/useStore";
import { SortOption } from "@/types/global.type";

interface PLPToolbarProps {
  totalResults: number;
  sortOptions: SortOption[];
  pagination: React.ReactNode;
}

export default function PLPToolbar({
  totalResults,
  sortOptions,
  pagination: Pagination,
}: PLPToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const viewMode = useStore((state) => state.viewMode);
  const setViewMode = useStore((state) => state.setViewMode);
  const setFilterDrawerOpen = useStore((state) => state.setFilterDrawerOpen);

  const currentSortVal = searchParams.get("sort") ?? "";

  const handleSortChange = (event: SelectChangeEvent) => {
    const val = event.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (val) {
      params.set("sort", val);
    } else {
      params.delete("sort");
    }

    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
        pb: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        position: "sticky",
        top: 64,
        bgcolor: "background.default",
        zIndex: 10,
        pt: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          sx={{ display: { md: "none" }, mr: 1 }}
          onClick={() => setFilterDrawerOpen(true)}
          color="primary"
        >
          <FilterListIcon />
        </IconButton>
        <Typography variant="body1" color="text.secondary">
          <strong>{totalResults}</strong> Results
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {Pagination}
        <FormControl size="small" sx={{ minWidth: 150, position: "relative" }}>
          <Select
            value={currentSortVal}
            onChange={handleSortChange}
            displayEmpty
            aria-label="Sort by"
          >
            <MenuItem value="">
              <em>Sort By...</em>
            </MenuItem>
            {sortOptions.map((opt) => (
              <MenuItem
                key={`${opt.field}-${opt.direction}`}
                value={`${opt.field}-${opt.direction}`}
              >
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          <IconButton
            size="small"
            color={viewMode === "grid" ? "info" : "default"}
            onClick={() => setViewMode("grid")}
            sx={{ borderRadius: 0 }}
          >
            <ViewModuleIcon />
          </IconButton>
          <IconButton
            size="small"
            color={viewMode === "list" ? "info" : "default"}
            onClick={() => setViewMode("list")}
            sx={{ borderRadius: 0 }}
          >
            <ViewListIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
