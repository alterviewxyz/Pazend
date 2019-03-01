import React, {Component} from 'react';
import {hot} from 'react-hot-loader';

import Header from '../../components/header';
import OptionsPicker from '../../components/options-picker';

import {strings, LangContext} from '../../components/Lang';
import {restoreFromStorage} from '../../api/storage';

import './PopupTab.css';

const CLASS = 'sok-PopupTab';

class PopupTab extends Component {
	constructor(props) {
		super(props);

		this.state = {
			zzz_langCode: '',
		};
	}

	fetchLang = async () => {
		const appOptions = await restoreFromStorage();
		const languageCode = appOptions['zzz_langCode'];

		this.setState({
			languageCode,
		});

		return languageCode;
	};
	render() {
		return (
			<LangContext.Provider value={{zzz_langCode: this.state.zzz_langCode, strings}}>
				<div className={CLASS}>
					<OptionsPicker noToast={true} />
				</div>
			</LangContext.Provider>
		);
	}
}

export default hot(module)(PopupTab);
