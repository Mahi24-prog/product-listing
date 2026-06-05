"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Box,
  useTheme,
  Button,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useStore } from "@/store/useStore";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const themeMode = useStore((state) => state.themeMode);
  const toggleTheme = useStore((state) => state.toggleTheme);

  const currentQuery = searchParams.get("q") || "";
  // Local draft lets the input stay responsive while the URL remains the source of truth.
  const [draftQuery, setDraftQuery] = useState<string | null>(null);
  const query = draftQuery ?? currentQuery;

  const handleSearch = (searchQuery: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    } else {
      params.delete("q");
    }

    // New searches should always restart pagination from the first page.
    params.set("page", "1");
    setDraftQuery(null);

    const nextUrl = params.toString();
    router.push(nextUrl ? `/?${nextUrl}` : "/");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(query);
    }
  };

  const onSearchClick = () => {
    handleSearch(query);
  };

  return (
    <AppBar
      position="sticky"
      color="primary"
      elevation={0}
      sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            display: { xs: "none", sm: "block" },
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => router.push("/")}
        >
          SEARCHSPRING SHOP
        </Typography>

        <Box sx={{ position: "relative" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for jeans, dresses..."
              inputProps={{ "aria-label": "search" }}
              value={query}
              onChange={(e) => setDraftQuery(e.target.value)}
              onKeyDown={onKeyDown}
            />
          </Search>
          <Button
            size="small"
            sx={{
              position: "absolute",
              right: -48,
              top: 4,
              color: "inherit",
            }}
            onClick={onSearchClick}
            aria-label="search button"
          >
            Search
          </Button>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex" }}>
          <IconButton
            onClick={toggleTheme}
            color="inherit"
            aria-label="toggle theme"
          >
            {themeMode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
