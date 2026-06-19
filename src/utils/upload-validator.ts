import { message } from "antd";

/**
 * Validates if a file is an image and its size is under 10MB.
 * @param file The File object to validate
 * @returns boolean True if valid, false otherwise
 */
export const validateImageFile = (file: File): boolean => {
  if (!file) return false;

  // Validate type (must start with image/)
  if (!file.type.startsWith("image/")) {
    message.error(`Tệp "${file.name}" không phải là ảnh hợp lệ. Vui lòng chọn định dạng ảnh (png, jpg, jpeg, webp, gif)!`);
    return false;
  }

  // Validate size (maximum is 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    message.error(`Kích thước file "${file.name}" quá lớn (${(file.size / 1024 / 1024).toFixed(2)}MB). Kích thước tối đa cho phép là 10MB.`);
    return false;
  }

  return true;
};

/**
 * Extracts detailed error message from Axios / Cloudinary upload errors
 * @param error Error object thrown
 * @returns string The detailed message
 */
export const getUploadErrorMessage = (error: any): string => {
  if (error.response?.data?.error?.message) {
    return error.response.data.error.message;
  }
  return error.message || "Lỗi không xác định khi upload ảnh";
};

/**
 * Extracts and formats detailed error messages from backend Laravel validation (422) response
 * @param error The RTK query / fetch error object
 * @param defaultMsg Default message if extraction fails
 * @returns string Formatted error message
 */
export const getValidationErrorMessage = (error: any, defaultMsg: string): string => {
  const validationErrors = error?.data?.errors || error?.data?.error;
  if (validationErrors && typeof validationErrors === "object") {
    return Object.keys(validationErrors)
      .map((key) => {
        const fieldError = validationErrors[key];
        return Array.isArray(fieldError) ? fieldError[0] : fieldError;
      })
      .join(", ");
  }
  if (error?.data?.message) {
    return error.data.message;
  }
  if (error?.message) {
    return error.message;
  }
  return defaultMsg;
};

/**
 * Extracts the first numeric value from a string or returns the value if it's already a number.
 * Defaults to 0 if no digits are found.
 * @param val Any value
 * @returns number
 */
export const extractNumber = (val: any): number => {
  if (typeof val === "number") return val;
  if (!val) return 0;
  const match = String(val).match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};
