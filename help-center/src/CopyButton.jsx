"use client";
import { useState } from "react";
export default function CopyButton({ text, label }) {
  const [message, setMessage] = useState("");
  return (
    <>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text);
            setMessage("복사했습니다.");
          } catch {
            setMessage(
              "복사하지 못했습니다. 문구를 직접 선택해 복사하세요.",
            );
          }
        }}
      >
        {label}
      </button>
      <span aria-live="polite">{message}</span>
    </>
  );
}
