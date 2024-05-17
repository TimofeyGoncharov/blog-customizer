import { useEffect } from 'react';

type UseModalClose = (params: {
	isOpenSideBar: boolean;
	setCloseSideBar: () => void;
	formRef: React.RefObject<HTMLElement>;
}) => void;

export const useClose: UseModalClose = ({
	isOpenSideBar,
	setCloseSideBar,
	formRef,
}) => {
	useEffect(() => {
		if (!isOpenSideBar) return;

		const onMousedown = ({ target }: MouseEvent) => {
			if (target instanceof Node && !formRef.current?.contains(target)) {
				setCloseSideBar();
			}
		};

		window.addEventListener('mousedown', onMousedown);

		return () => {
			window.removeEventListener('mousedown', onMousedown);
		};
	}, [formRef, isOpenSideBar, setCloseSideBar]);
};
