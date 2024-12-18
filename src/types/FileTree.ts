export interface FileTreeItem {
	id: number;
	name: string;
	children?: FileTreeItem[];
	level?: number;
}

export type FileExtension = 'js' | 'ts';
