// resources/js/App.jsx
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Import the i18n configuration
// import Cycles from './pages/Cycles'; // Comment out the import

const App = () => {
    return (
        <I18nextProvider i18n={i18n}>
            <div>
                <h1>{i18n.t('welcome')}</h1> {/* Example translation */}
                {/* <Cycles /> */} {/* Comment out the Cycles component */}
            </div>
        </I18nextProvider>
    );
};

export default App;
