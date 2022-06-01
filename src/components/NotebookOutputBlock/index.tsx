import React, { useEffect } from "react";

import { vs2015, github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { NotebookOutputBlockType } from "./types";

import SynaxHighlighter from "react-syntax-highlighter";

const NotebookOutputBlock: React.FC<NotebookOutputBlockType> = (props) => {
    const {
        executionCount,
        data,
        outputType,
        notebookInputLanguage,
        notebookOutputLanguage,
        showOutputLineNumbers,
        outputDarkTheme,
        outputOuterClassName,
        outputTextClassName,
        outputBlockClassName,
        outputTableClassName,
        outputImageClassName,
        outputBorderClassName,
        activeExecutionCount,
        index,
    } = props;

    useEffect(() => {
        document.querySelectorAll("table").forEach((table) => {
            outputTableClassName
                ? outputTableClassName.split(" ").map((className) => table.classList.add(className))
                : table.classList.add(...["min-w-full", "text-right", "table-auto", "mx-auto"]);
        });

        document.querySelectorAll("table thead").forEach((table) => {
            table.classList.add(...["font-bold"]);
            outputDarkTheme
                ? table.classList.add(...["bg-zinc-900", "text-zinc-300"])
                : table.classList.add(...["bg-white", "text-gray-700"]);
        });

        document.querySelectorAll("table thead th").forEach((table) => {
            table.classList.add(...["p-3", "border-b"]);
            outputDarkTheme
                ? table.classList.add(...["border-gray-700"])
                : table.classList.add(...["border-gray-300"]);
        });

        document.querySelectorAll("table tbody").forEach((table) => {
            outputDarkTheme
                ? table.classList.add(...["bg-zinc-900", "text-zinc-300"])
                : table.classList.add(...["bg-white", "text-gray-700"]);
        });

        document.querySelectorAll("table tbody tr").forEach((table) => {
            table.classList.add(...["border-b"]);
            outputDarkTheme
                ? table.classList.add(...["border-gray-700"])
                : table.classList.add(...["border-gray-300"]);
        });

        document.querySelectorAll("table tbody tr td").forEach((table) => {
            table.classList.add(...["py-3", "px-4"]);
        });
    }, [data, outputDarkTheme, outputTableClassName]);

    const renderPlainTextBlock = () => (
        <React.Fragment>
            {data && !Array.isArray(data) && (
                <SynaxHighlighter
                    language={notebookOutputLanguage || notebookInputLanguage}
                    style={outputDarkTheme ? vs2015 : github}
                    showLineNumbers={showOutputLineNumbers}>
                    {data["text/plain"].join("")}
                </SynaxHighlighter>
            )}
        </React.Fragment>
    );

    const renderHtmlTextBlock = () => (
        <React.Fragment>
            {data && !Array.isArray(data) && data["text/html"] && (
                <div
                    className="overflow-x-auto"
                    dangerouslySetInnerHTML={{
                        __html: data["text/html"].join(""),
                    }}
                />
            )}
        </React.Fragment>
    );

    const renderImageBlock = () => (
        <React.Fragment>
            {data && !Array.isArray(data) && data["image/png"] && (
                <img
                    className={outputImageClassName}
                    src={`data:image/png;base64,${data["image/png"]}`}
                    alt=""
                />
            )}
        </React.Fragment>
    );

    const renderStreamBlock = () => (
        <SynaxHighlighter
            language={notebookOutputLanguage || notebookInputLanguage}
            style={outputDarkTheme ? vs2015 : github}
            showLineNumbers={showOutputLineNumbers}>
            {data && Array.isArray(data) ? data.join("") : ""}
        </SynaxHighlighter>
    );

    const renderErrorBlock = () => (
        <SynaxHighlighter
            customStyle={{ backgroundColor: "rgb(239, 68, 68)" }}
            language={notebookOutputLanguage || notebookInputLanguage}
            style={outputDarkTheme ? vs2015 : github}
            showLineNumbers={showOutputLineNumbers}>
            {data && Array.isArray(data) ? data.join("") : ""}
        </SynaxHighlighter>
    );

    return (
        <div
            className={`output-block output-${executionCount} flex w-full py-2 ${
                outputOuterClassName || ""
            } ${
                activeExecutionCount === executionCount
                    ? `border-l-8 ${
                          outputBorderClassName ? outputBorderClassName : "border-blue-400"
                      } my-2 pl-2 md:pl-0`
                    : "border-l-8 border-transparent my-2 pl-2 md:pl-0"
            }`}>
            <p
                className={`output-block-text hidden md:flex md:w-1/6 xl:w-1/12 font-semibold justify-end md:pr-12 xl:pr-6 ${
                    outputTextClassName || ""
                } ${
                    activeExecutionCount === executionCount
                        ? "text-red-500"
                        : outputDarkTheme
                        ? "text-black"
                        : "text-white"
                }
                }`}>
                {index === 0 && <React.Fragment>Out [{executionCount}]:</React.Fragment>}
            </p>
            <div className={`w-full md:w-5/6 xl:w-11/12 ${outputBlockClassName || ""}`}>
                {data &&
                    !Array.isArray(data) &&
                    !data["text/html"] &&
                    data["text/plain"] &&
                    renderPlainTextBlock()}
                {data &&
                    !Array.isArray(data) &&
                    data["text/html"] &&
                    data["text/plain"] &&
                    renderHtmlTextBlock()}
                {data && !Array.isArray(data) && data["image/png"] && renderImageBlock()}
                {outputType === "stream" && renderStreamBlock()}
                {outputType === "error" && renderErrorBlock()}
            </div>
        </div>
    );
};

export { NotebookOutputBlock };
