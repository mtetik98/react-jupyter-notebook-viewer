export declare type JupyterNotebookViewerType = {
    filePath: string;
    className?: string;
    notebookInputLanguage?: string;
    notebookOutputLanguage?: string;
    inputCodeDarkTheme?: boolean;
    outputDarkTheme?: boolean;
    showInputLineNumbers?: boolean;
    showOutputLineNumbers?: boolean;
    inputMarkdownDarkTheme?: boolean;
    outputTextClassName?: string;
    inputTextClassName?: string;
    outputBlockClassName?: string;
    outputImageClassName?: string;
    outputOuterClassName?: string;
    inputOuterClassName?: string;
    outputBorderClassName?: string;
    inputBorderClassName?: string;
    outputTableClassName?: string;
    withOnClick?: boolean;
    inputMarkdownBlockClassName?: string;
    inputCodeBlockClassName?: string;
    hideCodeBlocks?: boolean;
    hideAllOutputs?: boolean;
    hideAllInputs?: boolean;
    remarkPlugins?: any;
    rehypePlugins?: any;
};
export declare type NotebookTransformed = {
    type: string;
    executionCount: number;
    source: string;
    outputs?: Array<NotebookOutputTransformed>;
};
export declare type NotebookOutputTransformed = {
    outputType: string;
    data?: Data | string[];
};
export declare type NotebookPartType = {
    type: string;
    executionCount: number | undefined;
    source: string;
    outputs?: NotebookOutputTransformed[];
};
export declare type Notebook = {
    cells: Cell[];
    metadata: NotebookMetadata;
    nbformat: number;
    nbformat_minor: number;
};
export declare type Cell = {
    cell_type: CellType;
    metadata: CellMetadata;
    source: string[];
    execution_count?: number;
    outputs?: Output[];
};
export declare enum CellType {
    Code = "code",
    Markdown = "markdown"
}
export declare type CellMetadata = {};
export declare type Output = {
    data?: Data;
    execution_count?: number;
    metadata?: OutputMetadata;
    output_type: OutputType;
    name?: string;
    text?: string[];
};
export declare type Data = {
    "text/html"?: string[];
    "text/plain": string[];
    "image/png"?: string;
};
export declare type OutputMetadata = {
    needs_background?: NeedsBackground;
};
export declare enum NeedsBackground {
    Light = "light"
}
export declare enum OutputType {
    DisplayData = "display_data",
    ExecuteResult = "execute_result",
    Stream = "stream"
}
export declare type NotebookMetadata = {
    interpreter: Interpreter;
    kernelspec: Kernelspec;
    language_info: LanguageInfo;
    orig_nbformat: number;
};
export declare type Interpreter = {
    hash: string;
};
export declare type Kernelspec = {
    display_name: string;
    name: string;
};
export declare type LanguageInfo = {
    codemirror_mode: CodemirrorMode;
    file_extension: string;
    mimetype: string;
    name: string;
    nbconvert_exporter: string;
    pygments_lexer: string;
    version: string;
};
export declare type CodemirrorMode = {
    name: string;
    version: number;
};
