import * as React from 'react';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './myTabs.css'
import { createTheme, ThemeProvider } from '@mui/material';

export const theme = createTheme({
    palette: {
      primary: {
        main: '#0EB56F',
      },
    },
});
  
export default function ScrollableTabsButtonAuto({ tabs, tabValue, handleTabChange, center }) {

  return (
    <ThemeProvider theme={theme}>
        <Box sx={{ width: '100%', }}>
        <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons
            aria-label="scrollable auto tabs example"
            // sx={{
            //     [`& .${tabsClasses.scrollButtons}`]: {
            //       '&.Mui-disabled': { opacity: 0.3 },
            //     },
            // }}
        >
            {
                tabs.map((item, i) => (
                    <Tab 
                      key={i}
                      value={item}
                      label={item} 
                      style={{ 
                        color: tabValue !== item && '#879C93',
                        fontWeight: 600,
                        fontSize: '17px',
                        textTransform: 'none',
                        margin: center && '0 auto'
                      }}
                    />
                ))
            }
        </Tabs>
        </Box>
    </ThemeProvider>
  );
}
