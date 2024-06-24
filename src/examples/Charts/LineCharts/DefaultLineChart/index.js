import { useMemo } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import Card from "@mui/material/Card";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import configs from "examples/Charts/LineCharts/DefaultLineChart/configs";
import colors from "assets/theme/base/colors";

function DefaultLineChart({ title, description, height, chart, selectedDate, onDateChange }) {
  const chartDatasets = chart.datasets
    ? chart.datasets.map((dataset) => ({
      ...dataset,
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 2,
      pointBackgroundColor: colors[dataset.color]
        ? colors[dataset.color || "dark"].main
        : colors.dark.main,
      borderColor: colors[dataset.color]
        ? colors[dataset.color || "dark"].main
        : colors.dark.main,
      maxBarThickness: 6,
    }))
    : [];

  const { data, options } = configs(chart.labels || [], chartDatasets);

  const renderChart = (
    <ArgonBox p={2}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<div>
        {title && (
          <ArgonBox mb={1}>
            <ArgonTypography variant="h6">{title}</ArgonTypography>
          </ArgonBox>
        )}
        </div>
        <div>
        {onDateChange && (
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            style={{ marginRight: '10px' }}
          />
        )}
        </div>
                </div>

        <div>
          {description && (
            <ArgonBox mb={2}>
              <ArgonTypography component="div" variant="button" fontWeight="regular" color="text">
                {description}
              </ArgonTypography>
            </ArgonBox>
          )}
      </div>
      {/* Chart */}
      {useMemo(
        () => (
          <ArgonBox height={height}>
            <Line data={data} options={options} />
          </ArgonBox>
        ),
        [chart, height]
      )}
    </ArgonBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

DefaultLineChart.defaultProps = {
  title: "",
  description: "",
  height: "19.125rem",
  selectedDate: "", // Default value for selectedDate when not provided
  onDateChange: null, // Default value for onDateChange when not provided
};

DefaultLineChart.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.shape({
    datasets: PropTypes.array.isRequired,
    labels: PropTypes.array.isRequired,
  }).isRequired,
  selectedDate: PropTypes.string, // selectedDate is now optional
  onDateChange: PropTypes.func, // onDateChange is now optional
};

export default DefaultLineChart;
