const BASE_URL = "https://learn.codeit.kr/api";

export async function getReviews({
  order = "createdAt",
  offset = 0,
  limit = 6,
}) {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(`${BASE_URL}/film-reviews?${query}`);
  // response상태 체크(response가 ok가 아니라면 에러메시지 띄움)
  if (!response.ok) {
    throw new Error("리뷰를 불러오는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

// formData는 ReviewForm컴포넌트에서 전달 받음.
export async function createReview(formData) {
  const response = await fetch(`${BASE_URL}/film-reviews`, {
    method: "POST",
    body: formData,
  });
  // response상태 체크(response가 ok가 아니라면 에러메시지 띄움)
  if (!response.ok) {
    throw new Error("리뷰를 생성하는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}
