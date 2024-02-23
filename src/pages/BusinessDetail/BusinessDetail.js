import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { endPoint } from "../../utils";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../context/ThemeProvider/ThemeProvider";
import Loading from "../../components/Loading/Loading";
import ResponseAlert from "../../components/ResponseAlert/ResponseAlert";

export default function BusinessDetail() {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);

  const [alias, setAlias] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [url, setUrl] = useState("");
  const [isClosed, setIsClosed] = useState("");
  const [reviewCount, setReviewCount] = useState("");
  const [rating, setRating] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [transaction, setTransaction] = useState("");
  const [category, setCategory] = useState([]);
  const [coordinate, setCoordinate] = useState([]);
  const [location, setLocation] = useState([]);

  const [response, setResponse] = useState("");
  const [success, setSuccess] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);

  const navigate = useNavigate();

  const businessDetail = async () => {
    setLoading(true);
    try {
      const response = await axios.get(endPoint + `business/${id}`);
      console.log(response.data);
      const business = response.data;
      setAlias(business.alias);
      setName(business.name);
      setImageUrl(business.image_url);
      setUrl(business.url);
      setIsClosed(business.is_closed);
      setReviewCount(business.review_count);
      setRating(business.rating);
      setPhone(business.display_phone);
      setPrice(business.price);
      setTransaction(business.transactions);
      setCategory(business.businessCategories);
      setCoordinate(business.businessCoordinates);
      setLocation(business.businessLocations);
      setLoading(false);
    } catch (error) {
      setOpenAlert(true);
      setResponse(error.response.data.msg);
      setSuccess(false);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  useEffect(() => {
    businessDetail();
    // eslint-disable-next-line
  }, []);

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
            Detail Business
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.grey[600],
              transition: "background-color 0.3s, color 0.3s",
              "&:hover": {
                backgroundColor: colors.grey[700],
              },
            }}
            onClick={() => navigate(`/`)}
          >
            Back
          </Button>
        </Box>
      </Box>
      <Stack gap={2}>
        <Stack gap={2}>
          <Divider sx={{ textAlign: "center" }}>
            <Chip label="Description" size="small" />
          </Divider>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            id="alias"
            label="Alias"
            value={alias}
            disabled
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            id="name"
            label="Name"
            value={name}
            disabled
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            id="imageUrl"
            label="Image URL"
            value={imageUrl}
            disabled
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            id="url"
            label="URL"
            value={url}
            disabled
          />
          <TextField
            fullWidth
            variant="filled"
            id="isClosed"
            label="Is Closed"
            value={isClosed}
            disabled
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            id="reviewCount"
            label="Review Count"
            value={reviewCount}
            disabled
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            id="rating"
            label="Rating"
            value={rating}
            disabled
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            id="phone"
            label="Phone Number"
            value={phone}
            disabled
          />
          <TextField
            variant="filled"
            id="price"
            label="Price"
            value={price}
            disabled
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            id="transaction"
            label="Transaction"
            value={transaction}
            disabled
          />
        </Stack>

        <Stack gap={2}>
          <Divider sx={{ textAlign: "center" }}>
            <Chip label="Category" size="small" />
          </Divider>
          <Grid container spacing={2}>
            {category &&
              category.map((item, index) => (
                <Grid item xs={6} key={index}>
                  <Stack gap={2}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Alias"
                      value={item.alias}
                      disabled
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Title"
                      value={item.title}
                      disabled
                    />
                  </Stack>
                </Grid>
              ))}
          </Grid>
        </Stack>

        <Stack gap={2}>
          <Divider sx={{ textAlign: "center" }}>
            <Chip label="Coordinate" size="small" />
          </Divider>
          <Grid container spacing={2}>
            {coordinate &&
              coordinate.map((item, index) => (
                <Grid item xs={6} key={index}>
                  <Stack gap={2}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Longitude"
                      value={item.longitude}
                      disabled
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Latitude"
                      value={item.latitude}
                      disabled
                    />
                  </Stack>
                </Grid>
              ))}
          </Grid>
        </Stack>

        <Stack gap={2}>
          <Divider sx={{ textAlign: "center" }}>
            <Chip label="Location" size="small" />
          </Divider>
          <Grid container spacing={2}>
            {location &&
              location.map((item, index) => (
                <Grid item xs={6} key={index}>
                  <Stack gap={2}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Address 1"
                      value={item.address1}
                      disabled
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Address 2"
                      value={item.address2}
                      disabled
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Address 3"
                      value={item.address3}
                      disabled
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="City"
                      value={item.city}
                      disabled
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Country"
                      value={item.country}
                      disabled
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="ZIP Code"
                      value={item.zip_code}
                      disabled
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="State"
                      value={item.state}
                      disabled
                    />
                  </Stack>
                </Grid>
              ))}
          </Grid>
        </Stack>
      </Stack>
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
