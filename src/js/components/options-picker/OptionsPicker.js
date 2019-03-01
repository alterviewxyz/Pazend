import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {hot} from 'react-hot-loader';

import Button from '../button';
import Spinner from '../spinner';
import Chip from '../chip';
import Toaster, {TOAST_ACTIONS} from '../toaster/Toaster';

import {restoreFromStorage, saveToStorage} from '../../api/storage';

import checkUnchecked from '../../../assets/images/icons/square.svg';
import checkChecked from '../../../assets/images/icons/check-square.svg';

import './OptionsPicker.css';

const CLASS = 'sok-OptionsPicker';

class OptionsPicker extends Component {
	static propTypes = {
		noToast: PropTypes.bool,
	};

	static defaultProps = {
		noToast: false,
	};

	constructor(props) {
		super(props);

		this.state = {
			options: null,
			toastActive: false,
		};
	}

	componentDidMount() {
		this.initOptionsFromStorage();
	}

	initOptionsFromStorage = async () => {
		let options = await restoreFromStorage();

		this.setState({
			options,
		});
	};

	saveOptionsToStorage = async () => {
		const {options} = this.state;
		if (!options) {
			return null;
		}
		console.log(options);
		let isSaved = await saveToStorage(options);

		this.setState({
			toastActive: isSaved,
		});
	};

	renderSpinner = () => {
		const {options} = this.state;

		if (options) {
			return null;
		}

		return <Spinner />;
	};

	handleOptionClick = course => {
		const {options} = this.state;

		let newOptions = Object.assign({}, options, {[course]: !options[course]});

		this.setState({
			options: newOptions,
		});
	};

	toggleLanguage = course => {
		const {options} = this.state;
		let toSet;
		if (options[course] === 'fa') {
			toSet = 'en';
		} else if (options[course] === 'en') {
			toSet = 'fa';
		}
		let newOptions = Object.assign({}, options, {[course]: toSet});

		this.setState({
			options: newOptions,
		});
		console.log(newOptions);
	};

	renderOptions = () => {
		const {options} = this.state;

		if (!options) {
			return this.renderSpinner();
		}
		const optionItems = Object.keys(options).map(key => {
			if (key === 'zzz_langCode') {
				let toShow;
				if (this.state.options[key] === 'fa') toShow = 'Farsi';
				else if (this.state.options[key] === 'en') toShow = 'English';

				return (
					<span
						className="sok-OptionsPicker-item sok-OptionsPicker-item-checked"
						onClick={() => this.toggleLanguage(key)}
					>
						<img src={checkUnchecked} />
						<span className="sok-Chip">Language: {toShow}</span>
					</span>
				);
			}

			const checkedClass = options[key] ? `${CLASS}-item-checked` : `${CLASS}-item-unChecked`;

			return (
				<span
					key={`course_${key}`}
					className={`${CLASS}-item ${checkedClass}`}
					onClick={() => this.handleOptionClick(key)}
				>
					<img src={options[key] ? checkChecked : checkUnchecked} /> {this.rendercourseChip(key)}
				</span>
			);
		});

		return (
			<React.Fragment>
				<h2>Enable/Disable Snippets</h2>
				{optionItems}
				<Button text="Save" onClick={this.saveOptionsToStorage} />
			</React.Fragment>
		);
	};

	rendercourseChip = course => {
		if (!course) {
			return null;
		}

		return <Chip value={course} />;
	};

	toogleSaveToast = action => {
		const isActive = action === TOAST_ACTIONS.show ? true : false;

		this.setState({
			toastActive: isActive,
		});
	};

	render() {
		const {noToast} = this.props;
		const {toastActive} = this.state;

		return (
			<div className={CLASS}>
				<div className={`${CLASS}-itemsContainer`}>{this.renderOptions()}</div>
				{toastActive && !noToast && (
					<Toaster
						toast="Options Saved"
						onDismiss={() => this.toogleSaveToast(TOAST_ACTIONS.hide)}
						noButton={true}
					/>
				)}
			</div>
		);
	}
}

export default hot(module)(OptionsPicker);
