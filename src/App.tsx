import { useCallback, useMemo, useState } from 'react';
import './App.css';
import { Tree } from './components';
import { FileTreeItem } from './types/FileTree';
import { getDescendants, optimizeFileTreeItems } from './utils';

const fileTreeItems: FileTreeItem[] = [
	{
		id: 1,
		name: 'node_modules',
		children: [
			{
				id: 11,
				name: 'node_modules_1',
			},
			{
				id: 12,
				name: 'node_modules_2',
			},
			{
				id: 13,
				name: 'node_modules_3',
			},
		],
	},
	{
		id: 2,
		name: 'public',
	},
	{
		id: 3,
		name: 'src',
		children: [
			{
				id: 31,
				name: 'app.ts',
			},
			{
				id: 32,
				name: 'types',
				children: [
					{
						id: 321,
						name: 'types.ts',
					},
					{
						id: 322,
						name: 'types.js',
					},
					{
						id: 323,
						name: 'node_modules_3',
					},
				],
			},
			{
				id: 33,
				name: 'node_modules_3',
			},
		],
	},
	{
		id: 4,
		name: 'README.md',
	},
	{
		id: 5,
		name: 'tsconfig.json',
	},
];

function App() {
	const [selectedId, setSelectedId] = useState<number | undefined>();
	const [expandedIds, setExpandedIds] = useState<number[]>([]);

	const optimizedFileTreeItems = useMemo(() => optimizeFileTreeItems(fileTreeItems), []);

	const handleSetSelectedId = useCallback((id: number) => {
		setSelectedId(id);
	}, []);

	const handleSetExpandedIds = useCallback((id: number) => {
		setExpandedIds((prev) => {
			if (prev.includes(id)) {
				const descendantIds = getDescendants(fileTreeItems, id);

				return prev.filter((expId) => ![id, ...descendantIds].includes(expId));
			} else {
				return [...prev, id];
			}
		});
	}, []);

	return (
		<Tree
			fileTreeItems={optimizedFileTreeItems}
			expandedIds={expandedIds}
			onExpand={handleSetExpandedIds}
			onSelect={handleSetSelectedId}
			selectedId={selectedId}
		/>
	);
}

export default App;
