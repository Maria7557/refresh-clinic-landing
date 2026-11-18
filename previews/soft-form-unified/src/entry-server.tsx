import React from 'react';
import {renderToString} from 'react-dom/server';
import LightApp from './LightApp';
export function render(lang:'en'|'ru'){return renderToString(<LightApp initialLanguage={lang}/>)}
