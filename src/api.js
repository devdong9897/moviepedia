export async function getReviews({
  order = "createdAt",
  offset = 0,
  limit = 6,
}) {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(
    `https://learn.codeit.kr/api/film-reviews?${query}`
  );
  // response상태 체크(response가 ok가 아니라면 에러메시지 띄움)
  if (!response.ok) {
    throw new Error("리뷰를 불러오는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}
