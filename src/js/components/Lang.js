import React from 'react';
import thestrings from '../../strings.json';

const strings = thestrings;
const LangContext = React.createContext({langCode: 'en', thestrings});

export {strings, LangContext};
