import React from "react";
import { useTranslation } from "react-i18next";

interface EmailInputProps {
  onChange?: (value: string) => void;
  required?: boolean;
  value?: string;
  label: string;
  placeholder: string;
}

export const EmailInput: React.FC<EmailInputProps> = ({
  onChange,
  required = false,
  value,
  label,
  placeholder,
}) => {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <label htmlFor="email" className="block mb-2 font-medium text-text-950">
        {label}
      </label>
      <input
        type="email"
        id="email"
        className="w-full p-2 bg-gray-50 border border-text-900 text-text-950 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 rounded-md"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
        autoComplete="email"
      />
    </div>
  );
};
