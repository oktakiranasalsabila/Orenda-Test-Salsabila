// CustomerForm.tsx
import React from "react";
import { Grid, TextField } from "@mui/material";
import CustomerFormProps from "@typings/Interface/CustomerFormProps";

const CustomerForm: React.FC<CustomerFormProps> = ({
  customers,
  error,
  setCustomers,
}) => {
  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="name"
                label="Customer Name"
                fullWidth
                value={customers.name}
                error={!!error.name}
                helperText={error.name}
                onChange={(e) =>
                  setCustomers({ ...customers, name: e.target.value })
                }
                type="search"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="phone"
                label="Phone Number"
                fullWidth
                value={customers.phone}
                error={!!error.phone}
                helperText={error.phone}
                onChange={(e) =>
                  setCustomers({ ...customers, phone: e.target.value })
                }
                type="search"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="email"
                label="Email Address"
                fullWidth
                value={customers.email}
                error={!!error.email}
                helperText={error.email}
                onChange={(e) =>
                  setCustomers({ ...customers, email: e.target.value })
                }
                type="search"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address"
                label="Address"
                fullWidth
                value={customers.address}
                error={!!error.address}
                helperText={error.address}
                rows={4.1}
                multiline
                onChange={(e) =>
                  setCustomers({ ...customers, address: e.target.value })
                }
                type="search"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CustomerForm;
