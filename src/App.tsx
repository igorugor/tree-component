import { useCallback, useState } from 'react';
import './App.css';
import { Tree } from './components';
import { Item } from './types';

const data: Item[] = [
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
	const [selectedId, setSelectedId] = useState<number>(-1);
	const [expandedIds, setExpandedIds] = useState<number[]>([]);

	const handleSetSelectedId = useCallback((id: number) => {
		setSelectedId(id);
	}, []);

	const handleExpand = useCallback(
		(id: number) => {
			if (expandedIds.includes(id)) {
				setExpandedIds((prev) => prev.filter((expId) => expId !== id));
			} else {
				setExpandedIds((prev) => [...prev, id]);
			}
			setSelectedId(id);
		},
		[expandedIds]
	);

	return (
		<Tree
			data={data}
			expandedIds={expandedIds}
			onExpand={handleExpand}
			onSelect={handleSetSelectedId}
			selectedId={selectedId}
		/>
	);
}

export default App;
