
interface GenerateContext {
    path: Array<string | number>;
    templatePath: Array<string | number>;
    currentContext: any;
    templateCurrentContext: any;
    root: any;
    templateRoot: any;
  }
export interface GenerateOptions {
    type: string;
    template: any;
    name: string;
    // rule: ReturnType<typeof parse>;
    context: GenerateContext;
    parsedName: string;
  }

export type mockOptions = string | GenerateOptions 

  