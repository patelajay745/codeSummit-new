
import { Monaco } from "@monaco-editor/react";

type languageConfig = Record<string, {
    id: string,
    label: string,
    logoPath: string,
    pistonRuntime: { language: string, version: string },
    monacoLanguage: string,
    defaultCode: string
}>

export const LANGUAGE_CONFIG: languageConfig = {
    javascript: {
        id: "javascript",
        label: "JavaScript",
        logoPath: "/javascript.png",
        pistonRuntime: { language: "javascript", version: "18.15.0" }, // api that we're gonna be using
        monacoLanguage: "javascript",
        defaultCode: `// JavaScript Playground
  const numbers = [1, 2, 3, 4, 5];
  
  // Map numbers to their squares
  const squares = numbers.map(n => n * n);
  console.log('Original numbers:', numbers);
  console.log('Squared numbers:', squares);
  
  // Filter for even numbers
  const evenNumbers = numbers.filter(n => n % 2 === 0);
  console.log('Even numbers:', evenNumbers);
  
  // Calculate sum using reduce
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  console.log('Sum of numbers:', sum);`,
    },
    typescript: {
        id: "typescript",
        label: "TypeScript",
        logoPath: "/typescript.png",
        pistonRuntime: { language: "typescript", version: "5.0.3" },
        monacoLanguage: "typescript",
        defaultCode: `// TypeScript Playground
  interface NumberArray {
    numbers: number[];
    sum(): number;
    squares(): number[];
    evenNumbers(): number[];
  }
  
  class MathOperations implements NumberArray {
    constructor(public numbers: number[]) {}
  
    sum(): number {
      return this.numbers.reduce((acc, curr) => acc + curr, 0);
    }
  
    squares(): number[] {
      return this.numbers.map(n => n * n);
    }
  
    evenNumbers(): number[] {
      return this.numbers.filter(n => n % 2 === 0);
    }
  }
  
  const math = new MathOperations([1, 2, 3, 4, 5]);
  
  console.log('Original numbers:', math.numbers);
  console.log('Squared numbers:', math.squares());
  console.log('Even numbers:', math.evenNumbers());
  console.log('Sum of numbers:', math.sum());`,
    },
    python: {
        id: "python",
        label: "Python",
        logoPath: "/python.png",
        pistonRuntime: { language: "python", version: "3.10.0" },
        monacoLanguage: "python",
        defaultCode: `# Python Playground
  numbers = [1, 2, 3, 4, 5]
  
  # Map numbers to their squares
  squares = [n ** 2 for n in numbers]
  print(f"Original numbers: {numbers}")
  print(f"Squared numbers: {squares}")
  
  # Filter for even numbers
  even_numbers = [n for n in numbers if n % 2 == 0]
  print(f"Even numbers: {even_numbers}")
  
  # Calculate sum
  numbers_sum = sum(numbers)
  print(f"Sum of numbers: {numbers_sum}")`,
    },
    java: {
        id: "java",
        label: "Java",
        logoPath: "/java.png",
        pistonRuntime: { language: "java", version: "15.0.2" },
        monacoLanguage: "java",
        defaultCode: `public class Main {
    public static void main(String[] args) {
        // Create array
        int[] numbers = {1, 2, 3, 4, 5};
        
        // Print original numbers
        System.out.print("Original numbers: ");
        printArray(numbers);
        
        // Calculate and print squares
        int[] squares = new int[numbers.length];
        for (int i = 0; i < numbers.length; i++) {
            squares[i] = numbers[i] * numbers[i];
        }
        System.out.print("Squared numbers: ");
        printArray(squares);
        
        // Print even numbers
        System.out.print("Even numbers: ");
        for (int n : numbers) {
            if (n % 2 == 0) System.out.print(n + " ");
        }
        System.out.println();
        
        // Calculate and print sum
        int sum = 0;
        for (int n : numbers) sum += n;
        System.out.println("Sum of numbers: " + sum);
    }
    
    private static void printArray(int[] arr) {
        for (int n : arr) System.out.print(n + " ");
        System.out.println();
    }
  }`,
    },
    go: {
        id: "go",
        label: "Go",
        logoPath: "/go.png",
        pistonRuntime: { language: "go", version: "1.16.2" },
        monacoLanguage: "go",
        defaultCode: `package main
  
  import "fmt"
  
  func main() {
    // Create slice
    numbers := []int{1, 2, 3, 4, 5}
    
    // Print original numbers
    fmt.Println("Original numbers:", numbers)
    
    // Calculate squares
    squares := make([]int, len(numbers))
    for i, n := range numbers {
        squares[i] = n * n
    }
    fmt.Println("Squared numbers:", squares)
    
    // Filter even numbers
    var evenNumbers []int
    for _, n := range numbers {
        if n%2 == 0 {
            evenNumbers = append(evenNumbers, n)
        }
    }
    fmt.Println("Even numbers:", evenNumbers)
    
    // Calculate sum
    sum := 0
    for _, n := range numbers {
        sum += n
    }
    fmt.Println("Sum of numbers:", sum)
  }`,
    },
    rust: {
        id: "rust",
        label: "Rust",
        logoPath: "/rust.png",
        pistonRuntime: { language: "rust", version: "1.68.2" },
        monacoLanguage: "rust",
        defaultCode: `fn main() {
      // Create vector
      let numbers = vec![1, 2, 3, 4, 5];
      
      // Print original numbers
      println!("Original numbers: {:?}", numbers);
      
      // Calculate squares
      let squares: Vec<i32> = numbers
          .iter()
          .map(|&n| n * n)
          .collect();
      println!("Squared numbers: {:?}", squares);
      
      // Filter even numbers
      let even_numbers: Vec<i32> = numbers
          .iter()
          .filter(|&&n| n % 2 == 0)
          .cloned()
          .collect();
      println!("Even numbers: {:?}", even_numbers);
      
      // Calculate sum
      let sum: i32 = numbers.iter().sum();
      println!("Sum of numbers: {}", sum);
  }`,
    },
    cpp: {
        id: "cpp",
        label: "C++",
        logoPath: "/cpp.png",
        pistonRuntime: { language: "cpp", version: "10.2.0" },
        monacoLanguage: "cpp",
        defaultCode: `#include <iostream>
  #include <vector>
  #include <algorithm>
  #include <numeric>
  
  int main() {
      // Create vector
      std::vector<int> numbers = {1, 2, 3, 4, 5};
      
      // Print original numbers
      std::cout << "Original numbers: ";
      for (int n : numbers) std::cout << n << " ";
      std::cout << std::endl;
      
      // Calculate squares
      std::vector<int> squares;
      std::transform(numbers.begin(), numbers.end(), 
                    std::back_inserter(squares),
                    [](int n) { return n * n; });
      
      std::cout << "Squared numbers: ";
      for (int n : squares) std::cout << n << " ";
      std::cout << std::endl;
      
      // Filter even numbers
      std::cout << "Even numbers: ";
      for (int n : numbers) {
          if (n % 2 == 0) std::cout << n << " ";
      }
      std::cout << std::endl;
      
      // Calculate sum
      int sum = std::accumulate(numbers.begin(), numbers.end(), 0);
      std::cout << "Sum of numbers: " << sum << std::endl;
      
      return 0;
  }`,
    },
    csharp: {
        id: "csharp",
        label: "C#",
        logoPath: "/csharp.png",
        pistonRuntime: { language: "csharp", version: "6.12.0" },
        monacoLanguage: "csharp",
        defaultCode: `using System;
  using System.Linq;
  
  class Program {
      static void Main() {
          // Create array
          int[] numbers = { 1, 2, 3, 4, 5 };
          
          // Print original numbers
          Console.WriteLine($"Original numbers: {string.Join(" ", numbers)}");
          
          // Calculate squares
          var squares = numbers.Select(n => n * n);
          Console.WriteLine($"Squared numbers: {string.Join(" ", squares)}");
          
          // Filter even numbers
          var evenNumbers = numbers.Where(n => n % 2 == 0);
          Console.WriteLine($"Even numbers: {string.Join(" ", evenNumbers)}");
          
          // Calculate sum
          var sum = numbers.Sum();
          Console.WriteLine($"Sum of numbers: {sum}");
      }
  }`,
    },
    ruby: {
        id: "ruby",
        label: "Ruby",
        logoPath: "/ruby.png",
        pistonRuntime: { language: "ruby", version: "3.0.1" },
        monacoLanguage: "ruby",
        defaultCode: `# Create array
  numbers = [1, 2, 3, 4, 5]
  
  # Print original numbers
  puts "Original numbers: #{numbers.join(' ')}"
  
  # Calculate squares
  squares = numbers.map { |n| n * n }
  puts "Squared numbers: #{squares.join(' ')}"
  
  # Filter even numbers
  even_numbers = numbers.select { |n| n.even? }
  puts "Even numbers: #{even_numbers.join(' ')}"
  
  # Calculate sum
  sum = numbers.sum
  puts "Sum of numbers: #{sum}"`,
    },
    swift: {
        id: "swift",
        label: "Swift",
        logoPath: "/swift.png",
        pistonRuntime: { language: "swift", version: "5.3.3" },
        monacoLanguage: "swift",
        defaultCode: `// Create array
  let numbers = [1, 2, 3, 4, 5]
  
  // Print original numbers
  print("Original numbers: \\(numbers)")
  
  // Calculate squares
  let squares = numbers.map { $0 * $0 }
  print("Squared numbers: \\(squares)")
  
  // Filter even numbers
  let evenNumbers = numbers.filter { $0 % 2 == 0 }
  print("Even numbers: \\(evenNumbers)")
  
  // Calculate sum
  let sum = numbers.reduce(0, +)
  print("Sum of numbers: \\(sum)")`,
    },
};

export const THEME = [
    { id: "vs-dark", label: "VS Dark", color: "#1e1e1e" },
    { id: "vs-light", label: "VS Light", color: "#ffffff" },
    { id: "dracula", label: "Dracula", color: "#282a36" },
    { id: "monokai", label: "Monokai", color: "#272822" },
    { id: "solarized-dark", label: "Solarized Dark", color: "#002b36" },
    { id: "solarized-light", label: "Solarized Light", color: "#fdf6e3" },
    { id: "gruvbox-dark", label: "Gruvbox Dark", color: "#282828" },
    { id: "nord", label: "Nord", color: "#2e3440" }
]

export const THEME_DEFINITONS = {
    "dracula": {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "comment", foreground: "6272a4" },
            { token: "string", foreground: "f1fa8c" },
            { token: "keyword", foreground: "ff79c6" },
            { token: "number", foreground: "bd93f9" },
            { token: "type", foreground: "8be9fd" },
            { token: "class", foreground: "8be9fd" },
            { token: "function", foreground: "50fa7b" },
            { token: "variable", foreground: "f8f8f2" },
            { token: "operator", foreground: "ff79c6" },
        ],
        colors: {
            "editor.background": "#282a36",
            "editor.foreground": "#f8f8f2",
            "editor.lineHighlightBackground": "#44475a",
            "editorLineNumber.foreground": "#6272a4",
            "editorIndentGuide.background": "#44475a",
            "editor.selectionBackground": "#44475a88",
            "editor.inactiveSelectionBackground": "#44475a55",
        },
    },

    "monokai": {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "comment", foreground: "75715e" },
            { token: "string", foreground: "e6db74" },
            { token: "keyword", foreground: "f92672" },
            { token: "number", foreground: "ae81ff" },
            { token: "type", foreground: "66d9ef" },
            { token: "class", foreground: "a6e22e" },
            { token: "function", foreground: "a6e22e" },
            { token: "variable", foreground: "f8f8f2" },
            { token: "operator", foreground: "f92672" },
        ],
        colors: {
            "editor.background": "#272822",
            "editor.foreground": "#f8f8f2",
            "editor.lineHighlightBackground": "#3e3d32",
            "editorLineNumber.foreground": "#8f908a",
            "editorIndentGuide.background": "#3b3a32",
            "editor.selectionBackground": "#49483e",
            "editor.inactiveSelectionBackground": "#3e3d3255",
        },
    },

    "solarized-dark": {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "comment", foreground: "586e75" },
            { token: "string", foreground: "2aa198" },
            { token: "keyword", foreground: "859900" },
            { token: "number", foreground: "d33682" },
            { token: "type", foreground: "b58900" },
            { token: "class", foreground: "b58900" },
            { token: "function", foreground: "268bd2" },
            { token: "variable", foreground: "839496" },
            { token: "operator", foreground: "6c71c4" },
        ],
        colors: {
            "editor.background": "#002b36",
            "editor.foreground": "#839496",
            "editor.lineHighlightBackground": "#073642",
            "editorLineNumber.foreground": "#586e75",
            "editorIndentGuide.background": "#073642",
            "editor.selectionBackground": "#073642aa",
            "editor.inactiveSelectionBackground": "#07364255",
        },
    },

    "solarized-light": {
        base: "vs",
        inherit: true,
        rules: [
            { token: "comment", foreground: "93a1a1" },
            { token: "string", foreground: "2aa198" },
            { token: "keyword", foreground: "859900" },
            { token: "number", foreground: "d33682" },
            { token: "type", foreground: "b58900" },
            { token: "class", foreground: "b58900" },
            { token: "function", foreground: "268bd2" },
            { token: "variable", foreground: "657b83" },
            { token: "operator", foreground: "6c71c4" },
        ],
        colors: {
            "editor.background": "#fdf6e3",
            "editor.foreground": "#657b83",
            "editor.lineHighlightBackground": "#eee8d5",
            "editorLineNumber.foreground": "#93a1a1",
            "editorIndentGuide.background": "#eee8d5",
            "editor.selectionBackground": "#d3d3d355",
            "editor.inactiveSelectionBackground": "#eee8d577",
        },
    },

    "gruvbox-dark": {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "comment", foreground: "928374" },
            { token: "string", foreground: "b8bb26" },
            { token: "keyword", foreground: "fb4934" },
            { token: "number", foreground: "d3869b" },
            { token: "type", foreground: "fabd2f" },
            { token: "class", foreground: "fabd2f" },
            { token: "function", foreground: "8ec07c" },
            { token: "variable", foreground: "ebdbb2" },
            { token: "operator", foreground: "fe8019" },
        ],
        colors: {
            "editor.background": "#282828",
            "editor.foreground": "#ebdbb2",
            "editor.lineHighlightBackground": "#3c3836",
            "editorLineNumber.foreground": "#a89984",
            "editorIndentGuide.background": "#3c3836",
            "editor.selectionBackground": "#50494588",
            "editor.inactiveSelectionBackground": "#50494555",
        },
    },

    "nord": {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "comment", foreground: "616e88" },
            { token: "string", foreground: "a3be8c" },
            { token: "keyword", foreground: "81a1c1" },
            { token: "number", foreground: "b48ead" },
            { token: "type", foreground: "8fbcbb" },
            { token: "class", foreground: "8fbcbb" },
            { token: "function", foreground: "88c0d0" },
            { token: "variable", foreground: "d8dee9" },
            { token: "operator", foreground: "81a1c1" },
        ],
        colors: {
            "editor.background": "#2e3440",
            "editor.foreground": "#d8dee9",
            "editor.lineHighlightBackground": "#3b4252",
            "editorLineNumber.foreground": "#4c566a",
            "editorIndentGuide.background": "#434c5e",
            "editor.selectionBackground": "#434c5e88",
            "editor.inactiveSelectionBackground": "#434c5e55",
        },
    },
};

export const defineManacoThemes = (monaco: Monaco) => {
    Object.entries(THEME_DEFINITONS).forEach(([themeName, themeData]) => {
        monaco.editor.defineTheme(themeName, {
            base: themeData.base,
            inherit: themeData.inherit,
            rules: themeData.rules.map(rule => ({ ...rule, foreground: rule.foreground })),
            colors: themeData.colors
        })
    })
}

export const FREE_PLAN_LANGUAGES = ["javascript", "typescript"];