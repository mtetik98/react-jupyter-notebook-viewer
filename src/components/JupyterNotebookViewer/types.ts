export type JupyterNotebookViewerType = {
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
    hideMarkdownBlocks?: boolean;
    hideAllOutputs?: boolean;
    hideAllInputs?: boolean;
    remarkPlugins?: any;
    rehypePlugins?: any;
};

export type NotebookTransformed = {
    type: string;
    executionCount: number;
    source: string;
    outputs?: Array<NotebookOutputTransformed>;
};

export type NotebookOutputTransformed = {
    outputType: string;
    data?: Data | string[];
};

export type NotebookPartType = {
    type: string;
    executionCount: number | undefined;
    source: string;
    outputs?: NotebookOutputTransformed[];
};

export type Notebook = {
    cells: Cell[];
    metadata: NotebookMetadata;
    nbformat: number;
    nbformat_minor: number;
};

export type Cell = {
    cell_type: CellType;
    metadata: CellMetadata;
    source: string[];
    execution_count?: number;
    outputs?: Output[];
};

export enum CellType {
    Code = "code",
    Markdown = "markdown",
}

export type CellMetadata = {};

export type Output = {
    data?: Data;
    execution_count?: number;
    metadata?: OutputMetadata;
    output_type: OutputType;
    name?: string;
    text?: string[];
    traceback?: string[];
};

export type Data = {
    "text/html"?: string[];
    "text/plain": string[];
    "image/png"?: string;
};

export type OutputMetadata = {
    needs_background?: NeedsBackground;
};

export enum NeedsBackground {
    Light = "light",
}

export enum OutputType {
    DisplayData = "display_data",
    ExecuteResult = "execute_result",
    Stream = "stream",
    Error = "error",
}

export type NotebookMetadata = {
    interpreter: Interpreter;
    kernelspec: Kernelspec;
    language_info: LanguageInfo;
    orig_nbformat: number;
};

export type Interpreter = {
    hash: string;
};

export type Kernelspec = {
    display_name: string;
    name: string;
};

export type LanguageInfo = {
    codemirror_mode: CodemirrorMode;
    file_extension: string;
    mimetype: string;
    name: string;
    nbconvert_exporter: string;
    pygments_lexer: string;
    version: string;
};

export type CodemirrorMode = {
    name: string;
    version: number;
};
