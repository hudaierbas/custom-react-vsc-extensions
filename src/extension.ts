'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'convert-to-lazy-import.lazyImport',
    function () {
      // Get the active text editor
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const document = editor.document;
        const selection = editor.selection;

        // Get the word within the selection
        const defaultImports = document.getText(selection).split(';');

        let lazyImport = "import { lazy } from 'react';\n";

        defaultImports.forEach((e) => {
          const di = e.split(' ');

          if (di.length > 0 && di[0].includes('import'))
            lazyImport += `const ${di[1]} = lazy(() => import(${di[3].replace(
              ';',
              ''
            )}));\n`;
        });

        editor.edit((editBuilder) => {
          editBuilder.replace(selection, lazyImport);
        });
      }
    }
  );

  context.subscriptions.push(disposable);
}
