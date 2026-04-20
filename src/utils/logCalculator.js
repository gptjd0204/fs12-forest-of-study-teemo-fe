export const calculateDailyTotals = (pointLogs = [], focusLogs = []) => {
  const point = pointLogs.reduce((acc, log) => 
    acc + (log.points || 0), 0);
  const focus = focusLogs.reduce((acc, log) => 
    acc + (Number(log.focusDuration) || 0), 0);
  
  return { point, focus };
};