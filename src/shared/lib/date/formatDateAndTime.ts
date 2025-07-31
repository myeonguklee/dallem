export function formatDateAndTime(isoString: string) {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // 2025-01-01T00:00:00Z -> 2025-01-01
  const formattedYearMonthDay = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  // 2025-01-01T00:00:00Z -> 1월 1일
  const formattedDate = `${month}월 ${day}일`;
  // 2025-01-01T07:09:00Z -> 07:09
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

  return { formattedYearMonthDay, formattedDate, formattedTime };
}
