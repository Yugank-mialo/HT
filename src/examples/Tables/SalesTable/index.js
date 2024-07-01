import { useMemo } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import ArgonBox from "components/ArgonBox";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonTypography from "components/ArgonTypography";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

function SalesTable({ columns, rows, title }) {
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const renderColumns = useMemo(
    () =>
      columns.map(({ name, align, width }, key) => {
        let pl, pr;
        let displayName = name;

        if (key === 0) {
          pl = 3;
          pr = 3;
        } else if (key === columns.length - 1) {
          pl = 3;
          pr = 3;
        } else {
          pl = 1;
          pr = 1;
        }

        // Conditionally rename "zone" column to "Sangamesh"
        if (name === "zone") {
          displayName = "Zone";
        }
        if(name=="counts_per_zone"){
          displayName="Counts Per Zone"
        }
        if(name=="hourly_flow_rate"){
          displayName="Hourly Flow Rate"
        }

        return (
          <ArgonBox
            key={displayName}
            component="th"
            width={width || "auto"}
            pt={1.5}
            pb={1.25}
            pl={align === "left" ? pl : 3}
            pr={align === "right" ? pr : 3}
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
      }),
    [columns, size, fontWeightBold, borderWidth]
  );

  const renderRows = useMemo(
    () =>
      rows.map((row, key) => {
        const rowKey = `row-${key}`;

        const tableRow = columns.map(({ name, align }) => {
          let template;

          if (Array.isArray(row[name])) {
            template = (
              <ArgonBox
                key={uuidv4()}
                component="td"
                p={1}
                sx={({ palette: { light } }) => ({
                  borderBottom: borderWidth ? `${borderWidth[1]} solid ${light.main}` : null,
                })}
              >
                <ArgonBox display="flex" alignItems="center" py={0.5} px={1}>
                  <ArgonBox mr={2}>
                    <ArgonAvatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
                  </ArgonBox>
                  <ArgonTypography variant="button" fontWeight="medium" sx={{ width: "max-content" }}>
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
                  borderBottom: borderWidth ? `${borderWidth[1]} solid ${light.main}` : null,
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
        });

        return <TableRow key={rowKey}>{tableRow}</TableRow>;
      }),
    [columns, rows, borderWidth]
  );

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
    </TableContainer>
  );
}

SalesTable.defaultProps = {
  columns: [],
  rows: [{}],
};

SalesTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      align: PropTypes.oneOf(["left", "center", "right"]),
      width: PropTypes.string,
    })
  ),
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      // Adjust the shape based on your actual data structure
      zone: PropTypes.string.isRequired,
      counts_per_zone: PropTypes.number.isRequired,
      hourly_flow_rate: PropTypes.number.isRequired,
    })
  ),
  title: PropTypes.string,
};

export default SalesTable;
