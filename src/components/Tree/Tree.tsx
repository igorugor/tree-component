import React from 'react';
import { FileExtension, FileTreeItem } from '../../types/FileTree';

import PNG_JS from '../../assets/js.png';
import PNG_TS from '../../assets/ts.png';
import PNG_FolderClosed from '../../assets/folder-closed.png';
import PNG_FolderOpen from '../../assets/folder-open.png';
import PNG_File from '../../assets/new-document.png';

import cn from 'classnames';
import fileTreeStyles from './Tree.module.css';

interface TreeProps {
	fileTreeItems: FileTreeItem[];
	expandedIds: number[];
	selectedId?: number;

	onExpand: (id: number) => void;
	onSelect: (id: number) => void;
}

export const Tree: React.FC<TreeProps> = ({ expandedIds, fileTreeItems, selectedId, onExpand, onSelect }) => {
	const handleItemClick = (id: number, hasChildren: boolean) => {
		if (hasChildren) {
			onExpand(id);
		}

		onSelect(id);
	};

	const getFileItemIcon = (fileExtension: FileExtension, isOpen: boolean, hasChildren: boolean) => {
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

	return (
		<div className={cn(fileTreeStyles.fileTree)}>
			{fileTreeItems.map((item) => {
				const isOpen = expandedIds.includes(item.id);
				const isSelected = selectedId === item.id;
				const separatedFileName = item.name.split('.');
				const fileExtension = separatedFileName[separatedFileName.length - 1] as FileExtension;

				return (
					<React.Fragment key={item.id}>
						<div
							className={cn([
								fileTreeStyles.fileTreeItem,
								isSelected ? fileTreeStyles.selected : undefined,
							])}
							onClick={() => handleItemClick(item.id, !!item.children)}
						>
							<img
								src={getFileItemIcon(fileExtension, isOpen, !!item.children)}
								alt={item.name}
								width={24}
								height={24}
							/>

							<span>{item.name}</span>
						</div>
						{item.children && isOpen ? (
							<div className={cn(fileTreeStyles.fileTreeItemContainer)}>
								<Tree
									expandedIds={expandedIds}
									fileTreeItems={item.children}
									onExpand={onExpand}
									onSelect={onSelect}
									selectedId={selectedId}
								/>
							</div>
						) : null}
					</React.Fragment>
				);
			})}
		</div>
	);
};
