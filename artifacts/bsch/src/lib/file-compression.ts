const MAX_INPUT_BYTES = 12 * 1024 * 1024;
const MAX_IMAGE_SIDE = 1800;
const IMAGE_QUALITY = 0.8;
const ALLOWED_TYPES = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp"]);

function readAsDataUrl(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("تعذر قراءة الملف"));
    reader.readAsDataURL(file);
  });
}

function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("تعذر قراءة الصورة"));
    image.src = dataUrl;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("تعذر ضغط الصورة")), "image/webp", IMAGE_QUALITY);
  });
}

export async function readAndCompressFile(file: File): Promise<{ name: string; data: string; mimeType: string }> {
  if (!ALLOWED_TYPES.has(file.type)) throw new Error("نوع الملف غير مسموح. استخدم PDF أو JPG أو PNG أو WebP");
  if (file.size > MAX_INPUT_BYTES) throw new Error("حجم الملف أكبر من 12MB");
  if (!file.type.startsWith("image/")) {
    return { name: file.name, data: await readAsDataUrl(file), mimeType: file.type || "application/octet-stream" };
  }

  const original = await readAsDataUrl(file);
  const image = await loadImage(original);
  const scale = Math.min(1, MAX_IMAGE_SIDE / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("المتصفح لا يدعم معالجة الصور");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  const compressed = await canvasToBlob(canvas);
  return {
    name: file.name.replace(/\.(jpe?g|png|webp)$/i, ".webp"),
    data: await readAsDataUrl(compressed),
    mimeType: "image/webp",
  };
}
