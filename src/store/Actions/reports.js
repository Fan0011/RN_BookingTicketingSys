import {
  axios,
  getAnnualIncome,
  getError,
  getReportsByFilter,
  getReportsByReplyCount,
  getReportsByResponseTime,
  getConfigReportsDownload,
  getCurrentDate,
} from "lib";
import { toast } from "react-toastify";
import {
  getAnnualReportsDispatch,
  getReplyReportsDispatch,
  getReportsByCustomerDispatch,
  getReportsByAgentDispatch,
  getReportsByDepartmentDispatch,
  getReportsByPriorityDispatch,
  getReportsByStatusDispatch,
  getResponseReportsDispatch,
  setReportsLoading,
} from "store/Slices";
import { saveAs } from "file-saver";
// Get Annual Reports By Year
export const getAnnualReports = ({ year }) => {
  return async (dispatch) => {
    dispatch(setReportsLoading(true));
    try {
      const { url, config } = getAnnualIncome({ year });
      const res = await axios.get(url, config);
      dispatch(getAnnualReportsDispatch(res?.data?.data?.annualIncomeDetails));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setReportsLoading(false));
    }
  };
};

// Get Response Reports By Start and End Dates
export const getResponseReports = ({ startDate, endDate }) => {
  return async (dispatch) => {
    dispatch(setReportsLoading(true));
    try {
      const { url, config } = getReportsByResponseTime({ startDate, endDate });
      const res = await axios.get(url, config);
      dispatch(
        getResponseReportsDispatch(res?.data?.data?.ticketResponseTimeDetails)
      );
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setReportsLoading(false));
    }
  };
};

// Get Reply Reports By Start and End Dates
export const getReplyReports = ({ startDate, endDate }) => {
  return async (dispatch) => {
    dispatch(setReportsLoading(true));
    try {
      const { url, config } = getReportsByReplyCount({ startDate, endDate });
      const res = await axios.get(url, config);
      dispatch(
        getReplyReportsDispatch(res?.data?.data?.noOfRepliesPerTicketsDetails)
      );
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setReportsLoading(false));
    }
  };
};

// Get Reports By Customers
export const getReportsByCustomer = ({ startDate, endDate }) => {
  return async (dispatch) => {
    dispatch(setReportsLoading(true));
    try {
      const { url, config } = getReportsByFilter({
        reportField: 0,
        startDate,
        endDate,
      });
      const res = await axios.get(url, config);
      dispatch(getReportsByCustomerDispatch(res?.data?.data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setReportsLoading(false));
    }
  };
};

// Get Reports By Agent
export const getReportsByAgent = ({ startDate, endDate }) => {
  return async (dispatch) => {
    dispatch(setReportsLoading(true));
    try {
      const { url, config } = getReportsByFilter({
        reportField: 1,
        startDate,
        endDate,
      });
      const res = await axios.get(url, config);
      dispatch(getReportsByAgentDispatch(res?.data?.data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setReportsLoading(false));
    }
  };
};

// Get Reports By Status
export const getReportsByStatus = ({ startDate, endDate }) => {
  return async (dispatch) => {
    dispatch(setReportsLoading(true));
    try {
      const { url, config } = getReportsByFilter({
        reportField: 2,
        startDate,
        endDate,
      });
      const res = await axios.get(url, config);
      dispatch(getReportsByStatusDispatch(res?.data?.data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setReportsLoading(false));
    }
  };
};

// Get Reports By Department
export const getReportsByDepartment = ({ startDate, endDate }) => {
  return async (dispatch) => {
    dispatch(setReportsLoading(true));
    try {
      const { url, config } = getReportsByFilter({
        reportField: 3,
        startDate,
        endDate,
      });
      const res = await axios.get(url, config);
      dispatch(getReportsByDepartmentDispatch(res?.data?.data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setReportsLoading(false));
    }
  };
};

// Get Reports By Priority
export const getReportsByPriority = ({ startDate, endDate }) => {
  return async (dispatch) => {
    dispatch(setReportsLoading(true));
    try {
      const { url, config } = getReportsByFilter({
        reportField: 4,
        startDate,
        endDate,
      });
      const res = await axios.get(url, config);
      dispatch(getReportsByPriorityDispatch(res?.data?.data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setReportsLoading(false));
    }
  };
};

//Get Reports For Download
export const getReportsForDownload = ({
  moduletype,
  userId,
  startDate,
  endDate,
  clientName,
}) => {
  return async (dispatch) => {
    dispatch(setReportsLoading(true));
    try {
      const { url, config } = getConfigReportsDownload({
        moduletype,
        userId,
        startDate,
        endDate,
      });     
      const configT = {...config, responseType: "blob"}
      const res = await axios.get(url, configT);
      const contentType = res.headers["content-type"];
      console.log('res', contentType);
      const urlFile = window.URL.createObjectURL(new Blob([res.data],{type:contentType}));
      const date = getCurrentDate();
      const fileName = clientName + "-Download-" + date + ".xls";
      saveAs(urlFile, fileName)
      toast(`Downloaded file successfully`);
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setReportsLoading(false));
    }
  };
};
