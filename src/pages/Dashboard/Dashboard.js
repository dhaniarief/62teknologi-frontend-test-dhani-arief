import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { tokens } from "../../context/ThemeProvider/ThemeProvider";
import Loading from "../../components/Loading/Loading";
import ResponseAlert from "../../components/ResponseAlert/ResponseAlert";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { endPoint } from "../../utils";

export default function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [response, setResponse] = useState("");
  const [success, setSuccess] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);

  const [name, setName] = useState("");
  const [alias, setAlias] = useState("");
  const [reviewCount, setReviewCount] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");
  const [isClosed, setIsClosed] = useState("");
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(endPoint + "business");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setOpenAlert(true);
      setResponse(error.response.data.msg);
      setSuccess(false);
    }
  };

  const searchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        endPoint +
          `business/search?name=${name}&review_count=${reviewCount}&rating=${rating}&price=${price}&is_closed=${isClosed}&alias=${alias}&city=${city}`
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setOpenAlert(true);
      setResponse(error.response.data.msg);
      setSuccess(false);
    }
  };

  useEffect(() => {
    if (
      name !== "" ||
      alias !== "" ||
      reviewCount !== "" ||
      rating !== "" ||
      price !== "" ||
      isClosed !== "" ||
      city !== ""
    ) {
      searchData();
    } else {
      fetchData();
    }
    // eslint-disable-next-line
  }, [name, alias, reviewCount, rating, price, isClosed, city]);

  const handleDeleteBusiness = async (params) => {
    setLoading(true);
    try {
      const response = await axios.delete(endPoint + `business/${params.id}`);
      await fetchData();
      setLoading(false);
      setOpenAlert(true);
      setResponse(response.data.msg);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setOpenAlert(true);
      setResponse(error.response.data.msg);
      setSuccess(false);
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      valueGetter: (params) => `${params.row.name} (${params.row.alias})`,
    },
    { field: "display_phone", headerName: "Phone Number", flex: 1 },
    {
      field: "rating",
      headerName: "Rating",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.rating}⭐ (${params.row.review_count})`,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <Stack gap={2} direction="row">
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.yellowAccent[600],
                transition: "background-color 0.3s, color 0.3s",
                "&:hover": {
                  backgroundColor: colors.yellowAccent[700],
                },
              }}
              onClick={() => navigate(`/detailBusiness/${params.id}`)}
            >
              Details
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.redAccent[600],
                transition: "background-color 0.3s, color 0.3s",
                "&:hover": {
                  backgroundColor: colors.redAccent[700],
                },
              }}
              onClick={() => handleDeleteBusiness(params)}
            >
              Delete
            </Button>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography
            variant="h2"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ m: "0 0 5px 0" }}
          >
            List Businesses
          </Typography>
        </Box>
      </Box>
      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            cursor: "pointer",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle" color={colors.grey[100]}>
              Search
            </Typography>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              id="name"
              label="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              id="alias"
              label="Alias"
              onChange={(e) => {
                setAlias(e.target.value);
              }}
              value={alias}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="filled"
              type="number"
              id="reviewCount"
              label="Review Count"
              onChange={(e) => {
                setReviewCount(e.target.value);
              }}
              value={reviewCount}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="filled"
              type="number"
              id="rating"
              label="Rating"
              onChange={(e) => {
                setRating(e.target.value);
              }}
              value={rating}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="filled"
              select
              id="price"
              label="Price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              SelectProps={{
                native: true,
              }}
              value={price}
            >
              <option />
              <option value={"$"}>$</option>
              <option value={"$$"}>$$</option>
              <option value={"$$$"}>$$$</option>
              <option value={"$$$$"}>$$$$</option>
              <option value={"$$$$$"}>$$$$$</option>
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="filled"
              select
              id="isClosed"
              label="Is Closed"
              SelectProps={{
                native: true,
              }}
              onChange={(e) => {
                setIsClosed(e.target.value);
              }}
              value={isClosed}
            >
              <option />
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              id="city"
              label="City"
              onChange={(e) => {
                setCity(e.target.value);
              }}
              value={city}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.greenAccent[600],
            transition: "background-color 0.3s, color 0.3s",
            "&:hover": {
              backgroundColor: colors.greenAccent[700],
            },
            marginBottom: "16px",
          }}
          onClick={() => navigate(`/addBusiness`)}
        >
          Add New Business
        </Button>
        {data && (
          <DataGrid
            rows={data}
            columns={columns}
            slots={{ Toolbar: GridToolbar }}
          />
        )}
      </Box>
      <Loading open={loading} />
      <ResponseAlert
        response={response}
        success={success}
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
      />
    </Box>
  );
}
