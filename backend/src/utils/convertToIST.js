export function convertUTCtoIST(utcDateStr) {
    const utcDate = new Date(utcDateStr);
  
    // IST is UTC + 5 hours 30 minutes => 330 minutes
    const istOffset = 330 * 60 * 1000;
  
    const istDate = new Date(utcDate.getTime() + istOffset);
  
    return istDate.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
    });
  }

  