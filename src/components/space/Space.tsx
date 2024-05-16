import clsx from 'clsx';
import styles from './Space.module.scss';

export const Space = () => {
	return <div className={clsx([styles.space_50, styles['space_50']])}></div>;
};
