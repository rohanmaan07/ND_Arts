import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(1, 9, 12)",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 5,
          borderRadius: 3,
          textAlign: "center",
          backgroundColor: "#1a1a1a",
          color: "#DCE3E9", // 👈 Paper ke andar default text color white
        }}
      >
        <Typography variant="h3" gutterBottom color="#DCE3E9">
          404
        </Typography>
        <Typography variant="h5" gutterBottom color="#DCE3E9">
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" gutterBottom color="#DCE3E9">
          The page you are looking for does not exist or was moved.
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{
            mt: 3,
            bgcolor: "rgb(145, 85, 253)",
            "&:hover": { bgcolor: "rgb(125, 65, 233)" },
          }}
          onClick={() => navigate("/")}
        >
          Go to Home
        </Button>
      </Paper>
    </Box>
  );
};

export default NotFound;
