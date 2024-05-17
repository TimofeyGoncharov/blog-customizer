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
	OptionType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { useState, SyntheticEvent, useRef } from 'react';
import { useClose } from 'src/hooks/useClose';

interface IArticleParamsFormProps {
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
}

export const ArticleParamsForm = (props: IArticleParamsFormProps) => {
	const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(false);
	const [sideBarState, setSideBarState] =
		useState<ArticleStateType>(defaultArticleState);
	const {
		fontFamilyOption,
		fontSizeOption,
		fontColor,
		backgroundColor,
		contentWidth,
	} = sideBarState;

	const onButtonSendForm = (event: SyntheticEvent) => {
		event.preventDefault();
		props.setArticleState(sideBarState);
	};
	const onResetButton = () => {
		setSideBarState(defaultArticleState);
		props.setArticleState(defaultArticleState);
	};

	const formRef = useRef<HTMLDivElement | null>(null);
	useClose({
		isOpenSideBar,
		setCloseSideBar: () => setIsOpenSideBar(false),
		formRef,
	});

	const handleChangedOptions =
		(option: keyof ArticleStateType) => (select: OptionType) => {
			setSideBarState({
				...sideBarState,
				[option]: select,
			});
		};

	return (
		<>
			<div ref={formRef}>
				<ArrowButton
					onClick={() => setIsOpenSideBar(!isOpenSideBar)}
					isOpenSideBar={isOpenSideBar}
				/>
				<aside
					className={clsx(
						styles.container,
						isOpenSideBar && styles.container_open
					)}>
					<form onSubmit={onButtonSendForm} className={styles.form}>
						<Text size={31} weight={800} uppercase={true}>
							Задайте параметры
						</Text>
						<Select
							title={'Шрифт'}
							options={fontFamilyOptions}
							selected={fontFamilyOption}
							onChange={handleChangedOptions('fontFamilyOption')}
						/>
						<RadioGroup
							title={'Размер шрифта'}
							options={fontSizeOptions}
							selected={fontSizeOption}
							onChange={handleChangedOptions('fontSizeOption')}
							name={'fontSize'}
						/>
						<Select
							title={'Цвет шрифта'}
							options={fontColors}
							selected={fontColor}
							onChange={handleChangedOptions('fontColor')}
						/>
						<Separator />
						<Select
							title={'Цвет фона'}
							options={backgroundColors}
							selected={backgroundColor}
							onChange={handleChangedOptions('backgroundColor')}
						/>
						<Select
							title={'Ширина контента'}
							options={contentWidthArr}
							selected={contentWidth}
							onChange={handleChangedOptions('contentWidth')}
						/>
						<div className={clsx(styles.bottomContainer)}>
							<Button
								title={'Сбросить'}
								type='button'
								onClick={onResetButton}
							/>
							<Button title={'Применить'} type='submit' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
