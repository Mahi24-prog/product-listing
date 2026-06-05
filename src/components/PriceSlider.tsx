"use client";

import { useState } from "react";
import { Box, Typography, Slider } from "@mui/material";

interface PriceSliderProps {
  min: number;
  max: number;
  initialValue: number[];
  onApply: (value: number[]) => void;
}

export default function PriceSlider({
  min,
  max,
  initialValue,
  onApply,
}: PriceSliderProps) {
  const [value, setValue] = useState<number[]>(initialValue);

  return (
    <Box sx={{ px: 1 }}>
      <Typography variant="body2" sx={{ mb: 1 }}>
        ${value[0]} - ${value[1]}
      </Typography>

      <Slider
        value={value}
        min={min}
        max={max}
        disableSwap
        valueLabelDisplay="auto"
        onChange={(_, newValue) => {
          setValue(newValue as number[]);
        }}
        onChangeCommitted={(_, newValue) => {
          onApply(newValue as number[]);
        }}
      />
    </Box>
  );
}
