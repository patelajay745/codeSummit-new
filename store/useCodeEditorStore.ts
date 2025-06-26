
import { LANGUAGE_CONFIG } from '@/app/(root)/_constants';
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
            const currentCode = get().editor?.getValue()

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
        runCode: async () => {
            const { language, getCode } = get()

            const code = getCode()

            if (!code) {
                set({ error: "Please enter some code" })
                return
            }

            set({ isRunning: true, error: null, output: "" })

            try {
                const runtime = LANGUAGE_CONFIG[language].pistonRuntime
                const response = await fetch("https://emkc.org/api/v2/piston/execute", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        language: runtime.language,
                        version: runtime.version,
                        files: [{ content: code }]
                    })
                })

                const data = await response.json()

                if (data.message) {
                    set({ error: data.message, executionResult: { code, error: data.message, output: "" } })
                }

                if (data.compile && data.compile.code !== 0) {
                    const error = data.compile.stderr || data.compile.output

                    set({
                        error, executionResult: {
                            code, output: "", error
                        }
                    })

                    return
                }

                if (data.run && data.run.code !== 0) {
                    const error = data.run.stderr || data.run.output

                    set({
                        error, executionResult: {
                            code, output: "", error
                        }
                    })

                    return
                }

                const output = data.run.output

                set({
                    output: output.trim(), error: null, executionResult: {
                        code,
                        output: output.trim(),
                        error: null
                    }
                })

            } catch (error) {

                set({
                    error: "error while running code", executionResult: {
                        code,
                        output: "",
                        error: "error while running code"
                    }
                })
            } finally {
                set({ isRunning: false })
            }

        },
    }
})

export const getExecutionResult = () => useCodeEditorStore.getState().executionResult