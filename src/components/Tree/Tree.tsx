import React from 'react';
import { FileExtension, OptimizedFileTreeItem } from '../../types/FileTree';

import cn from 'classnames';
import fileTreeStyles from './Tree.module.css';
import { getFileItemIcon } from '../../utils';

interface TreeProps {
	fileTreeItems: OptimizedFileTreeItem[];
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

	return (
		<div className={cn(fileTreeStyles.fileTree)}>
			{fileTreeItems.map((item) => {
				const hasParent = !!item.parentId;
				const isOpen = expandedIds.includes(item.id);
				const isVisible = expandedIds.includes(item.parentId ?? -1);
				const isSelected = selectedId === item.id;
				const separatedFileName = item.name.split('.');
				const fileExtension = separatedFileName[separatedFileName.length - 1] as FileExtension;

				if (hasParent && !isVisible) {
					return null;
				}

				return (
					<div
						key={item.id}
						className={cn([
							fileTreeStyles.fileTreeItem,
							{
								[fileTreeStyles.selected]: isSelected,
							},
						])}
						style={{
							marginLeft: hasParent && item.level ? 50 * item.level : undefined,
						}}
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
				);
			})}
		</div>
	);
};
