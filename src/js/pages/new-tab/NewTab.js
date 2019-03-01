import React, {Component} from 'react';
import {hot} from 'react-hot-loader';

import MarkdownRenderer from '../../components/markdown-renderer';
import Header from '../../components/header';
import Spinner from '../../components/spinner';
import Chip from '../../components/chip';
import Footer from '../../components/footer';

import {strings, LangContext} from '../../components/Lang';

import {fetchRandomSnippet} from '../../api/snippets';
import {restoreFromStorage} from '../../api/storage';

import './NewTab.css';

const CLASS = 'sok-NewTab';
class NewTab extends Component {
	constructor(props) {
		super(props);

		this.state = {
			snippet: null,
			language: null,
			zzz_langCode: '',
		};
	}

	componentDidMount() {
		let zzz_langCode;
		this.fetchLang()
			.then(response => {
				zzz_langCode = response;
				this.setState({zzz_langCode});
				console.log(zzz_langCode);
			})
			.catch(error => {});
		this.fetchSnippet();
	}

	fetchSnippet = async () => {
		const data = await fetchRandomSnippet();
		const {snippet, language} = data;

		this.setState({
			snippet,
			language,
		});
	};

	fetchLang = async () => {
		const appOptions = await restoreFromStorage();
		const languageCode = appOptions['zzz_langCode'];

		this.setState({
			languageCode,
		});

		return languageCode;
	};

	renderSnippet = () => {
		const {snippet, language} = this.state;

		if (!snippet) {
			return null;
		}

		return <MarkdownRenderer lang={language} source={this.state.snippet} />;
	};

	renderSpinner = () => {
		const {snippet} = this.state;

		if (snippet) {
			return null;
		}

		return <Spinner />;
	};

	renderLangChip = () => {
		const {language} = this.state;

		if (!language) {
			return null;
		}

		return <Chip value={language} />;
	};

	render() {
		return (
			<LangContext.Provider value={{zzz_langCode: this.state.zzz_langCode, strings}}>
				<div className={CLASS}>
					{this.renderSpinner()}
					<Header />
					<span className={`${CLASS}-contentContainer`}>
						{this.renderLangChip()}
						{this.renderSnippet()}
					</span>
					<Footer />
				</div>
			</LangContext.Provider>
		);
	}
}

export default hot(module)(NewTab);
