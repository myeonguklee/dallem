export function formatDateAndTime(isoString: string) {
  const date = new Date(isoString);
  date.setHours(date.getHours() + 9); // KST 보정

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${month}월 ${day}일`;
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

  return { formattedDate, formattedTime };
}
