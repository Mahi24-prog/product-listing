"use client";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Stack,
  useTheme,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useStore } from "@/store/useStore";
import { Product } from "@/types/global.type";

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
  onQuickView: (product: Product) => void;
}

export default function ProductCard({
  product,
  viewMode,
  onQuickView,
}: ProductCardProps) {
  const theme = useTheme();
  const wishlist = useStore((state) => state.wishlist);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const addRecentlyViewed = useStore((state) => state.addRecentlyViewed);
  const isWished = wishlist.includes(product.id);

  const priceNum = parseFloat(product.price);
  const msrpNum = product.msrp ? parseFloat(product.msrp) : 0;
  const showMsrp = msrpNum > priceNum;

  const handleProductClick = () => {
    addRecentlyViewed(product);
    onQuickView(product);
  };

  const imgUrl = product.thumbnailImageUrl || product.imageUrl;

  if (viewMode === "list") {
    return (
      <Card
        sx={{
          display: "flex",
          mb: 2,
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: theme.shadows[4],
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: 200,
            flexShrink: 0,
            cursor: "pointer",
          }}
          onClick={handleProductClick}
        >
          <CardMedia
            component="img"
            sx={{ width: 200, height: 250, objectFit: "contain", p: 1 }}
            image={imgUrl}
            alt={product.name}
            loading="lazy"
          />
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "background.paper",
              "&:hover": { bgcolor: "background.default" },
            }}
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
          >
            {isWished ? (
              <FavoriteIcon color="error" fontSize="small" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography variant="overline" color="text.secondary">
              {product.brand || "Brand"}
            </Typography>
            <Typography
              component="div"
              variant="h6"
              sx={{
                cursor: "pointer",
                mb: 1,
                "&:hover": { color: "primary.main" },
              }}
              onClick={handleProductClick}
            >
              {product.name}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", mb: 2 }}
            >
              <Typography variant="h5" color="primary">
                ${priceNum.toFixed(2)}
              </Typography>
              {showMsrp && (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ textDecoration: "line-through" }}
                >
                  ${msrpNum.toFixed(2)}
                </Typography>
              )}
            </Stack>

            <Button
              variant="outlined"
              color="primary"
              onClick={handleProductClick}
            >
              Quick View
            </Button>
          </CardContent>
        </Box>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <Box
        sx={{ position: "relative", pt: "100%", cursor: "pointer" }}
        onClick={handleProductClick}
      >
        <CardMedia
          component="img"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            p: 2,
          }}
          image={imgUrl}
          alt={product.name}
          loading="lazy"
        />
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "background.paper",
            "&:hover": { bgcolor: "background.default" },
          }}
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
        >
          {isWished ? (
            <FavoriteIcon color="error" fontSize="small" />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
        </IconButton>
        {showMsrp && (
          <Chip
            label="SALE"
            color="error"
            size="small"
            sx={{ position: "absolute", top: 8, left: 8, fontWeight: "bold" }}
          />
        )}
      </Box>
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography variant="caption" color="text.secondary" gutterBottom>
          {product.brand || "Brand"}
        </Typography>
        <Typography
          gutterBottom
          variant="subtitle1"
          component="div"
          sx={{
            fontWeight: 500,
            cursor: "pointer",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineHeight: 1.2,
            height: "2.4em",
            "&:hover": { color: "primary.main" },
          }}
          onClick={handleProductClick}
        >
          {product.name}
        </Typography>
        <Box sx={{ mt: "auto", pt: 2 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography variant="h6" color="primary">
              ${priceNum.toFixed(2)}
            </Typography>
            {showMsrp && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                ${msrpNum.toFixed(2)}
              </Typography>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
