import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import React from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	onClick: OnClick;
	openSideBar: boolean;
};

export const ArrowButton: React.FC<ArrowButtonProps> = (
	props: ArrowButtonProps
) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label={
				props.openSideBar
					? 'Закрыть форму параметров статьи'
					: 'Открыть форму параметров статьи'
			}
			tabIndex={0}
			className={`${styles.container} ${
				props.openSideBar ? styles.container_open : ''
			}`}
			onClick={props.onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={props.openSideBar ? styles.arrow_open : styles.arrow}
			/>
		</div>
	);
};
