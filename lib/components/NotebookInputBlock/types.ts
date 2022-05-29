export type NotebookInputBlockType = {
    type: string;
    source: string;
    executionCount: number;
    activeExecutionCount: number;
    notebookInputLanguage?: string;
    inputCodeDarkTheme?: boolean;
    inputMarkdownDarkTheme?: boolean;
    showInputLineNumbers?: boolean;
    inputOuterClassName?: string;
    inputTextClassName?: string;
    inputCodeBlockClassName?: string;
    inputMarkdownBlockClassName?: string;
    inputBorderClassName?: string;
    hideCodeBlocks?: boolean;
    hideMarkdownBlocks?: boolean;
    remarkPlugins?: any;
    rehypePlugins?: any;
};
