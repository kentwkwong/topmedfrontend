import {
  Box,
  Button,
  Container,
  FormLabel,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Info: React.FC = () => {
  const navigate = useNavigate();

  const handletimesheet = () => {
    navigate("/Timesheet");
  };

  const handlehistory = () => {
    navigate("/History");
  };
  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
        <Typography
          className="timesheet-title"
          variant="h5"
          gutterBottom
          color="common.white"
        >
          Select your action:
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handletimesheet}
          >
            Submit Timesheet
          </Button>
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handlehistory}
          >
            Check submitted history
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
export default Info;
