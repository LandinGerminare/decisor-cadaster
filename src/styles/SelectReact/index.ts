export const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    padding: "0 8px",
    borderColor: "#41454e",
    borderRadius: "8px",
    backgroundColor: state.isDisabled ? "#2a2c32" : "transparent",
    color: "white",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(131, 59, 11, 0.2)" : "none",
    cursor: "pointer",
    "&:hover": {
      borderColor: "#833b0b",
    },
    height: "4rem",
    minHeight: "4rem",
    "@media (min-width: 2200px)": {
      height: "4rem",
    },
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: "0 8px",
  }),
  input: (base: any) => ({
    ...base,
    color: "#FFF",
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#833b0b"
      : state.isFocused
      ? "#833b0b"
      : "#2a2c32",
    color: "white",
    border: "none",
    padding: "10px",
    margin: "0",
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: "#2a2c32",
    borderRadius: "8px",
    padding: "0",
    margin: "0",
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#FFF",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "#FFF",
  }),
  menuList: (base: any) => ({
    ...base,
    maxHeight: "300px",
    overflowY: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: "var(--primary-900) var(--neutral-200)",
    "&::-webkit-scrollbar": {
      width: "0.4rem",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: "100vh",
      background: "var(--neutral-200)",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "var(--primary-900)",
      borderRadius: "100vh",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "var(--primary-600)",
    },
  }),
  noOptionsMessage: (base: any) => ({
    ...base,
    backgroundColor: "#2a2c32",
    color: "#FFF",
    padding: "10px",
  }),
};
