import { IUser } from './auth/types';
import React from 'react';
import T from 'i18n-react';
import dayjs from 'dayjs';

interface IState {
  currentUser?: IUser;
  plugins?;
  isLoadedLocale?: boolean;
  currentLanguage: string;
  isShownIndicator: boolean;
  isRemovingImport: boolean;
  isDoneIndicatorAction: boolean;
}

interface IStore extends IState {
  currentUser?: IUser;
  changeLanguage: (languageCode: string) => void;
  closeLoadingBar: () => void;
  doneIndicatorAction: () => void;
  showLoadingBar: (isRemovingImport: boolean) => void;
}

const AppContext = React.createContext({} as IStore);

export const AppConsumer = AppContext.Consumer;

export class AppProvider extends React.Component<
  { currentUser?: IUser; plugins?; children: any },
  IState
> {
  constructor(props) {
    super(props);

    // initiliaze locale ======
    const currentLanguage = localStorage.getItem('currentLanguage') || 'ar';

    this.state = {
      currentUser: props.currentUser,
      currentLanguage,
      isLoadedLocale: false,
      isShownIndicator: false,
      isRemovingImport: false,

      isDoneIndicatorAction: false,
    };

    this.setLocale(currentLanguage);
  }

  checkisShownIndicatorData = () => {
    const lastImport = localStorage.getItem('octobots_import_data');
    const type = localStorage.getItem('octobots_import_data_type');
    const isRemovingImport = type === 'remove' ? true : false;

    if (lastImport) {
      return this.setState({ isShownIndicator: true, isRemovingImport });
    }

    return this.setState({ isShownIndicator: false, isRemovingImport: false });
  };

  closeLoadingBar = () => {
    this.setState({ isShownIndicator: false });

    localStorage.setItem('octobots_import_data', '');
    localStorage.setItem('octobots_import_data_type', '');
  };

  showLoadingBar = (isRemovingImport: boolean) => {
    this.setState({
      isDoneIndicatorAction: false,
      isShownIndicator: true,
      isRemovingImport,
    });
  };

  doneIndicatorAction = () => {
    this.setState({ isDoneIndicatorAction: true });
  };

  componentDidMount() {
    this.checkisShownIndicatorData();
  }

  setLocale = (currentLanguage: string): void => {
    const rtlLanguages = ['ar', 'fa', 'ur']; // Arabic, Persian, Urdu
    const isRTL = rtlLanguages.includes(currentLanguage);

    // if (isRTL) {
    //   // BOOTSTRAP IS NOT ALLOWED IN THE PROJECT DO NOT ACTIVATE THESE LINES @MK
      // import('bootstrap/dist/css/bootstrap.rtl.min.css');


    //   // import ('bootstrap/dist/css/bootstrap-grid.min.css');
    //   // import ('bootstrap/dist/css/bootstrap-reboot.min.css');
    //   // import ('bootstrap/dist/css/bootstrap-utilities.min.css');
    // } else {
    //   // BOOTSTRAP IS NOT ALLOWED IN THE PROJECT DO NOT ACTIVATE THESE LINES @MK
    //   import('bootstrap/dist/css/bootstrap.min.css');


    //   // import ('bootstrap/dist/css/bootstrap-grid.min.css');
    //   // import ('bootstrap/dist/css/bootstrap-reboot.min.css');
    //   // import ('bootstrap/d ist/css/bootstrap-utilities.min.css');
    // }
    
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLanguage);
  
    if (currentLanguage !== 'mn') {
      import(`dayjs/locale/${currentLanguage}.js`)
        .then(() => dayjs.locale(currentLanguage))
        .catch((_) => dayjs.locale('ar'));
    }
  
    fetch(`/locales/${currentLanguage}.json`)
      .then((res) => res.json())
      .catch(() => console.error(`${currentLanguage} translation not found`))
      .then((json) => {
        T.setTexts(json);
        this.setState({ isLoadedLocale: true });
      })
      .catch((e) => {
        console.error(e);
        this.setState({ isLoadedLocale: true });
      });
  };
  

  changeLanguage = (languageCode): void => {
    if (this.state.currentLanguage !== languageCode) {
      localStorage.setItem('currentLanguage', languageCode || 'ar');
      window.location.reload();
    }
  };

  public render() {
    const {
      currentUser,
      currentLanguage,
      isShownIndicator,
      isRemovingImport,
      isDoneIndicatorAction,
    } = this.state;

    return (
      <AppContext.Provider
        value={{
          currentUser,
          plugins: this.props.plugins,
          currentLanguage,
          changeLanguage: this.changeLanguage,
          closeLoadingBar: this.closeLoadingBar,
          showLoadingBar: this.showLoadingBar,
          doneIndicatorAction: this.doneIndicatorAction,
          isShownIndicator,
          isRemovingImport,
          isDoneIndicatorAction,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
