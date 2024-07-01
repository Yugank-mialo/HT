const countsPerZone = {
  dz_11: 128,
  dz_12: 128,
  dz_13: 7,
  dz_14: 4,
  dz_15: 4,
};

const hourlyFlowRate = {
  dz_11: 12,
  dz_12: 13,
  dz_13: 56,
  dz_14: 8,
  dz_15: 23,
};

const salesTableData = Object.keys(countsPerZone).map(zone => ({
  zone,
  counts_per_zone: countsPerZone[zone],
  hourly_flow_rate: hourlyFlowRate[zone],
}));

export default salesTableData;
