import * as vscode from 'vscode';
import { NodeDependenciesProvider } from './treeNode.ts';
import * as fs from 'fs';
import { Context } from './context.js';

const disposable = vscode.commands.registerCommand('demo.helloWorld', () => {
  vscode.window.showInformationMessage('Hello World from plugin_demo!');
});

const command = 'myExtension.sayHello';

const commandHandler = (name: string = 'world') => {
  console.log(`Hello ${name}!!!`);
};

const helloWorld = vscode.commands.registerCommand(command, commandHandler)


function getWebviewContent(): string {
  
  const html = fs.readFileSync(Context.getInstance().extensionPath + '\\src\\webview\\index.html', { encoding: 'utf-8' })
  console.log(html)
  return html
}

// 一个页面试图（html容器）
const createPanle = vscode.commands.registerCommand('catCoding.start', async () => {
  // Create and show panel
  const panel = vscode.window.createWebviewPanel(
    'catCoding',
    'Cat Coding',
    vscode.ViewColumn.One,
    {}
  );

  // And set its HTML content
  panel.webview.html = await getWebviewContent();
})

const rootPath =
  vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
    ? vscode.workspace.workspaceFolders[0].uri.fsPath
    : '';
// view中设置树形数据
const treeData = new NodeDependenciesProvider(rootPath)
vscode.window.registerTreeDataProvider(
  'nodeDependencies',
  treeData
);

// vscode.window.createTreeView('nodeDependencies', {
// 	treeDataProvider: new NodeDependenciesProvider(rootPath)
// });

const refresh = vscode.commands.registerCommand('custom_pulgin.refreshEntry', () => {
  treeData.refresh();
});

const addEntry = vscode.commands.registerCommand('custom_pulgin.addEntry', () => {
  vscode.window.showInformationMessage('add');
});

const editEntry = vscode.commands.registerCommand('custom_pulgin.editEntry', () => {
  vscode.window.showInformationMessage('edit');
});

const deleteEntry = vscode.commands.registerCommand('custom_pulgin.deleteEntry', () => {
  vscode.window.showInformationMessage('delete');
});

export const exportCommand = [
  disposable,
  helloWorld,
  createPanle,
  refresh,
  addEntry,
  editEntry,
  deleteEntry,
]
