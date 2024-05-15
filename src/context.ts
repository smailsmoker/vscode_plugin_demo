import { ExtensionContext } from "vscode";

export class Context {
    [x: string]: string | undefined;
    private static singleton: Context;
    private constructor() {}

    public static getInstance(context?: ExtensionContext): Context {
      if (!Context.singleton) {
        Context.singleton = new Context();
        Context.singleton.extensionPath = context?.extensionPath
      }
      return Context.singleton;
    }


}