import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginBottom: "20px",
    "& thead th": {
      backgroundColor: "#e0e0e0",
      fontWeight: "bold",
      fontSize: "16px",
    },
    "& tbody tr:nth-of-type(odd)": {
      backgroundColor: "#f9f9f9",
    },
    "& tbody tr:hover": {
      backgroundColor: "#f1f8ff",
    },
  },
  button: {
    margin: "0 5px",
  },
  onlineStatus: {
    color: "#4caf50",
    fontWeight: "bold",
  },
  offlineStatus: {
    color: "#f44336",
    fontWeight: "bold",
  },
  sectionHeader: {
    backgroundColor: "#1976d2",
    color: "#ffffff",
    padding: "10px 15px",
    fontWeight: "bold",
    borderRadius: "4px",
    marginBottom: "10px",
  },
  sectionHeaderUser: {
    backgroundColor: "#f57c00",
    color: "#ffffff",
    padding: "10px 15px",
    fontWeight: "bold",
    borderRadius: "4px",
    marginBottom: "10px",
  },
  avatar: {
    marginRight: "10px",
  },
});
