import { Data } from "../JupyterNotebookViewer/types";

export type NotebookOutputBlockType = {
    data?: string[] | Data;
    index: number;
    outputType: string;
    executionCount: number;
    activeExecutionCount: number;
    notebookInputLanguage?: string;
    notebookOutputLanguage?: string;
    showOutputLineNumbers?: boolean;
    outputDarkTheme?: boolean;
    outputOuterClassName?: string;
    outputTextClassName?: string;
    outputBlockClassName?: string;
    outputTableClassName?: string;
    outputImageClassName?: string;
    outputBorderClassName?: string;
};
