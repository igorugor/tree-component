import cn from 'classnames';
import styles from './Tree.module.css';
import { FileExtension, Item } from '../../types';
import React from 'react';

interface TreeProps {
	data: Item[];
	expandedIds: number[];
	selectedId?: number;

	onExpand: (ids: number) => void;
	onSelect: (id: number) => void;
}

export const Tree: React.FC<TreeProps> = ({ data, expandedIds, selectedId, onExpand, onSelect }) => {
	return (
		<div className={cn(styles.tree)}>
			{data.map((item) => (
				<Node
					key={item.id}
					nodeItem={item}
					expandedIds={expandedIds}
					selectedId={selectedId}
					onExpand={onExpand}
					onSelect={onSelect}
				/>
			))}
		</div>
	);
};

interface NodeProps extends Omit<TreeProps, 'data'> {
	nodeItem: Item;
}

const Node: React.FC<NodeProps> = ({ nodeItem, expandedIds, selectedId, onExpand, onSelect }) => {
	const isOpen = expandedIds.includes(nodeItem.id);
	const isSelected = nodeItem.id === selectedId;
	const hasChildren = nodeItem.children?.length !== undefined && nodeItem.children.length > 0;

	const getFileExtension = (): FileExtension => {
		if (hasChildren) {
			return 'FOLDER';
		}

		const fileSplitString = nodeItem.name.split('.');
		const fileExtension = fileSplitString[fileSplitString.length - 1];

		if (fileExtension === 'js') {
			return 'JS';
		}

		if (fileExtension === 'ts') {
			return 'TS';
		}

		return 'FILE';
	};

	const handleItemClick = () => {
		if (hasChildren) {
			onExpand(nodeItem.id);
		} else {
			onSelect(nodeItem.id);
		}
	};

	return (
		<React.Fragment key={nodeItem.id}>
			<div>
				<span className={cn([styles.nodeFile, isSelected && styles.selected])} onClick={handleItemClick}>
					{getFileExtension()}
				</span>
				<span className={cn([styles.nodeTitle, isSelected && styles.selected])}>{nodeItem.name}</span>
			</div>
			{hasChildren && isOpen ? (
				<div className={cn(styles.nodeChildContainer)}>
					<Tree
						data={nodeItem.children ?? []}
						expandedIds={expandedIds}
						onExpand={onExpand}
						onSelect={onSelect}
						selectedId={selectedId}
					/>
				</div>
			) : null}
		</React.Fragment>
	);
};
