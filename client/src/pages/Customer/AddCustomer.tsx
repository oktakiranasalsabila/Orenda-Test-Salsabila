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

  const [customers, setCustomers] = useState<CustomersProps>({
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
        .then((response) => {})
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [custId]);
 
 
  const handleEditCustomer = () => {
    if (
      !customers.name ||
      !customers.phone ||
      !customers.email ||
      !customers.address
    ) {
      setError({
        name: customers.name ? "" : "Name is required.",
        phone: customers.phone ? "" : "Phone is required.",
        email: customers.email ? "" : "Email is required.",
        address: customers.address ? "" : "Address is required.",
      });
      return;
    }
    axios
      .patch(`http://localhost:3000/customer/${custId}`, customers)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
      });
  };

  const handleAddCustomer = () => {
    if (
      !customers.name ||
      !customers.phone ||
      !customers.email ||
      !customers.address
    ) {
      setError({
        name: customers.name ? "" : "Name is required.",
        phone: customers.phone ? "" : "Phone is required.",
        email: customers.email ? "" : "Email is required.",
        address: customers.address ? "" : "Address is required.",
      });
      return;
    }
    axios
      .post("http://localhost:3000/customer", customers)
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
            customers: customers,
            error: error,
            setCustomers: setCustomers,
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
