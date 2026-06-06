"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Button,
  Skeleton,
  Radio,
  RadioGroup,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter, useSearchParams } from "next/navigation";
import PriceSlider from "./PriceSlider";
import { useStore } from "@/store/useStore";
import { Facet } from "@/types/global.type";

interface FiltersProps {
  facets: Facet[];
  isLoading: boolean;
}

const isPriceFacet = (facet: Facet) => facet.field === "price";

const getPriceBounds = (facet: Facet) => {
  const ranges = facet.values.filter((v) => v.type === "range");

  if (!ranges.length) return null;

  return {
    min: 0,
    max: Number(ranges[ranges.length - 1].high),
  };
};

export default function Filters({ facets, isLoading }: FiltersProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const router = useRouter();
  const searchParams = useSearchParams();

  const isFilterDrawerOpen = useStore((state) => state.isFilterDrawerOpen);
  const setFilterDrawerOpen = useStore((state) => state.setFilterDrawerOpen);

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const updateUrl = (params: URLSearchParams) => {
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  const toggleAccordion = (field: string, defaultExpanded: boolean) => {
    setExpanded((prev) => ({
      ...prev,
      [field]: !(prev[field] ?? defaultExpanded),
    }));
  };

  const handleSingleSelect = (field: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete(field);

    if (value) {
      params.set(field, value);
    }

    updateUrl(params);
  };

  const handleMultiSelect = (field: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const currentValues = params.getAll(field);

    console.log(currentValues);

    params.delete(field);

    if (currentValues.includes(value)) {
      currentValues
        .filter((v) => v !== value)
        .forEach((v) => params.append(field, v));
    } else {
      [...currentValues, value].forEach((v) => params.append(field, v));
    }

    updateUrl(params);
  };

  const handlePriceChange = (
    field: string,
    value: number[],
    min: number,
    max: number,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete(`${field}.low`);
    params.delete(`${field}.high`);

    if (value[0] > min) {
      params.set(`${field}.low`, String(value[0]));
    }

    if (value[1] < max) {
      params.set(`${field}.high`, String(value[1]));
    }

    updateUrl(params);
  };

  const handleClearAll = () => {
    const params = new URLSearchParams();

    const q = searchParams.get("q");
    const sort = searchParams.get("sort");

    if (q) params.set("q", q);
    if (sort) params.set("sort", sort);

    router.push(params.toString() ? `/?${params.toString()}` : "/");
  };

  const filterContent = (
    <Box sx={{ width: isMobile ? 300 : "100%", p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Filters</Typography>

        {isMobile && (
          <IconButton onClick={() => setFilterDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Button
        fullWidth
        color="error"
        variant="text"
        size="small"
        sx={{ mb: 2 }}
        onClick={handleClearAll}
      >
        Clear Filters
      </Button>

      {facets.map((facet) => {
        const defaultExpanded = facet.collapse !== 1;

        const isSingleSelect =
          facet.multiple === "single" && !isPriceFacet(facet);

        const bounds = isPriceFacet(facet) ? getPriceBounds(facet) : null;

        return (
          <Accordion
            key={facet.field}
            disableGutters
            elevation={0}
            expanded={expanded[facet.field] ?? defaultExpanded}
            onChange={() => toggleAccordion(facet.field, defaultExpanded)}
            sx={{
              borderBottom: `1px solid ${theme.palette.divider}`,
              bgcolor: "transparent",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
              <Typography>{facet.label}</Typography>
            </AccordionSummary>

            <AccordionDetails
              sx={{
                px: 0,
                pt: 0,
                pb: 2,
                minHeight: 100,
                maxHeight: 250,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {bounds ? (
                <PriceSlider
                  key={`${facet.field}-${
                    searchParams.get(`${facet.field}.low`) ?? bounds.min
                  }-${searchParams.get(`${facet.field}.high`) ?? bounds.max}`}
                  min={bounds.min}
                  max={bounds.max}
                  initialValue={[
                    Number(
                      searchParams.get(`${facet.field}.low`) ?? bounds.min,
                    ),
                    Number(
                      searchParams.get(`${facet.field}.high`) ?? bounds.max,
                    ),
                  ]}
                  onApply={(value) =>
                    handlePriceChange(
                      facet.field,
                      value,
                      bounds.min,
                      bounds.max,
                    )
                  }
                />
              ) : isSingleSelect ? (
                <RadioGroup
                  value={searchParams.get(facet.field) ?? ""}
                  onChange={(e) =>
                    handleSingleSelect(facet.field, e.target.value)
                  }
                >
                  <FormControlLabel
                    value=""
                    control={<Radio size="small" />}
                    label="All"
                  />

                  {facet.values.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      value={item.value ?? ""}
                      control={<Radio size="small" />}
                      label={`${item.label} (${item.count})`}
                    />
                  ))}
                </RadioGroup>
              ) : (
                facet.values.map((item) => (
                  <FormControlLabel
                    key={item.value || item.label}
                    control={
                      <Checkbox
                        size="small"
                        checked={
                          !!item.value &&
                          searchParams.getAll(facet.field).includes(item.value)
                        }
                        onChange={() =>
                          item.value &&
                          handleMultiSelect(facet.field, item.value)
                        }
                      />
                    }
                    label={`${item.label} (${item.count})`}
                  />
                ))
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={isFilterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
      >
        {filterContent}
      </Drawer>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ p: 2 }}>
        <Skeleton variant="text" width={100} height={40} />

        {[...Array(6)].map((_, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Skeleton variant="text" width="60%" height={30} />
            <Skeleton variant="rectangular" width="100%" height={80} />
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "sticky",
        top: 100,
        height: "calc(100vh - 120px)",
        overflowY: "auto",
        pr: 2,
      }}
    >
      {filterContent}
    </Box>
  );
}
