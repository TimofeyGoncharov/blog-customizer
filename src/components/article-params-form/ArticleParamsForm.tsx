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

	const onButtonSendForm = (event: SyntheticEvent) => {
		event.preventDefault();
		props.setArticleState({
			...props.articleState,
			backgroundColor: selectBackgroundColorOption,
			contentWidth: selectContentWidthOption,
			fontColor: selectFontColorOption,
			fontSizeOption: ragioGroupFontSizeOption,
			fontFamilyOption: selectFamilyOption,
		});
	};
	const onResetButton = () => {
		props.setArticleState(defaultArticleState);
		setSelectContentWidthOption(defaultArticleState.contentWidth);
		setSelectBackgroundColorOption(defaultArticleState.backgroundColor);
		setSelectFontColorOption(defaultArticleState.fontColor);
		setGagioGroupFontSizeOption(defaultArticleState.fontSizeOption);
		setSelectFamilyOption(defaultArticleState.fontFamilyOption);
	};

	const formRef = useRef<HTMLDivElement | null>(null);
	useClose({
		isOpenSideBar,
		setCloseSideBar: () => setIsOpenSideBar(false),
		formRef,
	});

	const [selectFamilyOption, setSelectFamilyOption] = useState<OptionType>(
		props.articleState.fontFamilyOption
	);

	const [ragioGroupFontSizeOption, setGagioGroupFontSizeOption] =
		useState<OptionType>(props.articleState.fontSizeOption);

	const [selectFontColorOption, setSelectFontColorOption] =
		useState<OptionType>(props.articleState.fontColor);

	const [selectBackgroundColorOption, setSelectBackgroundColorOption] =
		useState<OptionType>(props.articleState.backgroundColor);

	const [selectContentWidthOption, setSelectContentWidthOption] =
		useState<OptionType>(props.articleState.contentWidth);

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
							selected={selectFamilyOption}
							onChange={setSelectFamilyOption}
						/>
						<RadioGroup
							title={'Размер шрифта'}
							options={fontSizeOptions}
							selected={ragioGroupFontSizeOption}
							onChange={setGagioGroupFontSizeOption}
							name={'fontSize'}
						/>
						<Select
							title={'Цвет шрифта'}
							options={fontColors}
							selected={selectFontColorOption}
							onChange={setSelectFontColorOption}
						/>
						<Separator />
						<Select
							title={'Цвет фона'}
							options={backgroundColors}
							selected={selectBackgroundColorOption}
							onChange={setSelectBackgroundColorOption}
						/>
						<Select
							title={'Ширина контента'}
							options={contentWidthArr}
							selected={selectContentWidthOption}
							onChange={setSelectContentWidthOption}
						/>
						<div className={clsx(styles.bottomContainer)}>
							<Button
								title={'Сбросить'}
								type='button'
								onClick={onResetButton}
							/>
							<Button
								title={'Применить'}
								type='submit'
								onClick={() => console.log(props.articleState)}
							/>
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
