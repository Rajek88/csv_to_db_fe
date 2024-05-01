export function convertToHumanFriendlyTime(timestamp) {
  if (!timestamp) {
    return;
  }

  // Create a Date object from the UTC time string
  const utcDate = new Date(timestamp);

  // Format the date and time
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };

  // Format the IST date string
  const istTimeString = utcDate.toLocaleString("en-IN", options);

  return `${istTimeString}`;
}
