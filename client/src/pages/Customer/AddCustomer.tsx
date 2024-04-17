/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Typography, Stack } from "@mui/material";
import Sidenav from "../../components/fragments/Sidenav";
import Navbar from "../../components/fragments/Navbar";
import CustomerCard from "../../components/organisms/CustomerCard";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CustomersProps from "@typings/Interface/CustomersProps";

const AddCustomer = () => {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<CustomersProps>({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [error, setError] = useState<CustomersProps>({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const { custId } = useParams();

  useEffect(() => {
    if (custId) {
      axios
        .get(`http://localhost:3000/customer/${custId}`)
        .then((response) => {
          setCustomer(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [custId]);
  

  const handleEditCustomer = () => {
    if (
      !customer.name ||
      !customer.phone ||
      !customer.email ||
      !customer.address
    ) {
      setError({
        name: customer.name ? "" : "Name is required.",
        phone: customer.phone ? "" : "Phone is required.",
        email: customer.email ? "" : "Email is required.",
        address: customer.address ? "" : "Address is required.",
      });
      return;
    }
    axios
      .patch(`http://localhost:3000/customer/${custId}`, customer)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
      });
  };

  const handleAddCustomer = () => {
    if (
      !customer.name ||
      !customer.phone ||
      !customer.email ||
      !customer.address
    ) {
      setError({
        name: customer.name ? "" : "Name is required.",
        phone: customer.phone ? "" : "Phone is required.",
        email: customer.email ? "" : "Email is required.",
        address: customer.address ? "" : "Address is required.",
      });
      return;
    }
    axios
      .post("http://localhost:3000/customer", customer)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding new customer:", error);
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidenav />
      <Box
        component="main"
        sx={{ flexGrow: 1, paddingTop: 11, paddingLeft: 4 }}
      >
        <Navbar />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Customer Page
        </Typography>
        <Stack spacing={2} direction="row">
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "blue", cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
          >
            Main Menu
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {">"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {custId ? "Edit Customer" : "Create New Customer"}
          </Typography>
        </Stack>

        <CustomerCard
          customerFormProps={{
            customers: customer,
            error: error,
            setCustomers: setCustomer,
          }}
          act={custId ? "edit" : "add"}
          handleAddCustomer={handleAddCustomer}
          handleEditCustomer={handleEditCustomer}
          navigate={navigate}
        />
      </Box>
    </Box>
  );
};

export default AddCustomer;
