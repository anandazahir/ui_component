"use client";

import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion"; // Import Framer Motion
import { Send } from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  message: string;
}

interface FormErrors {
  fullName: string;
  email: string;
  message: string;
}

export const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    fullName: "",
    email: "",
    message: "",
  });

  // Animasi untuk border
  const fullNameBorderControls = useAnimation();
  const emailBorderControls = useAnimation();
  const messageBorderControls = useAnimation();

  // State untuk animasi tombol

  const validateForm = (): boolean => {
    let isValid = true;

    const newErrors: FormErrors = { fullName: "", email: "", message: "" };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Simulate form submission (e.g., API call)
      setTimeout(() => {
        // Clear form data
        setFormData({ fullName: "", email: "", message: "" });
        // Show success toast
      }, 700); // Simulate a delay for the API call
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
        noValidate
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="col-span-1 md:col-span-2">
          <div className="relative">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              onFocus={() => fullNameBorderControls.start({ scaleX: 1 })}
              onBlur={() => fullNameBorderControls.start({ scaleX: 0 })}
              className="w-full px-3 py-2 bg-transparent border-t-0 border-r-0 border-l-0 dark:text-white border-b-2 border-gray-700 focus:outline-none rounded-[0px]"
            />
            <motion.div
              className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-400 origin-left"
              initial={{ scaleX: 0 }} // Start with no width
              animate={fullNameBorderControls} // Control animation
              transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
            />
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {" "}
              <i className="fa-solid fa-triangle-exclamation mr-2"></i>
              {errors.fullName}
            </p>
          )}
        </div>
        <div className="col-span-1 md:col-span-2">
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => emailBorderControls.start({ scaleX: 1 })}
              onBlur={() => emailBorderControls.start({ scaleX: 0 })}
              className="w-full px-3 py-2 bg-transparent border-t-0 border-r-0 border-l-0 dark:text-white border-b-2 border-gray-700 focus:outline-none rounded-[0px]"
            />
            <motion.div
              className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-400 origin-left"
              initial={{ scaleX: 0 }} // Start with no width
              animate={emailBorderControls} // Control animation
              transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              <i className="fa-solid fa-triangle-exclamation mr-2"></i>
              {errors.email}
            </p>
          )}
        </div>
        <div className="col-span-1 md:col-span-2">
          <div className="relative">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => messageBorderControls.start({ scaleX: 1 })}
              onBlur={() => messageBorderControls.start({ scaleX: 0 })}
              className="w-full px-3 py-2 bg-transparent border-t-0 border-r-0 border-l-0 dark:text-white border-b-2 border-gray-700 focus:outline-none h-64 resize-none rounded-[0px]"
            />
            <motion.div
              className="absolute bottom-2 left-0 w-full h-0.5 bg-sky-400 origin-left"
              initial={{ scaleX: 0 }} // Start with no width
              animate={messageBorderControls} // Control animation
              transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
            />
          </div>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              <i className="fa-solid fa-triangle-exclamation mr-2"></i>
              {errors.message}
            </p>
          )}
        </div>
        <div className="col-span-1 md:col-span-2 w-fit place-self-end z-10">
          <button
            type="submit"
            className="w-full bg-gray-500 hover:bg-sky-400 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out flex gap-2 items-center overflow-hidden cursor-pointer"
          >
            <Send></Send>
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
