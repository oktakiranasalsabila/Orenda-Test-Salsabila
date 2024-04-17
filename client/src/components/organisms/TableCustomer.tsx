/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Autocomplete, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import CustomersProps from "@typings/Interface/CustomersProps";

interface Column {
  id: "name" | "phone" | "email" | "address" | "action";
  label: string;
  width?: number;
  align?: "left" | "right" | "center";
  format?: (value: any) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", width: 130 },
  { id: "phone", label: "Phone Number", width: 130 },
  {
    id: "email",
    label: "Email Address",
    width: 130,
    align: "left",
    format: (value: any) => (value ? value.toLocaleString("en-US") : ""),
  },
  {
    id: "address",
    label: "Address",
    width: 130,
    align: "left",
    format: (value: any) => (value ? value.toLocaleString("en-US") : ""),
  },
  {
    id: "action",
    label: "Action",
    width: 130,
    align: "center",
    format: (value: any) => (value ? value.toFixed(2) : ""),
  },
];

const options = ["Edit", "Delete"];

const TableCustomer = () => {
  const [rows, setRows] = useState<Array<CustomersProps>>([]);
  const [filteredRows, setFilteredRows] = useState<Array<any>>([]);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [clickedRowId, setClickedRowId] = useState<number | null>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/customer")
      .then((response) => {
        setRows(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDeleteCustomer = async () => {
    if (clickedRowId !== null) {
      try {
        await axios.delete(`http://localhost:3000/customer/${clickedRowId}`);
        setRows(rows.filter((customers) => customers.custId !== clickedRowId));
      } catch (error) {
        console.error("Error deleting customers:", error);
      }
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    const results = Array.isArray(rows)
      ? rows.filter((row) =>
          row.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : [];
    setFilteredRows(results);
  }, [searchValue, rows]);

  
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    custId: number
  ) => {
    setClickedRowId(custId);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditCustomer = (custId: number) => () => {
    navigate(`/edit/${custId}`);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Autocomplete
        freeSolo
        disableClearable
        options={options}
        sx={{ width: 200, m: 1 }}
        onChange={(event, value) => setSelectedRow(value)}
        onInputChange={(event, newInputValue) => {
          setSearchValue(newInputValue);
        }}
        value={selectedRow}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Name"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />

      <TableContainer sx={{ maxHeight: 375 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ width: column.width }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(filteredRows) &&
              filteredRows.map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === "action" ? (
                          <div>
                            <IconButton
                              aria-label="more"
                              id="long-button"
                              aria-controls={open ? "long-menu" : undefined}
                              aria-expanded={open ? "true" : undefined}
                              aria-haspopup="true"
                              onClick={(event) =>
                                handleClick(event, row.custId)
                              }
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id="long-menu"
                              MenuListProps={{
                                "aria-labelledby": "long-button",
                              }}
                              anchorEl={anchorEl}
                              open={open && clickedRowId === row.custId}
                              onClose={handleClose}
                            >
                              {options.map((option) => (
                                <MenuItem
                                  key={option}
                                  selected={option === "Pyxis"}
                                  onClick={
                                    option === "Delete"
                                      ? handleDeleteCustomer
                                      : option === "Edit"
                                      ? handleEditCustomer(row.custId)
                                      : handleClose
                                  }
                                >
                                  {option}
                                </MenuItem>
                              ))}
                            </Menu>
                          </div>
                        ) : column.format ? (
                          column.format(value)
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableCustomer;
