# Admin Panel - Fix Roadmap

## 1) Dropdown/Popover architecture duplication & z-index stability
- [ ] Inspect all dropdown/popover components and list their placement/backdrop/z-index behavior.
- [ ] Create a shared `components/ui/DropdownPanel` (or `PopoverMenu`) primitive that:
  - handles open/close
  - click-outside + Escape
  - consistent mobile backdrop + scroll lock
  - consistent panel positioning rules
  - central z-index scale
- [ ] Refactor `NotificationMenu` to use the shared primitive.
- [ ] Refactor `ProfileDropdown` to use the shared primitive.
- [ ] (Optional in this category) Refactor any additional dropdowns found (e.g., FlaggedActivityFeed) to reduce duplication.
- [ ] Validate responsive behavior manually (mobile + desktop) focusing on clipping/overflow/z-index.

## 2) Button system inconsistency
- [ ] Align all header/action buttons to use `components/ui/Button.jsx`.
- [ ] Ensure Jackpot page UI is the “design reference” (variants, sizing, padding).
- [ ] Ensure Overview page behavior is the “behavior reference” (hover/active/focus).
- [ ] Update remaining raw `<button>` styles to the shared button system.

## 3) Responsive overflow/sticky clipping issues
- [ ] Audit scroll containers: `PageContainer overflow-y-auto` + sticky topbar.
- [ ] Identify any components with `overflow-hidden` that might affect panels.
- [ ] Ensure dropdown panels don’t get clipped; consider portal if needed.
- [ ] Validate sticky/scroll interactions at key breakpoints.

## 4) General UI consistency cleanup
- [ ] Standardize spacing/padding patterns for headers/cards.
- [ ] Standardize card shells and section headers.
- [ ] Reduce mixed Tailwind/MUI styling drift where applicable.
- [ ] Final visual pass for alignment and consistency.

