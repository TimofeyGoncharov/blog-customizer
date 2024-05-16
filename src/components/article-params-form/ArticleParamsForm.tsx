import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';
import { Text } from 'components/text';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';
import { Separator } from 'components/separator';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	backgroundColors,
	fontColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { Space } from 'components/space/Space';
import styles from './ArticleParamsForm.module.scss';
import { useState, SyntheticEvent } from 'react';

interface IArticleParamsFormProps {
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
}

export const ArticleParamsForm = (props: IArticleParamsFormProps) => {
	const [openSideBar, setOpenSideBar] = useState(false);
	const [sideBarState, setSideBarState] =
		useState<ArticleStateType>(defaultArticleState);
	const {
		fontFamilyOption,
		fontSizeOption,
		fontColor,
		backgroundColor,
		contentWidth,
	} = sideBarState;

	const buttonSendForm = (event: SyntheticEvent) => {
		event.preventDefault();
		props.setArticleState(sideBarState);
	};
	const resetButton = () => setSideBarState(defaultArticleState);
	// const toggleSidebar = () => {
	// 	setOpenSideBar(!openSideBar);
	// };

	const containerClass = clsx(styles.container, {
		[styles.container_open]: openSideBar,
	});

	return (
		<>
			<ArrowButton
				onClick={() => setOpenSideBar(!openSideBar)}
				openSideBar={openSideBar}
			/>
			{openSideBar && (
				<aside className={containerClass}>
					<form onSubmit={buttonSendForm} className={styles.form}>
						<Text size={31} weight={800} uppercase={true}>
							Задайте параметры
						</Text>
						<Space />
						<Select
							title={'Шрифт'}
							options={fontFamilyOptions}
							selected={fontFamilyOption}
							onChange={(option) =>
								setSideBarState((state) => ({
									...state,
									fontFamilyOption: option,
								}))
							}
						/>
						<Space />
						<RadioGroup
							title={'Размер шрифта'}
							options={fontSizeOptions}
							selected={fontSizeOption}
							onChange={(option) =>
								setSideBarState((state) => ({
									...state,
									fontSizeOption: option,
								}))
							}
							name={'fontSize'}
						/>
						<Space />
						<Select
							title={'Цвет шрифта'}
							options={fontColors}
							selected={fontColor}
							onChange={(option) =>
								setSideBarState((state) => ({
									...state,
									fontColor: option,
								}))
							}
						/>
						<Space />
						<Separator />
						<Space />
						<Select
							title={'Цвет фона'}
							options={backgroundColors}
							selected={backgroundColor}
							onChange={(option) =>
								setSideBarState((state) => ({
									...state,
									backgroundColor: option,
								}))
							}
						/>
						<Space />
						<Select
							title={'Ширина контента'}
							options={contentWidthArr}
							selected={contentWidth}
							onChange={(option) =>
								setSideBarState((state) => ({
									...state,
									contentWidth: option,
								}))
							}
						/>
						<Space />
						<div className={styles.bottomContainer}>
							<Button title={'Сбросить'} type='button' onClick={resetButton} />
							<Button title={'Применить'} type='submit' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
