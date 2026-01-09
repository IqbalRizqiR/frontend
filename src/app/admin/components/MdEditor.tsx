"use client";

import { fileSizeToMb } from "@/utils/database/atomics";
import MDEditor, {
  commands,
  bold,
  italic,
  strikethrough,
  title,
  divider,
  link,
  quote,
  code,
  hr,
  codeBlock,
  comment,
  table,
  unorderedListCommand,
  orderedListCommand,
  checkedListCommand,
  TextAreaTextApi,
} from "@uiw/react-md-editor";
import { ChangeEvent, useRef } from "react";
import { FaFileImage } from "react-icons/fa";
import { toast } from "sonner";

export default function Editor({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (
    value?: string | undefined,
    event?: ChangeEvent<HTMLTextAreaElement> | undefined,
  ) => void;
  label?: string;
}) {
  const insertImageRef = useRef<HTMLInputElement>(null);

  const insertImage: commands.ICommand = {
    name: "Insert image",
    keyCommand: "Insert upload",
    buttonProps: { "aria-label": "Insert an image" },
    icon: <FaFileImage />,
    execute: async (_, api: TextAreaTextApi) => {
      const file = await getImage();
      if (!file) return toast.error("Gagal memilih gambar");

      const imageSizeInMb = fileSizeToMb(file.size);
      if (imageSizeInMb >= 4.3)
        return toast.error("Ukuran file terlalu besar! Maksimal 4.3 MB");

      try {
        const toastId = toast.loading("Mengunggah gambar ke Cloudinary...");

        // 🔧 Ganti dengan milik kamu
        const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
        const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();

        if (!res.ok || !data.secure_url) {
          throw new Error(data.error?.message || "Upload gagal");
        }

        const imageUrl = data.secure_url;
        const markdownImage = `![uploaded image](${imageUrl})\n`;

        api.replaceSelection(markdownImage);
        toast.success("Gambar berhasil diunggah!", { id: toastId });
      } catch (error: any) {
        console.error(error);
        toast.error("Gagal mengunggah gambar");
      } finally {
        if (insertImageRef.current) insertImageRef.current.value = "";
      }
    },
  };

  function getImage(): Promise<File | null> {
    return new Promise((resolve, reject) => {
      if (!insertImageRef.current) return resolve(null);

      insertImageRef.current.onchange = () => {
        try {
          if (!confirm("Upload gambar ini?")) {
            insertImageRef.current!.value = "";
            return;
          }
          resolve(insertImageRef.current!.files?.[0] || null);
        } catch (e) {
          reject(e);
        }
      };
      insertImageRef.current.click();
    });
  }

  const toolbarCommands = [
    bold,
    italic,
    strikethrough,
    hr,
    title,
    divider,
    link,
    quote,
    code,
    codeBlock,
    comment,
    insertImage,
    table,
    divider,
    unorderedListCommand,
    orderedListCommand,
    checkedListCommand,
  ];

  return (
    <div data-color-mode="light">
      <label htmlFor="textEditor">{label ?? "Text Editor"}</label>
      <input
        type="file"
        hidden
        name="insertImage"
        ref={insertImageRef}
        accept="image/gif,image/jpeg,image/jpg,image/png,image/webp,image/svg"
      />
      <MDEditor
        value={value}
        onChange={onChange}
        className="[&>div.w-md-editor-content>div.w-md-editor-preview]:prose"
        height={600}
        style={{
          backgroundColor: "#fff",
          color: "#000",
          fontFamily: "inherit",
          padding: 0,
        }}
        id="textEditor"
        commands={toolbarCommands}
      />
    </div>
  );
}
