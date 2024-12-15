export type Item = {
	id: number;
	name: string;
	children?: Item[];
};

export type FileExtension = 'JS' | 'TS' | 'FILE' | 'FOLDER';
