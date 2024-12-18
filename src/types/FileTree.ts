export type FileTreeItem = {
	id: number;
	name: string;
	children?: FileTreeItem[];
	level?: number;
};

export type OptimizedFileTreeItem = FileTreeItem & {
	parentId?: number;
	level?: number;
};

export type FileExtension = 'js' | 'ts';
