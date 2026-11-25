const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

// 첨부 이미지 검사 - 조건: 이미지 파일, 영어 파일명, 5MB 이하
// 문제가 있으면 에러 메시지, 통과하면 null
export function validateImage(file: File): string | null {
  if (!file.type.startsWith("image/")) {
    return "이미지 파일만 첨부할 수 있어요.";
  }

  const baseName = file.name.replace(/\.[^.]+$/, ""); // 확장자 제외
  if (!/^[a-zA-Z]+$/.test(baseName)) {
    return "파일 이름은 영어로만 되어 있어야 해요.";
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return "5MB 이하 이미지만 첨부할 수 있어요.";
  }

  return null;
}
