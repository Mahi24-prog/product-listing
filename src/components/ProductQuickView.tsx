"use client";

import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Grid,
  Button,
  useMediaQuery,
  useTheme,
  Chip,
} from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { Product } from "@/types/global.type";

interface ProductQuickViewProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export default function ProductQuickView({
  product,
  open,
  onClose,
}: ProductQuickViewProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!product) return null;

  const priceNum = parseFloat(product.price);
  const msrpNum = product.msrp ? parseFloat(product.msrp) : 0;
  const showMsrp = msrpNum > priceNum;

  const imgUrl = product.imageUrl || product.thumbnailImageUrl;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "flex-end",
          p: 1,
        }}
      >
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ pt: 0, pb: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                width: "100%",
                height: isMobile ? 300 : 500,
                bgcolor: "background.default",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Image
                src={imgUrl ?? ""}
                alt={product.name}
                width={500}
                height={500}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="overline" color="text.secondary" gutterBottom>
              {product.brand || "Brand"}
            </Typography>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Typography variant="h5" color="primary">
                ${priceNum.toFixed(2)}
              </Typography>
              {showMsrp && (
                <>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    ${msrpNum.toFixed(2)}
                  </Typography>
                  <Chip label="SALE" color="error" size="small" />
                </>
              )}
            </Box>

            <Typography variant="body1" sx={{ mb: 2 }}>
              {product.description || "No description available."}
            </Typography>

            <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Add to Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
