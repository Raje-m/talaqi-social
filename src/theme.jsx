
import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { blueGrey, green, grey, red, teal } from "@mui/material/colors";

export const getDesignTokens = ( mode ) => ( {
  palette: {
    mode,
    ...( mode === "light"
      ? {
        // palette values for light mode
        text: {
          primary: "#2B3445",
        },
        neutral: {
          main: "#64748B",
        },

        favColor: {
          main: grey[ 300 ],
        },
        myColor: {
          // main: grey[ 50 ]
          main: blueGrey[400]
        },
        mainColor: {
          main: red[ 700 ]
        },
        greyColor: {
          main: grey[100]
        }

      }
      : {
        // palette values for dark mode
        neutral: {
          main: "#64748B",
        },

        favColor: {
          main: grey[ 800 ],
        },
        myColor: {
          // main: grey[ 700 ]
          main: blueGrey[ 800 ],

        },
        mainColor: {
          main: red[ 900 ]
        },
        greyColor: {
          main: grey[ 600 ]
        },

        text: {
          primary: "#fff",
        },
      } ),
  },
} );

// context for color mode
export const ColorModeContext = createContext( {
  toggleColorMode: () => { },
} );

export const useMode = () =>
{
  const [ mode, setMode ] = useState(
    localStorage.getItem( "mode" ) ? localStorage.getItem( "mode" ) : "light"
  );

  const colorMode = useMemo(
    () => ( {
      toggleColorMode: () =>
        setMode( ( prev ) => ( prev === "light" ? "dark" : "light" ) ),
    } ),
    []
  );

  const theme = useMemo( () => createTheme( getDesignTokens( mode ) ), [ mode ] );
  return [ theme, colorMode ];
};