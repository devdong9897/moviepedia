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

export async function updateReview(id, formData) {
  // 여기서 id는 어떤 리뷰를 수정할 지 서버에 알려주는 용도이다.
  const response = await fetch(`${BASE_URL}/film-reviews/${id}`, {
    // 수정을 의미하는 PUT을 사용.
    method: "PUT",
    // 수정된 데이터를 서버로 전송.
    body: formData,
  });
  // response상태 체크(response가 ok가 아니라면 에러메시지 띄움)
  if (!response.ok) {
    throw new Error("리뷰를 수정하는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function deleteReview(id, formData) {
  
  const response = await fetch(`${BASE_URL}/film-reviews/${id}`, {
    // 삭제을 의미하는 PUT을 사용.
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("리뷰를 삭제하는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}
