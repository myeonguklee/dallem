export function formatDateAndTime(isoString: string, locale: string) {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedYearMonthDay = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  // 날짜를 locale에 맞게 "7월 7일" or "July 7" 같이 포맷팅
  const formattedDate = new Intl.DateTimeFormat(locale, {
    month: 'long',
    day: 'numeric',
  }).format(date);

  // 시간은 24시간 기준 HH:mm 포맷
  const formattedTime = date.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return { formattedYearMonthDay, formattedDate, formattedTime };
}
