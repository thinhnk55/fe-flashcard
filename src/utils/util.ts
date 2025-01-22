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

export const processTemplate = (
  template: string,
  values: { [key: string]: string | number }
): string => {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return values[key] !== undefined ? String(values[key]) : `{{${key}}}`;
  });
};
