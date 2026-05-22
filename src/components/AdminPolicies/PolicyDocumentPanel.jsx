import { useState, useEffect } from "react";
import {
  Bold,
  Italic,
  Clock,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Palette,
  Save,
  Type,
  CheckCircle,
} from "lucide-react";
import SectionCard from "@/components/shared/SectionCard";
import Tabs from "@/components/shared/Tabs";
import { policyTabs, policyDocuments } from "@/data/policiesData";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle, Color, FontSize } from "@tiptap/extension-text-style";

// Helper function to convert the original policy schema (sections array) to HTML
function convertSectionsToHtml(sections) {
  if (!sections || !Array.isArray(sections)) return "";
  return sections
    .map((section) => {
      if (section.type === "heading") {
        return `<h4>${section.text}</h4>`;
      }
      if (section.type === "callout") {
        return `<blockquote><strong>${section.title || "Note"}</strong><br/>${section.text}</blockquote>`;
      }
      return `<p>${section.text}</p>`;
    })
    .join("");
}

export default function PolicyDocumentPanel() {
  const [activeTab, setActiveTab] = useState(policyTabs[0].id);
  const [showSavedAlert, setShowSavedAlert] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Initialize local state of policies converted to HTML format
  const [documents, setDocuments] = useState(() => {
    const initialDocs = {};
    Object.keys(policyDocuments).forEach((key) => {
      initialDocs[key] = {
        title: policyDocuments[key].title,
        lastSaved: policyDocuments[key].lastSaved,
        html: convertSectionsToHtml(policyDocuments[key].sections),
      };
    });
    return initialDocs;
  });

  const doc = documents[activeTab];

  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      TextStyle,
      Color,
      FontSize,
    ],
    content: doc.html,
    editorProps: {
      attributes: {
        class: "prose-policy focus:outline-none min-h-[350px] max-h-[500px] overflow-y-auto pr-2 text-sm leading-relaxed",
      },
    },
    onUpdate() {
      setIsDirty(true);
    },
  });

  // Sync editor content when changing active tab
  useEffect(() => {
    if (editor && doc) {
      editor.commands.setContent(doc.html);
      setIsDirty(false);
    }
  }, [activeTab, editor]);

  // Handle auto-saving content before tab change
  const handleTabChange = (newTabId) => {
    if (editor && isDirty) {
      const currentHtml = editor.getHTML();
      setDocuments((prev) => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          html: currentHtml,
          lastSaved: `Auto-saved at ${new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`,
        },
      }));
    }
    setActiveTab(newTabId);
    setIsDirty(false);
  };

  // Save manual modifications
  const handleSave = () => {
    if (!editor) return;
    const currentHtml = editor.getHTML();
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setDocuments((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        html: currentHtml,
        lastSaved: `at ${timeString}`,
      },
    }));

    setIsDirty(false);
    setShowSavedAlert(true);
    setTimeout(() => {
      setShowSavedAlert(false);
    }, 3000);
  };

  if (!editor) {
    return null;
  }

  // Premium Preset Colors
  const presetColors = [
    { name: "Default", value: "#0F172A" },
    { name: "Muted", value: "#64748B" },
    { name: "Emerald", value: "#10B981" },
    { name: "Blue", value: "#3B82F6" },
    { name: "Red", value: "#EF4444" },
    { name: "Orange", value: "#F59E0B" },
    { name: "Purple", value: "#8B5CF6" },
  ];

  return (
    <SectionCard bodyClassName="p-0">
      {/* Styles Injection for Tiptap Editor & Output Styling */}
      <style>{`
        .prose-policy {
          font-family: var(--font-family);
        }
        .prose-policy p {
          margin-bottom: 1rem;
          color: var(--text-light-color);
          line-height: 1.625;
        }
        .prose-policy h2 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: var(--text-color);
        }
        .prose-policy h3 {
          font-size: 1.125rem;
          font-weight: 700;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--text-color);
        }
        .prose-policy h4 {
          font-size: 1rem;
          font-weight: 700;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          color: var(--text-color);
        }
        .prose-policy blockquote {
          border-left: 4px solid var(--primary-color);
          background-color: var(--primary-light-color);
          padding: 1rem;
          border-radius: 0.5rem;
          margin: 1.25rem 0;
        }
        .prose-policy blockquote p {
          margin-bottom: 0;
          color: var(--text-color);
          font-style: italic;
        }
        .prose-policy ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          color: var(--text-light-color);
        }
        .prose-policy ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          color: var(--text-light-color);
        }
        .prose-policy li {
          margin-bottom: 0.25rem;
        }
        .prose-policy strong {
          font-weight: 700;
        }
        .prose-policy em {
          font-style: italic;
        }
      `}</style>

      <div className="px-6 pt-2">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <Tabs tabs={policyTabs} activeTab={activeTab} onChange={handleTabChange} />
          <div className="flex items-center gap-3 pb-3 lg:pb-0 shrink-0">
            {showSavedAlert ? (
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 animate-fade-in">
                <CheckCircle size={14} className="text-emerald-500" />
                Saved successfully!
              </span>
            ) : (
              <span
                className="flex items-center gap-1.5 text-xs whitespace-nowrap"
                style={{ color: "var(--text-light-color)" }}
              >
                <Clock size={14} />
                {isDirty ? (
                  <span className="flex items-center gap-1 text-amber-600 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Unsaved changes
                  </span>
                ) : (
                  `Last saved: ${doc.lastSaved}`
                )}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 border-t border-gray-100">
        <h2
          className="text-xl font-bold mt-5 mb-4"
          style={{ color: "var(--text-color)" }}
        >
          {doc.title}
        </h2>

        {/* Rich Text Editor Container */}
        <div className="border border-gray-200 rounded-xl overflow-hidden mt-4 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-default bg-white">
          {/* Tiptap Custom Toolbar */}
          <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-50 border-b border-gray-200">
            {/* Inline styles */}
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`h-8 w-8 rounded-lg grid place-items-center transition-default ${
                  editor.isActive("bold")
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
                title="Bold"
              >
                <Bold size={15} />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`h-8 w-8 rounded-lg grid place-items-center transition-default ${
                  editor.isActive("italic")
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
                title="Italic"
              >
                <Italic size={15} />
              </button>
            </div>

            {/* Separator */}
            <div className="h-4 w-px bg-gray-200 self-center mx-1" />

            {/* Paragraph / Headings */}
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={`h-8 px-2 text-xs font-semibold rounded-lg transition-default ${
                  editor.isActive("paragraph")
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
                title="Paragraph"
              >
                Normal
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`h-8 px-2 text-xs font-bold rounded-lg transition-default ${
                  editor.isActive("heading", { level: 2 })
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
                title="Heading 2"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`h-8 px-2 text-xs font-bold rounded-lg transition-default ${
                  editor.isActive("heading", { level: 3 })
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
                title="Heading 3"
              >
                H3
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                className={`h-8 px-2 text-xs font-bold rounded-lg transition-default ${
                  editor.isActive("heading", { level: 4 })
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
                title="Heading 4"
              >
                H4
              </button>
            </div>

            {/* Separator */}
            <div className="h-4 w-px bg-gray-200 self-center mx-1" />

            {/* Font Size Dropdown */}
            <div className="flex items-center gap-1">
              <Type size={14} className="text-gray-400 shrink-0" />
              <select
                value={editor.getAttributes("textStyle").fontSize || "14px"}
                onChange={(e) => {
                  const val = e.target.value;
                  editor.chain().focus().setFontSize(val).run();
                }}
                className="h-8 text-xs bg-white border border-gray-200 rounded-lg px-2 text-gray-700 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="12px">12px</option>
                <option value="14px">14px</option>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="20px">20px</option>
                <option value="24px">24px</option>
                <option value="30px">30px</option>
              </select>
            </div>

            {/* Separator */}
            <div className="h-4 w-px bg-gray-200 self-center mx-1" />

            {/* Color preset list & picker */}
            <div className="flex items-center gap-1">
              {presetColors.map((color) => {
                const isActive = editor.getAttributes("textStyle").color === color.value;
                return (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => editor.chain().focus().setColor(color.value).run()}
                    className={`h-5 w-5 rounded-full border transition-all ${
                      isActive
                        ? "ring-2 ring-emerald-500 ring-offset-1 scale-110 border-transparent"
                        : "border-gray-200 hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                );
              })}
              <label
                className="relative h-5 w-5 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-default"
                title="Custom Color"
              >
                <Palette size={10} className="text-gray-500" />
                <input
                  type="color"
                  value={editor.getAttributes("textStyle").color || "#0F172A"}
                  onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                />
              </label>
            </div>

            {/* Separator */}
            <div className="h-4 w-px bg-gray-200 self-center mx-1" />

            {/* Structure (lists, blockquote) */}
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`h-8 w-8 rounded-lg grid place-items-center transition-default ${
                  editor.isActive("bulletList")
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
                title="Bullet List"
              >
                <List size={15} />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`h-8 w-8 rounded-lg grid place-items-center transition-default ${
                  editor.isActive("orderedList")
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
                title="Numbered List"
              >
                <ListOrdered size={15} />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`h-8 w-8 rounded-lg grid place-items-center transition-default ${
                  editor.isActive("blockquote")
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
                title="Callout (Blockquote)"
              >
                <Quote size={15} />
              </button>
            </div>

            {/* Separator */}
            <div className="h-4 w-px bg-gray-200 self-center mx-1" />

            {/* Undo / Redo */}
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className="h-8 w-8 rounded-lg grid place-items-center transition-default text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
                title="Undo"
              >
                <Undo size={15} />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className="h-8 w-8 rounded-lg grid place-items-center transition-default text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
                title="Redo"
              >
                <Redo size={15} />
              </button>
            </div>

            {/* Save Button */}
            <button
              type="button"
              onClick={handleSave}
              className="ml-auto flex items-center gap-1.5 px-3 h-8 text-xs font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg shadow-sm transition-default cursor-pointer"
            >
              <Save size={13} />
              Save Changes
            </button>
          </div>

          {/* Interactive Text Canvas */}
          <div className="p-4 bg-white min-h-[350px] max-h-[500px] overflow-y-auto hide-scrollbar">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
