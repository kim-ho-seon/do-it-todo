const BASE_URL = "https://assignment-todolist-api.vercel.app/api";
const TENANT_ID = "dotodo-kmad";
const API = `${BASE_URL}/${TENANT_ID}`;

// GET

// 목록 조회
export async function getTodos() {
  const res = await fetch(`${API}/items?page=1&pageSize=100`);
  if (!res.ok) throw new Error(`요청 실패: ${res.status}`);
  return res.json();
}

// 상세 조회
export async function getTodo(id: number) {
  const res = await fetch(`${API}/items/${id}`);
  if (!res.ok) throw new Error(`요청 실패: ${res.status}`);
  return res.json();
}

// DELETE
export async function deleteTodo(id: number) {
  const res = await fetch(`${API}/items/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`요청 실패: ${res.status}`);
  return res.json();
}

// 추가: POST- 이름만 전송, id는 서버에서 생성
export async function createTodo(name: string) {
  const res = await fetch(`${API}/items`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({name}),
  });
  if (!res.ok) throw new Error(`요청 실패: ${res.status}`);
  return res.json();
}

// 수정: PATCH - 바꿀 항목만 전송
export async function updateTodo(id: number, data: {name?: string; memo?: string; imageUrl?: string; isCompleted?: boolean}) {
  const res = await fetch(`${API}/items/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`요청 실패: ${res.status}`);
  return res.json();
}

// 이미지 업로드: POST - FormData로 전송, 이미지 주소 반환
export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${API}/images/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error(`요청 실패: ${res.status}`);
  const data = await res.json();
  return data.url;
}
