import React, { useEffect } from "react";

import { vs2015, github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { NotebookInputBlockType } from "./types";

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import SynaxHighlighter from "react-syntax-highlighter";

const RANDOM_INDEX_START_FOR_NULL_EXECUTION_COUNT = 2000000;

const NotebookInputBlock: React.FC<NotebookInputBlockType> = (props) => {
    const {
        type,
        source,
        executionCount,
        notebookInputLanguage,
        inputCodeDarkTheme,
        inputMarkdownDarkTheme,
        showInputLineNumbers,
        inputOuterClassName,
        inputTextClassName,
        inputCodeBlockClassName,
        inputMarkdownBlockClassName,
        inputBorderClassName,
        activeExecutionCount,
        hideCodeBlocks,
        hideMarkdownBlocks,
        remarkPlugins,
        rehypePlugins,
    } = props;

    useEffect(() => {
        document.querySelectorAll(".markdown-block h1").forEach((h1) => {
            h1.classList.add(...["text-3xl", "font-extrabold", "border-b", "pt-3"]);
            inputMarkdownDarkTheme
                ? h1.classList.add(...["border-black"])
                : h1.classList.add(...["border-white"]);
        });

        document.querySelectorAll(".markdown-block h2").forEach((h2) => {
            h2.classList.add(...["text-2xl", "font-bold", "border-b", "pt-2"]);
            inputMarkdownDarkTheme
                ? h2.classList.add(...["border-black"])
                : h2.classList.add(...["border-white"]);
        });

        document.querySelectorAll(".markdown-block h3").forEach((h3) => {
            h3.classList.add(...["text-xl", "font-semibold", "pt-1"]);
        });

        document.querySelectorAll(".markdown-block h4").forEach((h4) => {
            h4.classList.add(...["text-lg", "font-semibold", "pt-1"]);
        });

        document.querySelectorAll(".markdown-block h5").forEach((h5) => {
            h5.classList.add(...["text-lg", "font-semibold", "pt-1"]);
        });

        document.querySelectorAll(".markdown-block h6").forEach((h6) => {
            h6.classList.add(...["text-lg", "font-semibold", "pt-1"]);
        });

        document.querySelectorAll(".markdown-block > p").forEach((p) => {
            p.classList.add(...["py-1"]);
        });

        document.querySelectorAll(".markdown-block a").forEach((a) => {
            a.classList.add(...["visited:text-purple-400", "hover:underline"]);
        });

        document.querySelectorAll(".markdown-block ol").forEach((ol) => {
            ol.classList.add(...["list-decimal", "py-2", "px-10"]);
        });

        document.querySelectorAll(".markdown-block ul").forEach((ul) => {
            ul.classList.add(...["list-disc", "py-2", "px-10"]);
        });

        document.querySelectorAll(".markdown-block blockquote").forEach((blockquote) => {
            blockquote.classList.add(
                ...["py-1", "my-2", "mx-8", "px-5", "border-l-8", "border-gray-400"]
            );
        });

        document.querySelectorAll(".markdown-block code").forEach((code) => {
            code.classList.add(...["bg-zinc-300", "px-2", "rounded-sm"]);
        });

        document.querySelectorAll(".markdown-block pre code").forEach((code) => {
            code.classList.add(
                ...[
                    "block",
                    "bg-transparent",
                    "whitespace-pre-wrap",
                    "overflow-x-auto",
                    "max-w-full",
                    "p-0",
                ]
            );
        });
    }, [source, inputMarkdownDarkTheme]);

    const renderCodeBlock = () => (
        <div
            className={`input-${executionCount} flex w-full py-2 ${inputOuterClassName || ""} ${
                activeExecutionCount === executionCount
                    ? `border-l-8 ${
                          inputBorderClassName ? inputBorderClassName : "border-blue-400"
                      } my-2 pl-2 md:pl-0`
                    : "border-l-8 border-transparent my-2 pl-2 md:pl-0"
            }`}>
            <p
                className={`hidden md:flex md:w-1/6 xl:w-1/12 font-semibold justify-end md:pr-12 xl:pr-6 ${
                    inputTextClassName || ""
                } ${
                    activeExecutionCount === executionCount
                        ? "text-blue-500"
                        : inputCodeDarkTheme
                        ? "text-black"
                        : "text-white"
                }`}>
                In [
                {executionCount < RANDOM_INDEX_START_FOR_NULL_EXECUTION_COUNT
                    ? executionCount
                    : "..."}
                ]:
            </p>
            <div className={`w-full md:w-5/6 xl:w-11/12 ${inputCodeBlockClassName || ""}`}>
                <SynaxHighlighter
                    language={notebookInputLanguage}
                    style={inputCodeDarkTheme ? vs2015 : github}
                    showLineNumbers={showInputLineNumbers}>
                    {source}
                </SynaxHighlighter>
            </div>
        </div>
    );

    const renderMarkdownBlock = () => (
        <div
            className={`input-${executionCount} flex w-full py-2 ${inputOuterClassName || ""} ${
                activeExecutionCount === executionCount
                    ? `border-l-8 ${
                          inputBorderClassName ? inputBorderClassName : "border-blue-400"
                      } my-2 pl-2 md:pl-0`
                    : "border-l-8 border-transparent my-2 pl-2 md:pl-0"
            }`}>
            <div
                className={`hidden md:flex md:w-1/6 xl:w-1/12 font-semibold justify-end md:pr-12 xl:pr-6 ${
                    inputTextClassName || ""
                }`}
            />
            <div
                className={`markdown-block w-full md:w-5/6 xl:w-11/12 ${
                    inputMarkdownBlockClassName || ""
                } ${inputMarkdownDarkTheme ? "text-black" : "text-white"}`}>
                <ReactMarkdown
                    children={source}
                    remarkPlugins={
                        remarkPlugins && remarkPlugins.length > 0
                            ? [...remarkPlugins, [remarkGfm, { singleTilde: false }]]
                            : [[remarkGfm, { singleTilde: false }]]
                    }
                    rehypePlugins={rehypePlugins}
                />
            </div>
        </div>
    );

    return (
        <React.Fragment>
            {type === "code" && !hideCodeBlocks && renderCodeBlock()}
            {type === "markdown" && !hideMarkdownBlocks && renderMarkdownBlock()}
        </React.Fragment>
    );
};

export { NotebookInputBlock };
