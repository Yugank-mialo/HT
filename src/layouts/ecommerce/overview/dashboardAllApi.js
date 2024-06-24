import { API_Url } from "utils/API";

export const fetchAverageDwellTime = async (storeId) => {
  const url = `${API_Url}/AverageDwellTime?store_id=${storeId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching channel data:', error);
    return null;
  }
};

export const fetchDwellTimeDistribution = async (storeId) => {
  const url = `${API_Url}/dwell_time_distribution?store_id=${storeId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching line chart data:', error);
    return null;
  }
};

export const fetchDwellTimePerDay = async (storeId) => {
  const url = `${API_Url}/dwell_time_per_day?store_id=${storeId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching horizontal bar chart data:', error);
    return null;
  }
};

export const fetchPeakHoursData = async (storeId) => {
    const url = `${API_Url}/hourly_dwell_time?store_id=${storeId}&date=2024-06-02`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching horizontal bar chart data:', error);
      return null;
    }
  };

  export const fetchFootfallContPerZone = async (storeId) => {
    const url = `${API_Url}/count_per_zone?store_id=${storeId}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching horizontal bar chart data:', error);
      return null;
    }
  };


  export const fetchFootfallHourly = async (storeId) => {
    const url = `${API_Url}/hourly_footfall?store_id=${storeId}&date=2024-06-02`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching horizontal bar chart data:', error);
      return null;
    }
  };

  export const fetchDistributionOfVisitorsByAgeGroup = async (storeId) => {
    const url = `${API_Url}/demographics?store_id=${storeId}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching horizontal bar chart data:', error);
      return null;
    }
  };