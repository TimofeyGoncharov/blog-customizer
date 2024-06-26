import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import React from 'react';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	onClick: OnClick;
	isOpenSideBar: boolean;
};

export const ArrowButton = (props: ArrowButtonProps) => {
	return (
		<div
			role='button'
			aria-label={
				props.isOpenSideBar
					? 'Закрыть форму параметров статьи'
					: 'Открыть форму параметров статьи'
			}
			tabIndex={0}
			className={clsx(
				styles.container,
				props.isOpenSideBar && styles.container_open
			)}
			onClick={props.onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, props.isOpenSideBar && styles.arrow_open)}
			/>
		</div>
	);
};
