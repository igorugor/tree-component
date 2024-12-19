import { FileExtension, FileTreeItem, OptimizedFileTreeItem } from '../types/FileTree';

import PNG_JS from '../assets/js.png';
import PNG_TS from '../assets/ts.png';
import PNG_FolderClosed from '../assets/folder-closed.png';
import PNG_FolderOpen from '../assets/folder-open.png';
import PNG_File from '../assets/new-document.png';

export const optimizeFileTreeItems = (
	fileTreeItems: FileTreeItem[],
	level = 0,
	parentId?: number
): OptimizedFileTreeItem[] => {
	return fileTreeItems.reduce<FileTreeItem[]>((acc, item) => {
		const newItem: OptimizedFileTreeItem = { ...item, level, parentId };

		acc.push(newItem);

		if (item.children) {
			acc.push(...optimizeFileTreeItems(item.children, level + 1, item.id));
		}

		return acc;
	}, []);
};

export const getFileItemIcon = (fileExtension: FileExtension, isOpen: boolean, hasChildren: boolean) => {
	if (fileExtension === 'js') {
		return PNG_JS;
	}

	if (fileExtension === 'ts') {
		return PNG_TS;
	}

	if (isOpen) {
		return PNG_FolderOpen;
	}

	if (hasChildren) {
		return PNG_FolderClosed;
	}

	return PNG_File;
};

export const getDescendants = (fileItems: FileTreeItem[], parentId: number): number[] => {
	const descendants: number[] = [];
	const stack = [...fileItems];

	while (stack.length) {
		const current = stack.pop();

		if (!current) {
			continue;
		}

		if (current.children && (current.id === parentId || descendants.includes(current.id))) {
			descendants.push(...current.children.map((child) => child.id));

			stack.push(...current.children);
		}
	}

	return descendants;
};
