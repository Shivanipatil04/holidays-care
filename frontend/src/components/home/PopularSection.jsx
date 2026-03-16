import { Box, Container, Typography, Button, Chip } from "@mui/material";
import { Star } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function PopularSection({ tours = [] }) {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  if (!tours.length) return null;

  return (
    <Box
      sx={{
        py: 10,
        background:
          "linear-gradient(135deg, #1b4557, #275f72, #2b5e74)", // darker gradient
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Chip
            icon={<Star sx={{ color: "#ff9800 !important" }} />}
            label="Top Picks"
            sx={{
              fontWeight: 700,
              mb: 2,
              bgcolor: "rgba(255,255,255,0.1)",
              border: "1px solid #ff9800",
              color: "white",
              backdropFilter: "blur(6px)",
            }}
          />

          <Typography
            variant="h3"
            fontWeight={800}
            gutterBottom
            sx={{ color: "white" }}
          >
            Most Popular Tours
          </Typography>

          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)" }}>
            Our most loved destinations by travelers around the globe.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 7,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {tours.map((tour, i) => (
            <Box
              key={i}
              sx={{
                flex: {
                  xs: "0 0 100%",
                  sm: "0 0 48%",
                  md: "0 0 30%",
                },
                maxWidth: {
                  xs: "100%",
                  sm: "48%",
                  md: "30%",
                },
                height: 460,
                position: "relative",
                borderRadius: 3,
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                "&:hover img": { transform: "scale(1.1)" },
              }}
            >
              {/* Image */}
              <Box
                component="img"
                src={`${API_URL}${tour?.images?.[0]}`}
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "0.6s",
                }}
              />

              {/* Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                }}
              />

              {/* Content */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  p: 4,
                  color: "white",
                  width: "100%",
                }}
              >
                <Typography variant="overline">{tour.caption}</Typography>

                <Typography variant="h4" fontWeight={800}>
                  {tour?.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.85,
                    mt: 2,
                    fontSize: "0.85rem",
                  }}
                >
                  Starting from
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight={800}
                  sx={{ color: "#4fc3f7", mb: 2 }}
                >
                  ₹{tour?.price?.toLocaleString()}
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 700,
                    textTransform: "none",
                  }}
                  onClick={() => navigate(`/tour/${tour._id}`)}
                >
                  Book Now
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}