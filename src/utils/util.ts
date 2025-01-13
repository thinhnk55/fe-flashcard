export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateLength = (
  value: string,
  from: number,
  to: number
): boolean => {
  return value.length >= from && value.length <= to;
};
