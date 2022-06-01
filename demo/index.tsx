import React from "react";
import { createRoot } from "react-dom/client";

import { JupyterNotebookViewer } from "../src";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "./index.css";
import "katex/dist/katex.min.css";

const container: HTMLElement = document.getElementById("root")!;
const root = createRoot(container);

const DARK_MODE = true;

root.render(
    <>
        <JupyterNotebookViewer
            filePath="https://raw.githubusercontent.com/josephcslater/JupyterExamples/master/Curve_fitting_Julia.ipynb"
            className="notebook-class"
            notebookInputLanguage="python"
            // notebookOutputLanguage="python"
            inputCodeDarkTheme={DARK_MODE}
            outputDarkTheme={DARK_MODE}
            inputMarkdownDarkTheme={DARK_MODE}
            showInputLineNumbers={true}
            showOutputLineNumbers={false}
            // outputTextClassName="output-text"
            // inputTextClassName="input-text"
            // outputBlockClassName="output-block"
            // outputImageClassName="output-image"
            // outputOuterClassName="output-outer"
            // inputOuterClassName="input-outer"
            // outputBorderClassName="output-border"
            // inputBorderClassName="input-border"
            // outputTableClassName="output-table"
            // inputMarkdownBlockClassName="input-markdown-block"
            // inputCodeBlockClassName="input-code-block"
            withOnClick={true}
            hideCodeBlocks={false}
            hideMarkdownBlocks={false}
            hideAllOutputs={false}
            hideAllInputs={false}
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
        />
    </>
);
