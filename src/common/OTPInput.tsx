import React, { useState } from "react";

interface OTPInputProps {
  value: string; // The OTP string from the parent component
  onChange: (value: string) => void; // Callback to update the OTP string
}

const OTPInput: React.FC<OTPInputProps> = ({ value, onChange }) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

  const handleChange = (index: number, newValue: string) => {
    const sanitizedValue = newValue.replace(/[^0-9]/g, ""); // Allow only numbers
    if (sanitizedValue.length > 1) return; // Prevent multiple characters

    const updatedOtp = [...otp];
    updatedOtp[index] = sanitizedValue;
    setOtp(updatedOtp);

    // Concatenate the OTP array into a single string and pass it to the parent component
    onChange(updatedOtp.join(""));

    // Move focus to the next cell
    if (sanitizedValue && index < 5) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6); // Max 6 digits
    const sanitizedData = pastedData.replace(/[^0-9]/g, ""); // Allow only numbers

    const updatedOtp = [...otp];
    for (let i = 0; i < sanitizedData.length; i++) {
      if (i >= 6) break;
      updatedOtp[i] = sanitizedData[i];
    }
    setOtp(updatedOtp);
    onChange(updatedOtp.join("")); // Update the OTP as a single string
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      const updatedOtp = [...otp];
      updatedOtp[index] = "";
      setOtp(updatedOtp);
      onChange(updatedOtp.join("")); // Update the OTP as a single string

      // Move focus to the previous cell on Backspace
      if (e.key === "Backspace" && index > 0) {
        document.getElementById(`otp-input-${index - 1}`)?.focus();
      }
    }
  };

  return (
    <div className="w-full flex justify-between">
      {otp.map((value, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          required={true}
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-lg border border-text-900 text-text-950 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 rounded-md"
        />
      ))}
    </div>
  );
};

export default OTPInput;
