import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

interface PasswordInputProps {
  label: string;
  placeholder: string;
  id: string;
  onChange?: (value: string) => void;
  required?: boolean;
  value?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  placeholder,
  id,
  onChange,
  required = false,
  value,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="w-full">
      <label htmlFor={id} className="block mb-2 font-medium text-text-950">
        {label}
      </label>
      <div className="relative">
        <input
          type={isVisible ? "text" : "password"}
          id={id}
          className="w-full p-2 bg-gray-50 border border-text-900 text-text-950 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 rounded-md"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-primary-500"
          aria-label={isVisible ? "Hide password" : "Show password"}
        >
          {isVisible ? (
            <Icon icon="weui:eyes-off-filled" width={24} height={24} />
          ) : (
            <Icon icon="weui:eyes-on-filled" width={24} height={24} />
          )}
        </button>
      </div>
    </div>
  );
};
