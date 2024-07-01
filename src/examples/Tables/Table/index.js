import React, { useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { Table as MuiTable, TableRow, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import ArgonBox from "components/ArgonBox";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonTypography from "components/ArgonTypography";
import Modal from "./Modal"; // Import your modal component
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";
import { position } from "stylis";

function Table({ title, columns, rows }) {
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const [selectedRow, setSelectedRow] = useState(null); // State to track selected row

  // Function to handle row click and open modal
  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const renderColumns = columns.map(({ name, align, width }, key) => {
    // Render column headers
    let displayName = name;

    if (name === "Person_Id") {
      displayName = "Person ID";
    }
    if (name === "Start_Time") {
      displayName = "Start Time";
    }
    if (name === "End_Time") {
      displayName = "End Time";
    }
    if (name === "Cameras") {
      displayName = "Cameras";
    }

    return (
      <ArgonBox
        key={displayName}
        component="th"
        width={width || "auto"}
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? 3 : 1}
        pr={align === "right" ? 3 : 1}
        textAlign={align}
        fontSize={size.xxs}
        fontWeight={fontWeightBold}
        color="secondary"
        opacity={0.7}
        sx={({ palette: { light } }) => ({
          borderBottom: `${borderWidth[1]} solid ${light.main}`,
        })}
      >
        {displayName.toUpperCase()}
      </ArgonBox>
    );
  });

  const renderRows = rows.map((row, key) => {
    // Render each row of data
    return (
      <TableRow key={uuidv4()} onClick={() => handleRowClick(row)} style={{ cursor: "pointer" }}>
        {columns.map(({ name, align }) => {
          // Render cells of each row
          let template;
          if (Array.isArray(row[name])) {
            template = (
              <ArgonBox
                key={uuidv4()}
                component="td"
                p={1}
                sx={({ palette: { light } }) => ({
                  borderBottom: row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null,
                })}
              >
                <ArgonBox display="flex" alignItems="center" py={0.5} px={1} style={{ justifyContent: 'center' }}>
                  {/* <ArgonBox mr={2}>
                    <ArgonAvatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
                  </ArgonBox> */}
                  <ArgonTypography variant="button"
                    color="secondary"
                    fontWeight="regular"
                    sx={{ width: "max-content" }}>
                    {row[name][1]}
                  </ArgonTypography>
                </ArgonBox>
              </ArgonBox>
            );
          } else {
            template = (
              <ArgonBox
                key={uuidv4()}
                component="td"
                p={1}
                textAlign={align}
                verticalAlign="middle"
                lineHeight={0.65}
                sx={({ palette: { light } }) => ({
                  borderBottom: row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null,
                })}
              >
                <ArgonTypography
                  variant="button"
                  fontWeight="regular"
                  color="secondary"
                  sx={{ display: "inline-block", width: "max-content" }}
                >
                  {row[name]}
                </ArgonTypography>
              </ArgonBox>
            );
          }
          return template;
        })}
      </TableRow>
    );
  });

  return (
    <TableContainer>
      {title && (
        <ArgonTypography variant="h5" fontWeight="600" mb={2} style={{ position: "relative", top: "15px", marginLeft: "3%" }}>
          {title}
        </ArgonTypography>
      )}
      <MuiTable className="tableOfDwellZone">
        <ArgonBox component="thead">
          <TableRow>{renderColumns}</TableRow>
        </ArgonBox>
        <TableBody>{renderRows}</TableBody>
      </MuiTable>
      {/* Modal to display detailed view */}
      <Modal open={selectedRow !== null} onClose={() => setSelectedRow(null)} row={selectedRow} />
    </TableContainer>
  );
}

Table.defaultProps = {
  title: "",
  columns: [],
  rows: [{}],
};

Table.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default Table;
