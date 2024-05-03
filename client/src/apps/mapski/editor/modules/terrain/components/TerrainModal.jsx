import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { TerrainPreview } from "./TerrainPreview";

export function TerrainModal({ terrain = {}, isOpen, setIsOpen, onSubmit }) {
	// State initialization for terrain properties
	const [ texture, setTexture ] = useState(terrain.texture || "");
	const [ type, setType ] = useState(terrain.type || "");
	const [ cost, setCost ] = useState(terrain.cost || 0);
	const [ mask, setMask ] = useState(terrain.mask || 0);

	// Effect to reset state when terrain or isOpen changes
	useEffect(() => {
		setTexture(terrain.texture || "");
		setType(terrain.type || "");
		setCost(terrain.cost || 0);
		setMask(terrain.mask || 0);
	}, [ terrain, isOpen ]);

	const terrainObj = {
		...terrain,
		texture,
		type,
		cost,
		mask,
	};

	const handleClose = (submitted) => {
		if(submitted) {
			onSubmit(terrainObj);
		}
		setIsOpen(false);
	};

	return (
		<Transition appear show={ isOpen } as={ Fragment }>
			<Dialog
				as="div"
				className="fixed inset-0 z-10 overflow-y-auto"
				onClose={ handleClose }
			>
				<div className="min-h-screen px-4 text-center">
					<Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
					<span className="inline-block h-screen align-middle" aria-hidden="true">
						&#8203;
					</span>
					<div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
						<Dialog.Title
							as="h3"
							className="py-2 mb-4 text-lg font-thin leading-6 text-center text-gray-900 border border-solid rounded shadow border-neutral-200"
						>
							Add Terrain
						</Dialog.Title>
						<TerrainForm terrainObj={ terrainObj } setType={ setType } setCost={ setCost } setMask={ setMask } />
						<ActionButtons handleClose={ handleClose } />
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}

function TerrainForm({ terrainObj, setType, setCost, setMask }) {
	return (
		<div className="flex flex-col items-center justify-center w-full gap-2">
			<TerrainField label="Texture" Component={ <TerrainPreview terrain={ terrainObj } /> } />
			<TerrainField label="Type" Component={
				<input
					type="text"
					value={ terrainObj.type }
					onChange={ e => setType(e.target.value.replace(/[\s-]/gi, "_").toUpperCase()) }
					className="col-span-3 p-2 text-left border border-gray-300 border-solid rounded shadow"
				/>
			} />
			<TerrainField label="Cost" Component={
				<input
					type="number"
					value={ terrainObj.cost }
					onChange={ e => setCost(e.target.value) }
					className="col-span-3 p-2 text-center border border-gray-300 border-solid rounded shadow"
				/>
			} />
			<TerrainField label="Mask" Component={
				<input
					type="number"
					value={ terrainObj.mask }
					onChange={ e => setMask(e.target.value) }
					className="col-span-3 p-2 text-center border border-gray-300 border-solid rounded shadow"
				/>
			} />
		</div>
	);
}

function ActionButtons({ handleClose }) {
	return (
		<div className="flex w-full gap-2 mt-4">
			<div
				className="flex items-center justify-center w-full p-2 border border-solid rounded shadow cursor-pointer text-neutral-500 hover:text-sky-600 hover:bg-sky-50 hover:border-sky-200"
				onClick={ () => handleClose(true) }
			>
				<div className="ml-2">Submit</div>
			</div>
			<div
				className="flex items-center justify-center w-full p-2 border border-solid rounded shadow cursor-pointer text-neutral-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200"
				onClick={ () => handleClose(false) }
			>
				<div className="ml-2">Cancel</div>
			</div>
		</div>
	);
}

function TerrainField({ label, Component }) {
	return (
		<div className="grid items-center w-full grid-cols-4 gap-2">
			<div className="col-span-1 text-sm font-medium text-center text-gray-500">{ label }</div>
			<div className="flex flex-row items-center justify-center col-span-3">
				{ Component }
			</div>
		</div>
	);
};

export default TerrainModal;