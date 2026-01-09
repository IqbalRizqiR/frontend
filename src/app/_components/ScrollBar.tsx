// components/CustomScrollbar.tsx
"use client";

export default function CustomScrollbar() {
  return (
    <style jsx global>{`
      /* Firefox */
      * {
        scrollbar-width: thin;
        scrollbar-color: #ef4444 transparent;
      }

      /* Chrome, Edge, Safari */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background: #ef4444;
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #dc2626;
      }
    `}</style>
  );
}

// =============================================
// ALTERNATIF: Jika ingin lebih fleksibel dengan props
// =============================================

interface CustomScrollbarProps {
  thumbColor?: string;
  thumbHoverColor?: string;
  trackColor?: string;
  width?: string;
}

export function CustomScrollbarWithProps({
  thumbColor = "#ef4444",
  thumbHoverColor = "#dc2626",
  trackColor = "transparent",
  width = "8px",
}: CustomScrollbarProps) {
  return (
    <style jsx global>{`
      /* Firefox */
      * {
        scrollbar-width: thin;
        scrollbar-color: ${thumbColor} ${trackColor};
      }

      /* Chrome, Edge, Safari */
      ::-webkit-scrollbar {
        width: ${width};
        height: ${width};
      }

      ::-webkit-scrollbar-track {
        background: ${trackColor};
      }

      ::-webkit-scrollbar-thumb {
        background: ${thumbColor};
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: ${thumbHoverColor};
      }
    `}</style>
  );
}