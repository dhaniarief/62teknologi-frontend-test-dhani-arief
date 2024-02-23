import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { tokens } from "../../context/ThemeProvider/ThemeProvider";
import { useNavigate } from "react-router-dom";
import ResponseAlert from "../../components/ResponseAlert/ResponseAlert";
import axios from "axios";
import { endPoint } from "../../utils";
import Loading from "../../components/Loading/Loading";

export default function AddBusiness() {
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
  const [totalCategory, setTotalCategory] = useState("");
  const [category, setCategory] = useState([]);
  const [totalCoordinate, setTotalCoordinate] = useState("");
  const [coordinate, setCoordinate] = useState([]);
  const [totalLocation, setTotalLocation] = useState("");
  const [location, setLocation] = useState([]);

  const [response, setResponse] = useState("");
  const [success, setSuccess] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);

  const navigate = useNavigate();

  const handleTotalCategoryChange = (value) => {
    if (totalCategory === "") {
      setTotalCategory(1);
    } else if (totalCategory === 1 && value === -1) {
      setTotalCategory("");
      setCategory([]);
    } else {
      setTotalCategory((prevTotal) => prevTotal + value);
      if (value === -1) {
        setCategory((prevCategorys) => prevCategorys.slice(0, -1));
      }
    }
  };

  const handleCategoryChange = (index, field, value) => {
    const updatedCategory = [...category];
    updatedCategory[index] = {
      ...updatedCategory[index],
      [field]: value,
    };
    setCategory(updatedCategory);
  };

  const renderCategoryFields = () => {
    const fields = [];
    for (let i = 0; i < totalCategory; i++) {
      fields.push(
        <Grid key={i} item xs={6}>
          <Stack gap={2}>
            <Typography>{`Category ${i + 1}`}</Typography>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Alias"
              required
              value={category[i]?.alias || ""}
              onChange={(e) => handleCategoryChange(i, "alias", e.target.value)}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Title"
              required
              value={category[i]?.title || ""}
              onChange={(e) => handleCategoryChange(i, "title", e.target.value)}
            />
          </Stack>
        </Grid>
      );
    }
    return fields;
  };

  const handleTotalCoordinateChange = (value) => {
    if (totalCoordinate === "") {
      setTotalCoordinate(1);
    } else if (totalCoordinate === 1 && value === -1) {
      setTotalCoordinate("");
      setCoordinate([]);
    } else {
      setTotalCoordinate((prevTotal) => prevTotal + value);
      if (value === -1) {
        setCoordinate((prevCoordinates) => prevCoordinates.slice(0, -1));
      }
    }
  };

  const handleCoordinateChange = (index, field, value) => {
    const updatedCoordinate = [...coordinate];
    updatedCoordinate[index] = {
      ...updatedCoordinate[index],
      [field]: value,
    };
    setCoordinate(updatedCoordinate);
  };

  const renderCoordinateFields = () => {
    const fields = [];
    for (let i = 0; i < totalCoordinate; i++) {
      fields.push(
        <Grid key={i} item xs={6}>
          <Stack gap={2}>
            <Typography>{`Coordinate ${i + 1}`}</Typography>
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Latitude"
              required
              value={coordinate[i]?.latitude || ""}
              onChange={(e) =>
                handleCoordinateChange(i, "latitude", e.target.value)
              }
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Longitude"
              required
              value={coordinate[i]?.longitude || ""}
              onChange={(e) =>
                handleCoordinateChange(i, "longitude", e.target.value)
              }
            />
          </Stack>
        </Grid>
      );
    }

    return fields;
  };

  const handleTotalLocationChange = (value) => {
    if (totalLocation === "") {
      setTotalLocation(1);
    } else if (totalLocation === 1 && value === -1) {
      setTotalLocation("");
      setLocation([]);
    } else {
      setTotalLocation((prevTotal) => prevTotal + value);
      if (value === -1) {
        setLocation((prevLocations) => prevLocations.slice(0, -1));
      }
    }
  };

  const handleLocationChange = (index, field, value) => {
    const updatedLocation = [...location];
    updatedLocation[index] = {
      ...updatedLocation[index],
      [field]: value,
    };
    setLocation(updatedLocation);
  };

  const renderLocationFields = () => {
    const fields = [];
    for (let i = 0; i < totalLocation; i++) {
      fields.push(
        <Grid key={i} item xs={6}>
          <Stack gap={2}>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Address 1"
              required
              value={location[i]?.address1 || ""}
              onChange={(e) =>
                handleLocationChange(i, "address1", e.target.value)
              }
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Address 2"
              value={location[i]?.address2 || ""}
              onChange={(e) =>
                handleLocationChange(i, "address2", e.target.value)
              }
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Address 3"
              value={location[i]?.address3 || ""}
              onChange={(e) =>
                handleLocationChange(i, "address3", e.target.value)
              }
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="City"
              required
              value={location[i]?.city || ""}
              onChange={(e) => handleLocationChange(i, "city", e.target.value)}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="ZIP Code"
              required
              value={location[i]?.zipCode || ""}
              onChange={(e) =>
                handleLocationChange(i, "zipCode", e.target.value)
              }
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Country"
              required
              value={location[i]?.country || ""}
              onChange={(e) =>
                handleLocationChange(i, "country", e.target.value)
              }
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="State"
              required
              value={location[i]?.state || ""}
              onChange={(e) => handleLocationChange(i, "state", e.target.value)}
            />
          </Stack>
        </Grid>
      );
    }

    return fields;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const updatedLocation = location.map((loc) => ({
      ...loc,
      display_address: `${loc.address1}, ${loc.city}, ${loc.state}`,
      zip_code: loc.zipCode,
    }));
    const data = {
      alias: alias,
      name: name,
      image_url: imageUrl,
      url: url,
      is_closed: isClosed,
      review_count: reviewCount,
      rating: rating,
      phone: phone,
      display_phone: phone,
      price: price,
      transactions: transaction,
      category: category,
      coordinate: coordinate,
      location: updatedLocation,
    };
    console.log(data);
    setLoading(true);
    try {
      const response = await axios.post(endPoint + `business`, data);

      setOpenAlert(true);
      setResponse(response.data.msg);
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setOpenAlert(true);
      setResponse(error.response.data.msg);
      setSuccess(false);
    }
  };

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
            Add New Business
          </Typography>
        </Box>
      </Box>
      <Box p={2} component="form" onSubmit={handleFormSubmit}>
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
              onChange={(e) => setAlias(e.target.value)}
              value={alias}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              id="name"
              label="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              id="imageUrl"
              label="Image URL"
              onChange={(e) => setImageUrl(e.target.value)}
              value={imageUrl}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              id="url"
              label="URL"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              select
              id="isClosed"
              label="Is Closed"
              onChange={(e) => setIsClosed(e.target.value)}
              value={isClosed}
              required
              SelectProps={{
                native: true,
              }}
            >
              <option />
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </TextField>
            <TextField
              fullWidth
              variant="filled"
              type="number"
              id="reviewCount"
              label="Review Count"
              onChange={(e) => setReviewCount(e.target.value)}
              value={reviewCount}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              id="rating"
              label="Rating"
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              id="phone"
              label="Phone Number"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              required
            />
            <TextField
              variant="filled"
              select
              id="price"
              label="Price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
              SelectProps={{
                native: true,
              }}
            >
              <option />
              <option value={"$"}>$</option>
              <option value={"$$"}>$$</option>
              <option value={"$$$"}>$$$</option>
              <option value={"$$$$"}>$$$$</option>
              <option value={"$$$$$"}>$$$$$</option>
            </TextField>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              id="transaction"
              label="Transaction"
              onChange={(e) => setTransaction(e.target.value)}
              value={transaction}
              required
            />
          </Stack>

          <Stack gap={2}>
            <Divider sx={{ textAlign: "center" }}>
              <Chip label="Category" size="small" />
            </Divider>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              id="totalCategory"
              label="Total Category"
              value={totalCategory}
              required
            />
            <Stack gap={2} direction="row">
              <IconButton
                color="secondary"
                onClick={() => handleTotalCategoryChange(+1)}
                sx={{
                  width: "fit-content",
                  background: "grey",
                  "&:hover": {
                    background: "lightgrey",
                    color: "darkgreen",
                  },
                }}
              >
                <AddIcon />
              </IconButton>
              {totalCategory > 0 ? (
                <IconButton
                  onClick={() => handleTotalCategoryChange(-1)}
                  sx={{
                    width: "fit-content",
                    background: "grey",
                    "&:hover": {
                      background: "lightgrey",
                      color: "darkred",
                    },
                  }}
                >
                  <RemoveIcon sx={{ color: "red" }} />
                </IconButton>
              ) : (
                ""
              )}
            </Stack>
            <Grid container spacing={3}>
              {renderCategoryFields()}
            </Grid>
          </Stack>

          <Stack gap={2}>
            <Divider sx={{ textAlign: "center" }}>
              <Chip label="Coordinate" size="small" />
            </Divider>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              id="totalCoordinate"
              label="Total Coordinate"
              value={totalCoordinate}
              required
            />
            <Stack gap={2} direction="row">
              <IconButton
                color="secondary"
                onClick={() => handleTotalCoordinateChange(+1)}
                sx={{
                  width: "fit-content",
                  background: "grey",
                  "&:hover": {
                    background: "lightgrey",
                    color: "darkgreen",
                  },
                }}
              >
                <AddIcon />
              </IconButton>
              {totalCoordinate > 0 ? (
                <IconButton
                  onClick={() => handleTotalCoordinateChange(-1)}
                  sx={{
                    width: "fit-content",
                    background: "grey",
                    "&:hover": {
                      background: "lightgrey",
                      color: "darkred",
                    },
                  }}
                >
                  <RemoveIcon sx={{ color: "red" }} />
                </IconButton>
              ) : (
                ""
              )}
            </Stack>
            <Grid container spacing={3}>
              {renderCoordinateFields()}
            </Grid>
          </Stack>

          <Stack gap={2}>
            <Divider sx={{ textAlign: "center" }}>
              <Chip label="Location" size="small" />
            </Divider>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              id="totalLocation"
              label="Total Location"
              value={totalLocation}
              required
            />
            <Stack gap={2} direction="row">
              <IconButton
                color="secondary"
                onClick={() => handleTotalLocationChange(+1)}
                sx={{
                  width: "fit-content",
                  background: "grey",
                  "&:hover": {
                    background: "lightgrey",
                    color: "darkgreen",
                  },
                }}
              >
                <AddIcon />
              </IconButton>
              {totalLocation > 0 ? (
                <IconButton
                  onClick={() => handleTotalLocationChange(-1)}
                  sx={{
                    width: "fit-content",
                    background: "grey",
                    "&:hover": {
                      background: "lightgrey",
                      color: "darkred",
                    },
                  }}
                >
                  <RemoveIcon sx={{ color: "red" }} />
                </IconButton>
              ) : (
                ""
              )}
            </Stack>
            <Grid container spacing={3}>
              {renderLocationFields()}
            </Grid>
          </Stack>

          <Stack gap={4} direction="row">
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Box>

      <ResponseAlert
        response={response}
        success={success}
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
      />

      <Loading open={loading} />
    </Box>
  );
}
