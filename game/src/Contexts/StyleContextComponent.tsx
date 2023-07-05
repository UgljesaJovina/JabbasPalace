import { Dispatch, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

interface IStyleContextParams {
    style: PossibleStyles,
    setStyle: Dispatch<PossibleStyles>
}

type PossibleStyles = "nameStyle" | "gameTypeStyle" | "createRoomStyle" | "lobbyListStyle";

const StyleContext = createContext<IStyleContextParams>({ style: "nameStyle", setStyle: () => {} });

export const useStyleContext = () => useContext(StyleContext);

export const StyleProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [style, setStyle] = useState<PossibleStyles>("nameStyle");

    return (
        <StyleContext.Provider value={{style: style, setStyle: setStyle}}>
            <link rel="stylesheet" type="text/css" href={`/Styles/${style}.css`} />
            {/* Pronasao razlog zasto ne radi, sad samo jos da ga implementiram */}
            {children}
        </StyleContext.Provider>
    );
}


/**
 * Dead component
 * za vreme tranzicije nestane sav css sa stare komponente
 * moze da se popravi sa prevCss promenljivom pa da se zadrze oba stila
 * ali malo nema smisla
 */