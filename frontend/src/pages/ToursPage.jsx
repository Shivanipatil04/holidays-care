import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { toursAPI } from "@/services/api";

const ToursPage = () => {

  const [type, setType] = useState("international");
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {

    const fetchTours = async () => {

      try {

        setLoading(true);

        const res = await toursAPI.getAll({ category: type })

        setTours(res.data);

      } catch (error) {
        console.error("Failed to fetch tours", error);
      } finally {
        setLoading(false);
      }

    };

    fetchTours();

  }, [type]);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>

      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: 700,
          mb: 5,
          color: "#0d47a1",
          fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem" }
        }}
      >
        Explore Our Tours
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 7 }}>
        <ToggleButtonGroup
          value={type}
          exclusive
          onChange={(e, newValue) => newValue && setType(newValue)}
          sx={{
            background: "#f4f6f8",
            borderRadius: "40px",
            p: 0.5,
            gap: 1
          }}
        >

          <ToggleButton
            value="international"
            sx={{
              px: { xs: 3, sm: 4 },
              py: 1,
              borderRadius: "30px",
              border: "none",
              textTransform: "none",
              fontWeight: 600,
              color: "#555",
              "&.Mui-selected": {
                color: "white",
                background: "linear-gradient(135deg,#1976d2,#0d47a1)"
              }
            }}>
            International
          </ToggleButton>

          <ToggleButton value="domestic"
            sx={{
              px: { xs: 3, sm: 4 },
              py: 1,
              borderRadius: "30px",
              border: "none",
              textTransform: "none",
              fontWeight: 600,
              color: "#555",
              "&.Mui-selected": {
                color: "white",
                background: "linear-gradient(135deg,#1976d2,#0d47a1)"
              }
            }}>
            Domestic
          </ToggleButton>

        </ToggleButtonGroup>
      </Box>

      {/* Loading */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Tours */}
      {!loading && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: { xs: 4, sm: 5, md: 6 }
          }}
        >

          {tours.map((tour, index) => (

            <motion.div
              key={tour._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >

              <Box
                onClick={() => navigate(`/tour/${tour._id}`)}
                sx={{
                  position: "relative",
                  width: { xs: 220, sm: 240, md: 280 },
                  height: { xs: 300, sm: 340, md: 400 },
                  borderRadius: "180px",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.18)",

                  "&:hover .overlay": {
                    opacity: 1
                  },

                  "&:hover img": {
                    transform: "scale(1.15)"
                  }
                }}
              >

                {/* Image */}
                <Box
                  component="img"
                  src={
                    tour.images?.length
                      ? `${API_URL}${tour.images[0]}`
                      : "/placeholder.jpg"
                  }
                  alt={tour.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s ease"
                  }}
                />

                {/* Destination Name */}
                <Typography
                  sx={{
                    position: "absolute",
                    top: 40,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: { xs: 18, sm: 22, md: 26 },
                    fontWeight: 800,
                    color: "#fff",
                    textShadow: "0 4px 15px rgba(0,0,0,0.6)",
                    textAlign: "center",
                    width: "80%"
                  }}
                >
                  {tour.destination || tour.title}
                </Typography>

                {/* Hover Overlay */}
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    pb: 4,
                    opacity: 0,
                    transition: "0.4s"
                  }}
                >

                  <Typography
                    sx={{
                      color: "white",
                      fontSize: { xs: 14, sm: 16, md: 18 },
                      fontWeight: 500,
                      mb: 2,
                      textAlign: "center"
                    }}
                  >
                    Starting at <br />
                    <b>₹{tour.price?.toLocaleString()}</b>
                  </Typography>

                  <Box
                    sx={{
                      width: 45,
                      height: 45,
                      borderRadius: "50%",
                      background: "#115eec",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <ArrowOutwardIcon sx={{ color: "white" }} />
                  </Box>

                </Box>

              </Box>

            </motion.div>

          ))}

        </Box>
      )}

    </Container>
  );
};

export default ToursPage;