
import { CodeEditorState } from './../types/index';
import { create } from "zustand"

const getIntialState = () => {
    if (typeof window === "undefined") {
        return {
            language: "javascript",
            theme: "vs-dark",
            fontSize: 14,
        }
    }

    return {
        language: localStorage.getItem("editor-language") || "javascript",
        theme: localStorage.getItem("editor-theme") || "vs-dark",
        fontSize: Number(localStorage.getItem("editor-fontSize")) || 14,
    }
}

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
    const intialState = getIntialState()
    return {
        ...intialState,
        output: "",
        isRunning: false,
        error: null,
        editor: null,
        executionResult: null,

        getCode: () => get().editor?.getValue() || "",
        setEditor: (editor) => {
            const savedCode = localStorage.getItem(`editor-code-${get().language}`)

            if (savedCode) editor.setValue(savedCode)

            set({ editor })
        },
        setLanguage: (language) => {
            const currentCode = get().editor.getValue()

            if (currentCode) {
                localStorage.setItem(`editor-code-${get().language}`, currentCode)
            }

            localStorage.setItem("editor-language", language)

            set({
                language,
                output: "",
                error: null
            })
        },
        setTheme: (theme) => {
            localStorage.setItem("editor-theme", theme)
            set({ theme })
        },
        setFontSize: (fontSize) => {
            localStorage.setItem("editor-fontSize", fontSize.toString())
            set({ fontSize })
        },
        runCode: async () => { },
    }
})