import React, {Component} from 'react';
import {hot} from 'react-hot-loader';

import Header from '../../components/header';
import Footer from '../../components/footer';
import OptionsPicker from '../../components/options-picker';

import {strings, LangContext} from '../../components/Lang';
import {restoreFromStorage} from '../../api/storage';

import './OptionsTab.css';

const CLASS = 'sok-OptionsTab';

class OptionsTab extends Component {
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
					<Header renderOptionsBtn={false} />
					<OptionsPicker />
					<Footer />
				</div>
			</LangContext.Provider>
		);
	}
}

export default hot(module)(OptionsTab);
