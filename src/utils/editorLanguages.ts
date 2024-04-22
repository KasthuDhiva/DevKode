// editorLanguages.ts

import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";

export type EditorLanguage = "JavaScript" | "C++" | "Python" | "Java";

export const languageMap: Record<EditorLanguage, () => any> = {
  JavaScript: () => javascript(),
  "C++": () => cpp(),
  Python: () => python(),
  Java: () => java(),
};
