import React, { useEffect, useState } from "react";

import {
    JupyterNotebookViewerType,
    Cell,
    NotebookOutputTransformed,
    NotebookPartType,
} from "./types";
import { NotebookInputBlock } from "../NotebookInputBlock";
import { NotebookOutputBlock } from "../NotebookOutputBlock";

const JupyterNotebookViewer: React.FC<JupyterNotebookViewerType> = (props) => {
    const { filePath, withOnClick, className, hideAllOutputs, hideAllInputs } = props;

    const [activeExecutionCount, setActiveExecutionCount] = useState(0);
    const [notebookParts, setNotebookParts] = useState<Array<NotebookPartType | null>>([]);

    useEffect(() => {
        const loadJupyterNotebook = async () => {
            const response = await fetch(filePath);
            const data = await response.json();
            return data;
        };

        loadJupyterNotebook().then((data) => {
            const cells: Array<Cell> = Object.entries(data).filter(
                ([key]) => key === "cells"
            )[0][1] as Array<Cell>;

            // To avoid getting a match with the execution count, we keep the index number as high as possible.
            let markdownCellStartIndex = 1000000;
            let codeCellStartIndexForNullExecutionCount = 2000000;

            const codeCellInputs = cells
                .filter(({ cell_type }) => cell_type === "code" || cell_type === "markdown")
                .map((cell) => {
                    const outputs: NotebookOutputTransformed[] = [];

                    if (cell.outputs && cell.outputs.length > 0) {
                        cell.outputs.map((output) => {
                            if (output.output_type === "execute_result") {
                                outputs.push({
                                    outputType: output.output_type,
                                    data: output.data,
                                });
                            }

                            if (output.output_type === "display_data") {
                                outputs.push({
                                    outputType: output.output_type,
                                    data: output.data,
                                });
                            }

                            if (output.output_type === "stream") {
                                outputs.push({
                                    outputType: output.output_type,
                                    data: output.text,
                                });
                            }

                            if (output.output_type === "error") {
                                outputs.push({
                                    outputType: output.output_type,
                                    data: output.traceback,
                                });
                            }

                            return null;
                        });
                    }

                    if (cell.cell_type === "code") {
                        codeCellStartIndexForNullExecutionCount =
                            codeCellStartIndexForNullExecutionCount + 1;
                        return {
                            type: "code",
                            executionCount: cell.execution_count
                                ? cell.execution_count
                                : codeCellStartIndexForNullExecutionCount,
                            source: cell.source.join(""),
                            outputs,
                        };
                    }

                    if (cell.cell_type === "markdown") {
                        markdownCellStartIndex = markdownCellStartIndex + 1;
                        return {
                            type: "markdown",
                            executionCount: markdownCellStartIndex,
                            source: cell.source.join("\n"),
                        };
                    }

                    return null;
                });

            setNotebookParts(codeCellInputs);
        });
    }, [filePath]);

    return (
        <div className={`p-4 ${className || ""}`}>
            {notebookParts.map((part, index) => (
                <div
                    key={index}
                    onClick={() =>
                        withOnClick &&
                        part?.executionCount &&
                        setActiveExecutionCount(part.executionCount)
                    }>
                    {!hideAllInputs && (
                        <NotebookInputBlock
                            {...props}
                            type={(part && part.type) || ""}
                            source={(part && part.source) || ""}
                            executionCount={(part && part.executionCount) || 0}
                            activeExecutionCount={activeExecutionCount}
                        />
                    )}
                    {part?.outputs &&
                        !hideAllOutputs &&
                        part.outputs.map(({ outputType, data }, index) => (
                            <NotebookOutputBlock
                                key={`${outputType}-${index}`}
                                {...props}
                                data={data}
                                index={index} // Used to determine whether the output should be displayed or not.
                                outputType={outputType}
                                executionCount={
                                    part && part.executionCount ? part.executionCount : 0
                                }
                                activeExecutionCount={activeExecutionCount}
                            />
                        ))}
                </div>
            ))}
        </div>
    );
};

export { JupyterNotebookViewer };
