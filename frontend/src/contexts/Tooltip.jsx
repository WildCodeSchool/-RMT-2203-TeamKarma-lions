import React, { createContext, useMemo } from "react";
// create the context object here…
const ToolTipContext = createContext();
export default ToolTipContext;
// and then export a wrapper that manages state :

// eslint-disable-next-line react/prop-types
export function ToolTipContextProvider({ children }) {
  const tooltip = useMemo(() => ({}));

  return (
    <ToolTipContext.Provider value={tooltip}>
      {children}
    </ToolTipContext.Provider>
  );
}
